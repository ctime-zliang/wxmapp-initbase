import React, { useEffect } from 'react'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import { ImmersiveLayout, TImmersiveLayoutRenderCallbackParam } from '../../layouts/immersiveLayout'
import { TopHeaderMemo } from '../../components/topHeader'
import photoThumbnail from '@/assets/images/photo-thumbnail.jpg'
import { mainStore } from '../../constant'
import { useWatch } from '../../utils/WatchStore'
import { TCardItem } from '../../store/PersonalStore'
import { TUserInfoData } from '../../services/AccountServices'

export default function Personal(): React.ReactElement {
	useWatch(mainStore.personalStore)

	useEffect((): void => {
		mainStore.personalStore.refreshPlatformUserInfo()
	}, [])

	const userInfo: TUserInfoData = mainStore.personalStore.userInfo ? mainStore.personalStore.userInfo : ({} as TUserInfoData)
	return (
		<View className="personal-top-container">
			<ImmersiveLayout
				isShowBottomBar={true}
				render={(params: TImmersiveLayoutRenderCallbackParam): React.ReactElement => {
					return <TopHeaderMemo title="Personal" height={params.height} />
				}}
			>
				<View className="userinfo-container">
					<View className="userinfo-wrapper">
						<View className="userinfo-avatar-wrapper">
							<Image className="userinfo-avatar" src={userInfo.avatarUrl || photoThumbnail} />
						</View>
						<View className="userinfo-nickname-wrapper">
							<Text
								className="userinfo-nickname"
								onClick={(): void => {
									mainStore.personalStore.refreshPlatformUserInfo()
								}}
							>
								{userInfo.nickName || 'Click to use WeChat user info'}
							</Text>
						</View>
					</View>
				</View>
				<View className="cards-container">
					<View className="cards-wrapper">
						<View className="cards-ulist">
							{mainStore.personalStore.cards.map((item: TCardItem): React.ReactElement => {
								return (
									<View className="cards-ulistitem-wrapper">
										<View className="cards-size-wrapper">
											<View className="cards-size-position">
												<View
													className="cards-content-wrapper"
													onClick={(): void => {
														mainStore.personalStore.onCardItemClickAction(item)
													}}
												>
													<View className="cards-image-wrapper">
														<Image className="cards-image" src={item.thumbUrl} />
													</View>
													<View className="cards-name-wrapper">
														<View className="cards-name">
															<Text>{item.label}</Text>
														</View>
													</View>
												</View>
											</View>
										</View>
									</View>
								)
							})}
						</View>
					</View>
				</View>
			</ImmersiveLayout>
		</View>
	)
}
