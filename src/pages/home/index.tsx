import React, { useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import { ImmersiveLayout, TImmersiveLayoutRenderCallbackParam } from '../../layouts/immersiveLayout'
import { TopHeaderMemo } from '../../components/topHeader'
import { mainStore } from '../../constant'
import Taro from '@tarojs/taro'
import { LocationShowMemo } from '../../components/locationShow'
import { useWatch } from '../../utils/WatchStore'
import { ERemoteDataLoadStatus } from '../../config/enums'

export default function Home(): React.ReactElement {
	useWatch(mainStore.homeStore)
	useWatch(mainStore.personalStore)

	useLoad((): void => {
		console.log('Current Env:>> ', process.env.NODE_ENV, process.env.TARO_APP_TITLE, process.env.TARO_APP_RESOURCE_URL)
		mainStore.homeStore.loadData()
		mainStore.homeStore.refreshCurrentLocation()
	})
	useEffect((): void => {
		mainStore.homeStore.refreshCurrentLocation()
	}, [])

	return (
		<View className="home-top-container">
			<ImmersiveLayout
				isShowBottomBar={true}
				render={(params: TImmersiveLayoutRenderCallbackParam): React.ReactElement => {
					return (
						<TopHeaderMemo
							height={params.height}
							title="Home"
							leftComponent={
								<LocationShowMemo
									addressDesc={mainStore.homeStore.addressDesc}
									onAddressShowComponentClick={(): void => {
										if (mainStore.homeStore.loadLocationStatus !== ERemoteDataLoadStatus.loaded) {
											return
										}
										Taro.navigateTo({
											url: `/pages/locationMap/index`,
										})
									}}
								/>
							}
						/>
					)
				}}
			>
				<View className="module-container">
					<Text>WeChat Mini Program App</Text>
				</View>
			</ImmersiveLayout>
		</View>
	)
}
