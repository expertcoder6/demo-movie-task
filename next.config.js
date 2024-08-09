/** @type {import('next').NextConfig} */
const nextConfig = {
    target: 'serverless',
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://demo-movie-task.vercel.app*',
            },
        ];
    },
};

export default nextConfig;
