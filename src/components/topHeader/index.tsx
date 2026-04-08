import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { TImmersiveLayoutRenderCallbackParam } from '../../layouts/immersiveLayout'

function TopHeader(
	props: TImmersiveLayoutRenderCallbackParam & {
		title: string
		leftComponent?: React.ReactNode
	}
): React.ReactElement {
	const { title, leftComponent, height } = props
	return (
		<View className="header-container" style={{ height: `${height}px` }}>
			<View className="header-wrapper">
				{leftComponent}
				<View className="page-title">
					<Text>{title}</Text>
				</View>
			</View>
		</View>
	)
}

export const TopHeaderMemo = React.memo(TopHeader)
