import Taro, { MapContext } from '@tarojs/taro'
import locationIcon1 from '@/assets/images/maps/location1.png'
import { TLocation, TMapMarker } from '../types/types'
import { geographyService } from '../constant'
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../services/GeographyService'

export class LocationMapComponent {
	private _mapCtx: MapContext
	private _mapId: string
	private _component: TaroGeneral.IAnyObject
	private _markers: Array<TMapMarker>
	private _mapData: TLocation
	constructor(mapId: string, component?: TaroGeneral.IAnyObject) {
		this._mapId = mapId
		this._component = component!
		this._mapCtx = Taro.createMapContext(this._mapId)
		this._markers = []
		this._mapData = null!
		this.initial()
	}

	public initial(): void {
		const cacheLocationRes: TLocation = geographyService.getStorageCurrentLocation()
		if (cacheLocationRes) {
			this._mapData = { ...cacheLocationRes }
		} else {
			this._mapData = {
				longitude: DEFAULT_LONGITUDE,
				latitude: DEFAULT_LATITUDE,
			}
		}
	}

	public get mapCtx(): MapContext {
		return this._mapCtx
	}

	public get mapId(): string {
		return this._mapId
	}

	public get component(): TaroGeneral.IAnyObject {
		return this._component
	}

	public get markers(): Array<TMapMarker> {
		return this._markers
	}
	public set markers(value: Array<TMapMarker>) {
		this._markers = value
	}

	public get mapData(): TLocation {
		return this._mapData
	}
	public set mapData(value: TLocation) {
		this._mapData = value
	}

	public destory(): void {
		this.mapData = this._component = this._mapId = this._mapCtx = undefined!
	}

	public updateMapDataPosition(location: TLocation): void {
		this.mapData.longitude = location.longitude
		this.mapData.latitude = location.latitude
	}

	/**
	 * 获取当前地图画布中心点的坐标
	 */
	public async getMapCenterGeographicCoord(): Promise<{ longitude: number; latitude: number }> {
		return new Promise((_): void => {
			this.mapCtx.getCenterLocation({
				success(res: MapContext.GetCenterLocationSuccessCallbackResult): void {
					_({ longitude: res.longitude, latitude: res.latitude })
				},
				fail(): void {
					_(null!)
				},
			})
		})
	}

	public createMarkerItem(
		id: number,
		longitude: number,
		latitude: number,
		name: string,
		iconPath: string = locationIcon1,
		profile: Partial<any> = {}
	): TMapMarker {
		return {
			id,
			longitude,
			latitude,
			width: 28,
			height: 34,
			name,
			desc: name,
			iconPath,
			label: {
				content: name,
				color: `rgba(0, 0, 0, 1.0)`,
				fontSize: 12,
				anchorX: 0,
				anchorY: 5,
				borderWidth: 1,
				borderColor: `rgba(240, 240, 240, 1.0)`,
				borderRadius: 5,
				bgColor: `rgba(255, 255, 255, 1.0)`,
				padding: 5,
				textAlign: 'center',
				...profile,
			},
		}
	}
}
