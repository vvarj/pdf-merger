const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const env = require("dotenv");
env.config();
const { mergePdf, test } = require("./pdfActions");
const fs = require("fs");

const PORT = process?.env?.PORT || 3000;

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post("/merge", upload.array("pdfs", 20), async (req, res, next) => {

  const fileName = await mergePdf(req.files);

  //To clear the upload folder
  const directory = path.join(__dirname, "uploads");
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });

  res.redirect(`http://localhost:3000/static/${fileName}.pdf`);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
