/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        port: "1337",
        protocol: "http",
        pathname: "/uploads/**",
      },
    ],
  },
};
