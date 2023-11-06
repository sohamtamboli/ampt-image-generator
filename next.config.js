/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.slingacademy.com',
      'app-storagebucket-ta5krb222iam.s3.us-east-1.amazonaws.com',
    ],
  },
  middleware: './middleware.ts', // Path to your middleware file

};

module.exports = nextConfig;
