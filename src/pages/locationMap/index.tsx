import React, { useEffect, useRef, useState } from 'react'
import { View, Map, Image, MapProps, BaseEventOrig, ITouchEvent } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { ImmersiveLayout, TImmersiveLayoutRenderCallbackParam } from '../../layouts/immersiveLayout'
import { TopHeaderMemo } from '../../components/topHeader'
import { BackBtnMemo } from '../../components/backBtn'
import locationIcon2 from '@/assets/images/maps/location2.png'
import { $ } from '@tarojs/extend'
import { TLocation, TMapMarker } from '../../types/types'
import { mainStore } from '../../constant'
import { useWatch } from '../../utils/WatchStore'

type TComponentDataHandler = {
	mapCenterMapStyleUpdateTimer: number
	mapRegionChangeEndTimer: number
	mapRegionSearchBtnTimer: number
	addressSelectorBtnDisabled: boolean
}

export default function ShopMap() {
	useWatch(mainStore.locationMapStore)
	const [, setFlush] = useState<number>(0)
	const dataHandlerRef: { current: TComponentDataHandler } = useRef<TComponentDataHandler>({
		mapCenterMapStyleUpdateTimer: null!,
		mapRegionChangeEndTimer: null!,
		mapRegionSearchBtnTimer: null!,
		addressSelectorBtnDisabled: true,
	})
	const setMapRegionSearchBtnShow = (): void => {
		window.clearTimeout(dataHandlerRef.current.mapRegionSearchBtnTimer)
		const zc = $('#mapRegionSearchBtn')
		zc.addClass('search-btn-container-flex')
		window.setTimeout((): void => {
			zc.addClass('search-btn-container-show')
			setFlush(prev => prev + 1)
		})
	}
	const setMapRegionSearchBtnHide = (): void => {
		const zc = $('#mapRegionSearchBtn')
		zc.removeClass('search-btn-container-show')
		dataHandlerRef.current.mapRegionSearchBtnTimer = window.setTimeout((): void => {
			zc.removeClass('search-btn-container-flex')
			setFlush(prev => prev + 1)
		}, 200)
	}
	const setMapCenterFixedMarkerBounce = (): void => {
		window.clearTimeout(dataHandlerRef.current.mapCenterMapStyleUpdateTimer)
		const zc = $('#mapFixedMark')
		zc.removeClass('map-fixed-mark-ani')
		dataHandlerRef.current.mapCenterMapStyleUpdateTimer = window.setTimeout((): void => {
			zc.addClass('map-fixed-mark-ani')
			setFlush(prev => prev + 1)
		}, 50)
	}
	const onRegionChangeAction = async (
		e: BaseEventOrig<MapProps.onRegionEventDetail<'begin'> | MapProps.onRegionEventDetail<'end'>>
	): Promise<void> => {
		if (e.type === 'end') {
			setMapCenterFixedMarkerBounce()
			window.clearTimeout(dataHandlerRef.current.mapRegionChangeEndTimer)
			dataHandlerRef.current.mapRegionChangeEndTimer = window.setTimeout(async (): Promise<void> => {
				const locationResult: TLocation = await mainStore.locationMapStore.mapComponent.getMapCenterGeographicCoord()
				if (!locationResult) {
					return
				}
				mainStore.locationMapStore.mapComponent.updateMapDataPosition(locationResult)
				setMapRegionSearchBtnShow()
				setFlush(prev => prev + 1)
			})
			return
		}
	}

	useEffect((): (() => void) => {
		mainStore.locationMapStore.createMapComponent('mapComponent')
		mainStore.locationMapStore.getCurrentLocation().then((): void => {
			setMapRegionSearchBtnShow()
		})
		return (): void => {
			Taro.hideLoading()
			mainStore.locationMapStore.destoryMapComponent()
			mainStore.locationMapStore.clear()
		}
	}, [])

	const markers: Array<TMapMarker> = mainStore.locationMapStore.mapComponent ? mainStore.locationMapStore.mapComponent.markers : []
	const mapData: TLocation = mainStore.locationMapStore.mapComponent
		? mainStore.locationMapStore.mapComponent.mapData
		: ({ longitude: 0, latitude: 0 } as TLocation)
	return (
		<View className="map-top-container">
			<ImmersiveLayout
				isShowBottomBar={false}
				render={(params: TImmersiveLayoutRenderCallbackParam): React.ReactElement => {
					return (
						<TopHeaderMemo
							title="Tencent Map"
							height={params.height}
							leftComponent={
								<BackBtnMemo
									onBackBtnClick={(): void => {
										Taro.navigateBack()
									}}
								/>
							}
						/>
					)
				}}
			>
				<View className="address-container">
					<View className="address-wrapper">
						<View className="address-map-wrapper">
							<Map
								id="mapComponent"
								className="map-canvas"
								longitude={mapData.longitude}
								latitude={mapData.latitude}
								markers={markers}
								onError={null!}
								onRegionChange={onRegionChangeAction}
								onTouchMove={(e: ITouchEvent): void => {
									dataHandlerRef.current.addressSelectorBtnDisabled = true
								}}
								onMarkerTap={(e: BaseEventOrig<MapProps.onMarkerTapEventDetail>): void => {
									console.log(`click map marker tap.`)
								}}
								onLabelTap={(e: BaseEventOrig<MapProps.onLabelTapEventDetail>): void => {
									console.log(`click map label tap.`)
								}}
							/>
							<Image id="mapFixedMark" className="map-fixed-mark" src={locationIcon2} />
						</View>
					</View>
				</View>
			</ImmersiveLayout>
		</View>
	)
}
