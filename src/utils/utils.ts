import { getSystemInfo } from './systemInfo'

export function rpx2px(rpx: number): number {
	const { screenWidth } = getSystemInfo()
	return rpx * (screenWidth / 750)
}

export function px2rpx(px: number): number {
	const { screenWidth } = getSystemInfo()
	return px * (750 / screenWidth)
}

export async function sleep(delay: number = 10): Promise<void> {
	return new Promise((_): void => {
		window.setTimeout(_, delay)
	})
}

export function params2json(params: string = '', slice: string = '&'): PlainObject {
	const result: PlainObject = {}
	params.split(slice).forEach((item: string): void => {
		const arr: Array<string> = item.split('=')
		const key: string = arr[0] || ''
		if (item && key) {
			result[key] = arr[1] || ''
		}
	})
	return result
}

export function json2params(json: PlainObject = {}, slice: string = '&'): string {
	return Object.keys(json)
		.reduce((acc: string, item: string): string => {
			return acc + '' + item + '=' + json[item] + slice
		}, '')
		.slice(0, -1)
}

export function computedTopHeight(num: number): number {
	const { statusBarHeight, navBarHeight } = getSystemInfo()
	return statusBarHeight || 0 + navBarHeight + rpx2px(num)
}

export function safeJsonParse(str: string): any {
	try {
		return JSON.parse(str)
	} catch (e) {
		return null!
	}
}
