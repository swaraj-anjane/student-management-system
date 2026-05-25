const AdminModel = require("../model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../config/nodemailer");
const adminModel = require("../model/admin.model");

async function registerAdmin(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await AdminModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "admin registered successfully", data: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function loginAdmin(req, res) {
  const { email, password } = req.body;
  try {
    // find user by email id
    const admin = await AdminModel.findOne({ email });
    // not found
    if (!admin) {
      res
        .status(404)
        .json({ message: "admin not found or registed", data: null });
      return;
    }
    //check for password
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "invalid credentials", data: null });
    }

    const dataToSend = {
      name: admin.name,
      email: admin.email,
      role: admin.role,
      id: admin._id,
    };

    //generate token
    const token = await jwt.sign(dataToSend, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("securetoken", token, {
      httpOnly: true,
      samesite: "lax", //none,lax,strict
      secure: false, // http secure connection
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ message: "admin login successfully", data: dataToSend, token });
    // not matched
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function sendRestLink(req, res) {
  const { email } = req.query;

  try {
    //find the user by email (from req.query)
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ messsage: "admin does not exist" });
    }

    // create a token and store it in db doc of found admin

    const resetToken = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.RESET_JWT_KEY,
    );

    admin.resetToken = resetToken;
    await admin.save();

    //send this token to client or user so he can reset password by verifyinng it using this token

    // email send to user

    sendMail(
      email,
      "password reset link (software test)",
      `click on link to reset your password\nhttp://localhost:5173/reset-password/${resetToken}`,
      `<table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- App Name -->
      <tr>
        <td align="center" style="font-size:22px; font-weight:bold; color:#333;">
          Student Management System
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td height="20"></td></tr>

      <!-- Heading -->
      <tr>
        <td align="center" style="font-size:20px; font-weight:bold; color:#4a90e2;">
          Reset Password
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td height="20"></td></tr>

      <!-- Message -->
      <tr>
        <td style="font-size:14px; color:#555; line-height:1.6; text-align:center;">
          A password reset link has been sent to your email.<br/>
          You can set a new password using the given link.
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td height="30"></td></tr>

      <!-- Button -->
      <tr>
        <td align="center">
          <a href="{{reset_link}}" 
             style="background-color:#4a90e2; color:#ffffff; padding:12px 25px; text-decoration:none; border-radius:5px; font-size:14px; display:inline-block;">
            Reset Password
          </a>
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td height="30"></td></tr>

      <!-- Footer -->
      <tr>
        <td style="font-size:12px; color:#999; text-align:center; line-height:1.5;">
          If you didn’t request this, you can safely ignore this email.<br/>
          © 2026 Student Management System
        </td>
      </tr>

    </table>`,
    );

    console.log(
      ` massage received password reset link is `,
      `http://localhost:5173/reset-password/${resetToken}`,
    );
    res.status(200).json({ message: "Reset link sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateNewPassword(req, res) {
  const { token, password } = req.body;
  try {
    const decode = jwt.verify(token, process.env.RESET_JWT_KEY);
    if (!decode) {
      return res.status(401).json({ message: "invalid token or expired link" });
    }

    //find user in admin

    const admin = await adminModel.findById(decode.id);
    if(admin.resetToken!==token){
      res.status(401).json({message:"link expired"})
    }
    if (!admin) {
      return res.status(401).json({ message: "admin not found" });
    }

    //password hashing

    const hashedPassword = await bcrypt.hash(password, 10);

    // update admin password in database

    const update = await adminModel.findByIdAndUpdate(admin._id, {
      password: hashedPassword,
    });

admin.resetToken = undefined
await admin.save();

    res.status(200).json({
      message: "Password changed successfully",
      redirect: "/login",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { registerAdmin, loginAdmin, sendRestLink, updateNewPassword };
