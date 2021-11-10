/** @type {import('next').NextConfig} */
let withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  }
});
