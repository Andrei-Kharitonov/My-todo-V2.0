/** @type {import('next').NextConfig} */
let withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    // dest: "public", // comment out this line
    disable: process.env.NODE_ENV === "development",
    register: true,
    sw: "/sw.js"
  }
});
