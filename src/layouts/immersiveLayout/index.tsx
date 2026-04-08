import { View, ScrollView, CommonEventFunction } from '@tarojs/components'
import { useNavBarInfo } from '../../hooks/useNavBarInfo'

export type TImmersiveLayoutRenderCallbackParam = {
	height: number
}

export function ImmersiveLayout(props: {
	children?: React.ReactNode
	isShowBottomBar: boolean
	refresherEnabled?: boolean
	refresherTriggered?: boolean
	onRefresherRefresh?: CommonEventFunction
	render: (params: TImmersiveLayoutRenderCallbackParam) => React.ReactElement
}): React.ReactElement {
	const { render, isShowBottomBar, refresherEnabled = false, refresherTriggered = false, children, onRefresherRefresh } = props
	const { statusBarHeight, totalHeight } = useNavBarInfo()
	const style: React.CSSProperties = {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		height: `${totalHeight}px`,
		paddingTop: `${statusBarHeight}px`,
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
		zIndex: 999,
	}
	return (
		<View>
			<View className="__navBar" style={style}>
				<View>{render({ height: totalHeight - statusBarHeight })}</View>
			</View>
			<ScrollView
				className="__scrollView"
				scrollY={true}
				refresherEnabled={refresherEnabled}
				refresherTriggered={refresherTriggered}
				onRefresherRefresh={onRefresherRefresh}
				style={{ height: '100vh', paddingTop: `${totalHeight}px`, paddingBottom: isShowBottomBar ? `49px` : '0' }}
			>
				{children}
			</ScrollView>
		</View>
	)
}
