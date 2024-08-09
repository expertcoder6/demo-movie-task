/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceHttp: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://demo-movie-task.vercel.app/*',
            },
        ];
    },
};

export default nextConfig;
