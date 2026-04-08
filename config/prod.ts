import path from 'path'
import Prerender from 'prerender-spa-plugin'
import webpackBundleAnalyzer from 'webpack-bundle-analyzer'
import type { UserConfigExport } from '@tarojs/cli'

export default {
	mini: {},
	h5: {
		/**
		 * WebpackChain 插件配置
		 * @docs https://github.com/neutrinojs/webpack-chain
		 */
		webpackChain: (chain): void => {
			/**
			 * 若 H5 编译产物体积超限, 则可使用 webpack-bundle-analyzer 进行分析
			 * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
			 */
			chain.plugin('analyzer').use(webpackBundleAnalyzer.BundleAnalyzerPlugin, [])
			/**
			 * 若 H5 首屏加载时间过长, 则可使用 prerender-spa-plugin 插件预加载首页
			 * @docs https://github.com/chrisvfritz/prerender-spa-plugin
			 */
			const staticDir: string = path.join(__dirname, '..', 'dist')
			chain.plugin('prerender').use(
				new Prerender({
					staticDir,
					routes: ['/pages/index/index'],
					postProcess: (context): PlainObject => {
						return { ...context, outputPath: path.join(staticDir, 'index.html') }
					},
				})
			)
		},
	},
} satisfies UserConfigExport
