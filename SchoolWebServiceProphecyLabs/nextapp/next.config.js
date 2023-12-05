/** @type {import('next').NextConfig} */
const rewrites = () => { 
    return [
        {
            source: "/Home/:path*",
            destination: "http://localhost:5136/Home/:path*", 
        },
    ];
}; 

const nextConfig = {
    reactStrictMode: true,
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        }
        return config
    },
    images: {
        loader: 'akamai',
        path: '/',
    },
    rewrites,
}

module.exports = nextConfig