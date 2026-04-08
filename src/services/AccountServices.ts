import Taro from '@tarojs/taro'
import { localCacheStorage } from '../constant'
import { safeJsonParse } from '../utils/utils'

export type TUserInfoData = {
	nickName: string
	avatarUrl: string
}

export type TLoginedInfoData = {
	appCode: string
	sessionId: string
}

export class AccountServices {
	constructor() {}

	public setCurrentUserInfoByStorage(userInfo: TUserInfoData): void {
		if (!userInfo) {
			return
		}
		localCacheStorage.set('current-userinfo', JSON.stringify(userInfo))
	}

	public getCurrentUserInfoByStorage(): TUserInfoData {
		const cacheParseRes: TUserInfoData = safeJsonParse(localCacheStorage.get('current-userinfo')!)
		let userInfo: TUserInfoData = null!
		if (cacheParseRes) {
			userInfo = {
				nickName: cacheParseRes.nickName,
				avatarUrl: cacheParseRes.avatarUrl,
			}
		}
		return userInfo
	}

	public async getCurentUserInfoByPlatform(): Promise<TUserInfoData> {
		let userInfo: TUserInfoData = null!
		try {
			const userInfoRes: Taro.getUserProfile.SuccessCallbackResult = await Taro.getUserProfile({
				desc: `Get account information, set data display`,
			})
			if (userInfoRes && userInfoRes.userInfo) {
				userInfo = {
					nickName: userInfoRes.userInfo.nickName,
					avatarUrl: userInfoRes.userInfo.avatarUrl,
				}
			}
		} catch (e) {}
		return userInfo
	}
}
