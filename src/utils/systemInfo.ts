import Taro from '@tarojs/taro'

export type TSystemInfo = Taro.getSystemInfoSync.Result & {
	navBarHeight: number
	safeTopDistance: number
	headerHeight: number
	isIOS: boolean
	rect: Taro.getMenuButtonBoundingClientRect.Rect
}
export function getSystemInfo(): TSystemInfo {
	const systemInfo: Taro.getSystemInfoSync.Result = Taro.getSystemInfoSync()
	let rectResult: Taro.getMenuButtonBoundingClientRect.Rect = null!
	try {
		if (Taro.getMenuButtonBoundingClientRect instanceof Function) {
			rectResult = Taro.getMenuButtonBoundingClientRect()
		}
		if (rectResult === null) {
			throw 'Get Menu-Button Bounding ClientRect Error.'
		}
		if (!rectResult.width) {
			throw 'Get Menu-Button Bounding ClientRect Error.'
		}
	} catch (err) {
		let gap: number = 0
		let width: number = 96
		if (systemInfo.platform === 'android') {
			gap = 8
			width = 96
		} else if (systemInfo.platform === 'devtools') {
			if (`${systemInfo.system}`.toLowerCase().includes('ios')) {
				gap = 5.5
			} else {
				gap = 7.5
			}
		} else {
			gap = 4
			width = 88
		}
		if (!systemInfo.statusBarHeight) {
			systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20
		}
		rectResult = {
			bottom: systemInfo.statusBarHeight + gap + 32,
			height: 32,
			left: systemInfo.windowWidth - width - 10,
			right: systemInfo.windowWidth - 10,
			top: systemInfo.statusBarHeight + gap,
			width: width,
		}
	}
	const gap: number = rectResult.top - systemInfo.statusBarHeight!
	const navBarHeight: number = 2 * gap + rectResult.height
	const safeTopDistance: number = rectResult.bottom
	const systemText: string = `${systemInfo.system}`.toLowerCase()
	return {
		...systemInfo,
		navBarHeight,
		safeTopDistance,
		headerHeight: systemInfo.statusBarHeight || 0 + navBarHeight,
		isIOS: systemText.includes('ios') || systemText.includes('mac'),
		rect: rectResult,
	}
}
