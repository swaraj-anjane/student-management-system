const multer = require("multer");
const fs = require("fs");
// const { log } = require("console");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("working");
    
    const dir = `upload/student`;

    //create folder dynamically
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    console.log("file deatails are", file);
    let filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

const uploads = multer({ storage: storage });

module.exports = uploads;
