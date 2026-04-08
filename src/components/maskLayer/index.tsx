import React from 'react'
import { View, CommonEvent } from '@tarojs/components'
import './index.scss'

function MaskLayer(props: { backgroudColor?: string }): React.ReactElement {
	const { backgroudColor = `rgba(205, 205, 205, 0.25)` } = props
	const commonEventHandler = (e: CommonEvent): void => {
		e.preventDefault()
		e.stopPropagation()
	}
	return (
		<View
			className="mask-container"
			onClick={commonEventHandler}
			onTouchStart={commonEventHandler}
			onTouchMove={commonEventHandler}
			onTouchEnd={commonEventHandler}
			onTouchCancel={commonEventHandler}
			onLongClick={commonEventHandler}
			onLongTap={commonEventHandler}
			onTap={commonEventHandler}
			onLongPress={commonEventHandler}
		>
			<View
				className="mask-wrapper"
				style={{
					backgroundColor: backgroudColor,
				}}
			></View>
		</View>
	)
}

export const MaskLayerMemo = React.memo(MaskLayer)
