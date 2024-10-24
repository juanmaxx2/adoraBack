const server = require("./src/app");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001

const institutionLoad = require("./src/helpers/institutionLoad.js");
const provinceLoad = require("./src/helpers/provinceLoad.js");
const { cloudinary_js_config } = require("./src/helpers/cloudinary.js");

conn.sync({ force: true }).then(async () => {
  await provinceLoad();
  await institutionLoad();
  cloudinary_js_config;
  server.listen(port, () => {
    console.log(`Server raised in port 3001`);
  });
});