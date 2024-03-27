/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SECRET_KEY_ADMIN: process.env.SECRET_KEY_ADMIN,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
};

export default nextConfig;
