import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'
import { mainStore } from '../constant'
import { useWatch } from '../utils/WatchStore'
import { TCustomTabbarItem } from '../store/TabbarStore'

export default function CustomTabBar(): React.ReactElement {
	useWatch(mainStore.tabbarStore)
	const switchTab = (item: TCustomTabbarItem): void => {
		mainStore.tabbarStore.activeTabbarKey = item.key
		Taro.switchTab({ url: '/' + item.pagePath })
	}
	return (
		<View className="custom-tabbar-container ios">
			<View className="custom-tabbar-wrapper">
				{mainStore.tabbarStore.tabbarList.map(
					(item: TCustomTabbarItem, index: number): React.ReactElement => (
						<View
							key={index}
							className={classNames('custom-tabbar-item')}
							onClick={(): void => {
								switchTab(item)
							}}
						>
							<Image
								className="custom-tabbar-item-icon"
								src={mainStore.tabbarStore.activeTabbarKey === item.key ? item.selectedIconPath : item.iconPath}
							/>
							<View
								className={classNames('custom-tabbar-item-text', { 'is-active': mainStore.tabbarStore.activeTabbarKey === item.key })}
							>
								<Text>{item.text}</Text>
							</View>
						</View>
					)
				)}
			</View>
		</View>
	)
}
