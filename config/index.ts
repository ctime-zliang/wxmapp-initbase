import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import tailwindcss from '@tailwindcss/postcss'
import devConfig from './dev'
import prodConfig from './prod'
import path from 'path'

// https://taro-docs.jd.com/docs/next/config#defineconfig
export default defineConfig(async (merge, { mode }): Promise<PlainObject> => {
	const isProd: boolean = mode === 'production'
	const isDev: boolean = mode === 'development'
	const baseConfig: UserConfigExport = {
		projectName: 'wxmapp-initbase',
		date: '1997-01-01',
		designWidth: (input: any): number => {
			/**
			 * 配置 NutUI 375 尺寸
			 */
			if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
				return 375
			}
			return 750
		},
		/**
		 * 设计稿转换规则
		 */
		deviceRatio: {
			640: 2.34 / 2,
			750: 1,
			375: 2,
			828: 1.81 / 2,
		},
		sourceRoot: 'src',
		outputRoot: 'dist',
		plugins: [
			'@tarojs/plugin-http',
			[
				'@tarojs/plugin-html',
				{
					/**
					 * 包含 `demo-`、`van-` 的类名选择器中的 px 单位不会被解析
					 */
					pxtransformBlackList: [/demo-/, /van-/],
				},
			],
		],
		defineConstants: {
			'process.env.TARO_APP_ENV': JSON.stringify(process.env.TARO_APP_ENV),
			'process.env.TARO_APP_ID': JSON.stringify(process.env.TARO_APP_ID),
			'process.env.TARO_APP_BASE_URL': JSON.stringify(process.env.TARO_APP_BASE_URL),
			'process.env.TARO_APP_RESOURCE_URL': JSON.stringify(process.env.TARO_APP_RESOURCE_URL),
			'process.env.TARO_APP_SERVE_URl': JSON.stringify(process.env.TARO_APP_SERVE_URl),
			'process.env.TARO_APP_TITLE': JSON.stringify(process.env.TARO_APP_TITLE),
		},
		copy: {
			patterns: [],
			options: {},
		},
		framework: 'react',
		compiler: {
			type: 'webpack5',
			prebundle: {
				exclude: ['@nutui/nutui-react-taro'],
				enable: false,
				force: true,
			},
		},
		alias: {
			'@': path.resolve(__dirname, '../src'),
		},
		/**
		 * 开启cache持久化缓存
		 */
		cache: {
			/**
			 * Webpack 持久化缓存配置
			 * 		默认配置请参考: https://docs.taro.zone/docs/config-detail#cache
			 */
			enable: true,
		},
		mini: {
			optimizeMainPackage: {
				enable: true,
				exclude: [],
			},
			postcss: {
				pxtransform: {
					enable: true,
					config: {},
				},
				url: {
					enable: true,
					config: {
						limit: 1024,
					},
				},
				cssModules: {
					enable: true, // 默认为 false,如需使用 css modules 功能, 则设为 true
					config: {
						namingPattern: 'module', // 转换模式，取值为 global/module
						generateScopedName: '[name]__[local]___[hash:base64:5]',
					},
				},
			},
			webpackChain: (chain): void => {
				chain.merge({
					performance: {
						maxEntrypointSize: 1024 * 1024 * 2,
						maxAssetSize: 1024 * 1024 * 2,
					},
				})
				chain.merge({
					plugin: {
						install: {
							plugin: UnifiedWebpackPluginV5,
							args: [
								{
									appType: 'taro',
									/**
									 * 替代 postcssconfig 内的 postcss-rem-to-responsive-pixel 插件
									 */
									rem2rpx: true,
								},
							],
						},
					},
				})
				chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
			},
		},
		h5: {
			publicPath: '/',
			staticDirectory: 'static',
			output: {
				filename: 'js/[name].[hash:8].js',
				chunkFilename: 'js/[name].[chunkhash:8].js',
			},
			miniCssExtractPluginOption: {
				ignoreOrder: true,
				filename: 'css/[name].[hash].css',
				chunkFilename: 'css/[name].[chunkhash].css',
			},
			postcss: {
				autoprefixer: {
					enable: true,
					config: {},
				},
				cssModules: {
					enable: true,
					config: {
						namingPattern: 'module',
						generateScopedName: '[name]__[local]___[hash:base64:5]',
					},
				},
			},
			webpackChain(chain) {
				chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
			},
		},
		rn: {
			appName: 'taroDemo',
			postcss: {
				cssModules: {
					enable: true,
				},
			},
		},
	}
	process.env.BROWSERSLIST_ENV = process.env.NODE_ENV
	if (isDev) {
		return merge({}, baseConfig, devConfig)
	}
	return merge({}, baseConfig, prodConfig)
})
