import Taro from '@tarojs/taro'
import { accountServices } from '../constant'
import { MainStore } from './Main'
import { TLoginedInfoData, TUserInfoData } from '../services/AccountServices'
import { EPersonalCardKey } from '../config/enums'
import { ComponentStore } from './ComponentStore'

export type TCardItem = {
	key: EPersonalCardKey
	label: string
	thumbUrl: string
	pageUrl: string
}
export class PersonalStore extends ComponentStore {
	private _isLogined: boolean
	private _userInfo: TUserInfoData
	private _loginedInfo: TLoginedInfoData
	private _cards: Array<TCardItem>
	constructor(parent: MainStore) {
		super(parent)
		this._isLogined = false
		this._userInfo = null!
		this._loginedInfo = null!
		this._cards = []
	}

	public get isLogined(): boolean {
		return this._isLogined
	}
	public set isLogined(value: boolean) {
		this._isLogined = value
		this.notify()
	}

	public get userInfo(): TUserInfoData {
		return this._userInfo
	}
	public set userInfo(value: TUserInfoData) {
		this._userInfo = value
		this.notify()
	}

	public get loginedInfo(): TLoginedInfoData {
		return this._loginedInfo
	}
	public set loginedInfo(value: TLoginedInfoData) {
		this._loginedInfo = value
		this.notify()
	}

	public get cards(): Array<TCardItem> {
		return this._cards
	}

	public onCardItemClickAction(itemData: TCardItem): void {
		if (!this.isLogined) {
			Taro.showToast({
				title: `Please log in first`,
			})
			return
		}
		Taro.navigateTo({
			url: itemData.pageUrl,
		})
	}

	public async refreshPlatformUserInfo(): Promise<TUserInfoData> {
		let userInfo: TUserInfoData = null!
		try {
			userInfo = await accountServices.getCurrentUserInfoByStorage()
			if (!userInfo) {
				userInfo = await accountServices.getCurentUserInfoByPlatform()
			}
			if (userInfo) {
				accountServices.setCurrentUserInfoByStorage(userInfo)
			}
		} catch (e) {
			userInfo = null!
		}
		if (!userInfo) {
			Taro.showToast({
				title: `Failed to obtain WeChat user information`,
				icon: 'error',
			})
		}
		this.userInfo = userInfo
		return userInfo
	}
}
