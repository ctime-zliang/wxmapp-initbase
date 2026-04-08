/// <reference types="@tarojs/taro" />

declare type PlainObject<T = any> = Record<string, T>

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production'
		TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
		/**
		 * 当前构建的小程序 appid
		 * 		若不同环境有不同的小程序, 可通过在 env 文件中配置环境变量`TARO_APP_ID`来快速切换 appid, 无需手动去修改 dist/project.config.json 文件
		 * @see https://taro-docs.jd.com/docs/next/env-mode-config#特殊环境变量-taro_app_id
		 */
		TARO_APP_ID: string
		/**
		 * 当前运行环境
		 */
		TARO_APP_ENV: string
		/**
		 * 当前构建的小程序title
		 */
		TARO_APP_TITLE: string
		/**
		 * 请求根路径
		 */
		TARO_APP_BASE_URL: string
		/**
		 * 资源路径
		 */
		TARO_APP_RESOURCE_URL: string
		/**
		 * 代理路径
		 */
		TARO_APP_SERVE_URl: string
	}
}
