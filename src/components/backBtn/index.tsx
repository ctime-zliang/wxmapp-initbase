import React from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import backIcon from '@/assets/images/header/back.png'

function BackBtn(props: { onBackBtnClick: () => void }): React.ReactElement {
	const { onBackBtnClick } = props
	return (
		<View className="back-container" onClick={onBackBtnClick}>
			<Image className="back-icon" src={backIcon} />
		</View>
	)
}

export const BackBtnMemo = React.memo(BackBtn)
