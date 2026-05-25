const { registerAdmin, loginAdmin, sendRestLink, updateNewPassword } = require("../controller/admin.controller");

const router = require("express").Router();

router.post("/register", registerAdmin);
router.post("/login",loginAdmin)
router.get("/forget-password", sendRestLink);
router.post("/update-new-password", updateNewPassword);

module.exports = router;
