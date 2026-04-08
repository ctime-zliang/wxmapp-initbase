import { WatchStore } from '../utils/WatchStore'
import { MainStore } from './Main'

export class ComponentStore extends WatchStore {
	public parent: MainStore
	private _isShowMaskLayer: boolean
	private _refresherEnabled: boolean
	private _refresherTriggered: boolean
	constructor(parent: MainStore) {
		super()
		this.parent = parent
		this._isShowMaskLayer = false
		this._refresherEnabled = false
		this._refresherTriggered = false
	}

	public get isShowMaskLayer(): boolean {
		return this._isShowMaskLayer
	}
	public set isShowMaskLayer(value: boolean) {
		this._isShowMaskLayer = value
		this.notify()
	}

	public get refresherEnabled(): boolean {
		return this._refresherEnabled
	}
	public set refresherEnabled(value: boolean) {
		this._refresherEnabled = value
		this.notify()
	}

	public get refresherTriggered(): boolean {
		return this._refresherTriggered
	}
	public set refresherTriggered(value: boolean) {
		this._refresherTriggered = value
		this.notify()
	}

	public clear(): void {
		this.isShowMaskLayer = false
		this.refresherEnabled = false
		this.refresherTriggered = false
	}
}
