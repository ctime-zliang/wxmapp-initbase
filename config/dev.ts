import type { UserConfigExport } from '@tarojs/cli'

export default {
	logger: {
		quiet: false,
		stats: true,
	},
	mini: {},
	h5: {
		webpackChain: (chain): void => {
			if (process.env.NODE_ENV === 'development') {
				chain.merge({
					cache: true,
				})
			}
		},
	},
} satisfies UserConfigExport
