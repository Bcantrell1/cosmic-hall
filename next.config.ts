import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'placehold.co',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'spaceholder.cc',
				port: '',
				pathname: '/**'
			}
		]
	}
};

export default nextConfig;
