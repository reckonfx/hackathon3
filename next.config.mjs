/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "cdn.sanity.io",
            pathname: "/images/**", // Match the specific path structure
          },
        ],
      },
};

export default nextConfig;
