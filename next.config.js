/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    nextConfig,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/dwb211sw5/image/upload/**',
            },
        ],
    },
}
