/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.slingacademy.com',
      'app-storagebucket-ta5krb222iam.s3.us-east-1.amazonaws.com',
      '	https://stylish-mvp-ad9l9.ampt.app',
    ],
    formats: ['image/webp'],
  },
  middleware: './middleware.ts', // Path to your middleware file
  publicRuntimeConfig: {
    base_url: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

module.exports = nextConfig;
