const fs = require("fs").promises;
const path = require("path");

const lib = {};
lib.storePath = path.join(__dirname, "/../uploads");
lib.delete = async (file) => {
  // unlink file
  await fs.unlink(`${lib.storePath}/${file}`);
};

module.exports = lib;
