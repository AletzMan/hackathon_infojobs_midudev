/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['multimedia.infojobs.net', 'media.infojobs.net', 'www.infojobs.net'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
