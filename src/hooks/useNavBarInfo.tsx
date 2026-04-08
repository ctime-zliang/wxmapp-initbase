import Taro from '@tarojs/taro'

export type TUseNavBarInfoResult = {
	statusBarHeight: number
	navBarHeight: number
	totalHeight: number
	menuBoundingRect: Taro.getMenuButtonBoundingClientRect.Rect
}
export function useNavBarInfo(): TUseNavBarInfoResult {
	const menuBoundingRect: Taro.getMenuButtonBoundingClientRect.Rect = Taro.getMenuButtonBoundingClientRect()
	const statusBarHeight: number = Taro.getWindowInfo().statusBarHeight || 0
	const navBarHeight: number = menuBoundingRect.bottom + menuBoundingRect.top - statusBarHeight
	const totalHeight: number = navBarHeight
	return {
		statusBarHeight,
		navBarHeight,
		totalHeight,
		menuBoundingRect,
	}
}
