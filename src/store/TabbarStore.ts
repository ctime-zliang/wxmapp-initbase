import { ECustomTabbarKey } from '../config/enums'
import { TABBAR_PAGES } from '../config/pages'
import { MainStore } from './Main'
import { ComponentStore } from './ComponentStore'

export type TCustomTabbarItem = {
	key: string
	pagePath: string
	text: string
	iconPath: string
	selectedIconPath: string
}
export class TabbarStore extends ComponentStore {
	private _tabbarList: Array<TCustomTabbarItem>
	private _activeTabbarKey: string
	constructor(parent: MainStore) {
		super(parent)
		this._tabbarList = Object.values(TABBAR_PAGES)
		this._activeTabbarKey = ECustomTabbarKey.Home
	}

	public get tabbarList(): Array<TCustomTabbarItem> {
		return this._tabbarList
	}
	public set tabbarList(value: Array<TCustomTabbarItem>) {
		this._tabbarList = value
		this.notify()
	}

	public get activeTabbarKey(): string {
		return this._activeTabbarKey
	}
	public set activeTabbarKey(value: string) {
		this._activeTabbarKey = value
		this.notify()
	}
}
