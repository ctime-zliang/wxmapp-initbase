import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import locationIcon2 from '@/assets/images/maps/location2.png'

function LocationShow(props: { addressDesc: string; onAddressShowComponentClick: () => void }): React.ReactElement {
	const { addressDesc, onAddressShowComponentClick } = props
	return (
		<View className="local-position" onClick={onAddressShowComponentClick}>
			<Image className="local-position-icon" src={locationIcon2} />
			<Text className="local-position-text">{addressDesc}</Text>
		</View>
	)
}

export const LocationShowMemo = React.memo(LocationShow)
