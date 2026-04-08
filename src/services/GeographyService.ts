import Taro from '@tarojs/taro'
import { TENCENT_MAP_KEY } from '../config/config'
import QQMapWX from '../libs/qqmap-wx-jssdk.min.js'
import { TLocalityDesc, TLocation } from '../types/types'
import { localCacheStorage } from '../constant'
import { safeJsonParse } from '../utils/utils'

export const DEFAULT_LONGITUDE: number = 114.057868
export const DEFAULT_LATITUDE: number = 22.543099

export const REFRESH_MOVE_DIST: number = 1000

export class GeographyService {
	public static EARTH_RADIUS: number = 6378137
	public static getDistance(pos1: TLocation, pos2: TLocation): number {
		const rad = (d: number): number => {
			return (d * Math.PI) / 180
		}
		const a: number = rad(pos1.latitude) - rad(pos2.latitude)
		const b: number = rad(pos1.longitude) - rad(pos2.longitude)
		const s: number =
			2 *
			Math.asin(
				Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad(pos1.latitude)) * Math.cos(rad(pos2.latitude)) * Math.pow(Math.sin(b / 2), 2))
			)
		return Math.abs(s * GeographyService.EARTH_RADIUS)
	}

	private _qqmapsdk: QQMapWX
	private _currentLocation: TLocation
	constructor() {
		this._qqmapsdk = new QQMapWX({
			key: TENCENT_MAP_KEY,
		})
		this._currentLocation = null!
	}

	public get currentLocation(): TLocation {
		if (!this._currentLocation) {
			this._currentLocation = this.createDefaultLocation()
		}
		return this._currentLocation
	}
	public set currentLocation(value: TLocation) {
		this._currentLocation = value
	}

	public createDefaultLocation(): TLocation {
		return {
			longitude: DEFAULT_LONGITUDE,
			latitude: DEFAULT_LATITUDE,
		}
	}

	/**
	 * 清除缓存的定位信息: 坐标信息
	 */
	public clearStorageCurrentLocation(): void {
		localCacheStorage.remove('current-location')
	}

	/**
	 * 清除缓存的定位信息: 地区描述信息
	 */
	public clearStorageCurrentLocality(): void {
		localCacheStorage.remove('current-locality')
	}

	/**
	 * 设置缓存的定位信息: 坐标信息
	 */
	public setStorageCurrentLocation(location: TLocation): void {
		if (!location) {
			return
		}
		localCacheStorage.set('current-location', JSON.stringify(location))
	}

	/**
	 * 设置缓存的定位信息: 地区描述信息
	 */
	public setStorageCurrentLocality(locality: TLocalityDesc): void {
		if (!locality) {
			return
		}
		localCacheStorage.set('current-locality', JSON.stringify(locality))
	}

	/**
	 * 获取缓存的定位信息: 坐标信息
	 */
	public getStorageCurrentLocation(): TLocation {
		const cacheParseRes: TLocation = safeJsonParse(localCacheStorage.get('current-location')!)!
		if (
			cacheParseRes &&
			typeof cacheParseRes.longitude === 'number' &&
			typeof cacheParseRes.latitude === 'number' &&
			!Number.isNaN(cacheParseRes.longitude) &&
			!Number.isNaN(cacheParseRes.latitude)
		) {
			return { ...cacheParseRes }
		}
		return null!
	}

	/**
	 * 获取缓存的定位信息: 地区描述信息
	 */
	public getStorageCurrentLocality(): TLocalityDesc {
		const cacheParseRes: TLocalityDesc = safeJsonParse(localCacheStorage.get('current-locality')!)
		if (cacheParseRes) {
			return { ...cacheParseRes }
		}
		return null!
	}

	/**
	 * 获取当前定位: 坐标信息
	 */
	public async getCurrentLocation(forceFresh: boolean = false): Promise<TLocation> {
		try {
			if (forceFresh === false) {
				const cacheLocationRes: TLocation = this.getStorageCurrentLocation()
				if (cacheLocationRes) {
					return cacheLocationRes
				}
			}
			const res: Taro.getLocation.SuccessCallbackResult = await Taro.getLocation({
				type: 'gcj02',
				isHighAccuracy: true,
			})
			const result: TLocation = {
				latitude: res.latitude,
				longitude: res.longitude,
			}
			this.setStorageCurrentLocation(result)
			return result
		} catch (e) {
			return null!
		}
	}

	/**
	 * 获取当前定位: 地区描述信息
	 */
	public async getCurrentLocality(forceFresh: boolean = false): Promise<TLocalityDesc> {
		return new Promise(async (_): Promise<void> => {
			if (forceFresh === false) {
				const cahceLocalityRes: TLocalityDesc = this.getStorageCurrentLocality()
				if (cahceLocalityRes) {
					_(cahceLocalityRes)
					return
				}
			}
			const locationRes: TLocation = await this.getCurrentLocation(true)
			if (!locationRes) {
				_(null!)
				return
			}
			this._qqmapsdk.reverseGeocoder({
				location: `${locationRes.latitude},${locationRes.longitude}`,
				success: (res: { message: string; request_id: string; status: number; result: TLocalityDesc }): void => {
					if (!res || res.status !== 0) {
						_(null!)
						return
					}
					this.setStorageCurrentLocality(res.result)
					_(res.result)
				},
				fail(err): void {
					console.warn(err)
					_(null!)
				},
			})
		})
	}

	/**
	 * 获取当前定位: 地区描述信息
	 * 		解析坐标信息
	 */
	public async getCurrentLocalityByLocation(location: TLocation): Promise<TLocalityDesc> {
		return new Promise(async (_): Promise<void> => {
			this._qqmapsdk.reverseGeocoder({
				location: `${location.latitude},${location.longitude}`,
				success: (res: { message: string; request_id: string; status: number; result: TLocalityDesc }): void => {
					if (!res || res.status !== 0) {
						_(null!)
						return
					}
					this.setStorageCurrentLocality(res.result)
					_(res.result)
				},
				fail(err): void {
					console.warn(err)
					_(null!)
				},
			})
		})
	}
}
