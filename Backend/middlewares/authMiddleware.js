const jwt = require("jsonwebtoken");

async function isAdmin(req, res, next) {
  // console.log("cookies is" ,req.cookies)


    const token = req.cookies.securetoken;
    // console.log("token is",token);
    
    try {
      // verify
      // console.log("key",process.env.JWT_SECRET_KEY);
      
      const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log("decode are", decode);
      
      if (!decode) {
        throw new Error("invalid token");
      }

      if (decode.role !== "admin") {
        return res.status(401).json({ message: `access denied user role is ${decode.role}` });
      }
      req.userId = decode.id;
      req.adminName = decode.name
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

module.exports = { isAdmin };
