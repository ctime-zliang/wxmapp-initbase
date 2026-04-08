import Taro from '@tarojs/taro'
import { TLocation } from '../types/types'
import { MainStore } from './Main'
import { LocationMapComponent } from './LocationMapComponent'
import { geographyService } from '../constant'
import { ComponentStore } from './ComponentStore'

export class LocationMapStore extends ComponentStore {
	private _mapComponent: LocationMapComponent
	constructor(parent: MainStore) {
		super(parent)
		this._mapComponent = undefined!
	}

	public get mapComponent(): LocationMapComponent {
		return this._mapComponent
	}

	public clear(): void {
		super.clear()
		this._mapComponent = undefined!
	}

	public createMapComponent(mapId: string, component?: TaroGeneral.IAnyObject): void {
		this._mapComponent = new LocationMapComponent(mapId, component)
	}

	public destoryMapComponent(): void {
		if (this._mapComponent) {
			this._mapComponent.destory()
			this._mapComponent = null!
		}
	}

	public async getCurrentLocation(): Promise<void> {
		const locationResult: TLocation = await geographyService.getCurrentLocation()
		if (!locationResult) {
			Taro.showToast({
				title: 'Pos failed',
				icon: 'error',
			})
			return
		}
		this.mapComponent.updateMapDataPosition(locationResult)
	}
}
