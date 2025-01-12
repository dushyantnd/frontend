/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["res.cloudinary.com","test.com"], // Ensure this matches the domain exactly
  },
};

module.exports = nextConfig;
