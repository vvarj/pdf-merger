const PDFMerger = require("pdf-merger-js");
let merger = new PDFMerger();
const path = require("path");
const fs = require("fs");

const mergePdf = async (files) => {
  const randomFileName = new Date().getTime();
  await Promise.all(
    files.map(async (file) => {
      try {
        await merger.add(path.join(__dirname, file.path));
      } catch (e) {
        console.log("Invalid File Uploaded");
      }
    })
  ).then(async () => {
    await merger.save(`public/${randomFileName}.pdf`);
  });

  return randomFileName;
};

module.exports = {
  mergePdf,
};
