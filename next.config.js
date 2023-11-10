/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        domains: ['res.cloudinary.com'],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        loader: 'default',
        path: '/_next/image',
    },
}