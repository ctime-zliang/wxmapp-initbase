import { ERemoteDataLoadStatus } from '../config/enums'
import { TLocalityDesc, TLocation } from '../types/types'
import { MainStore } from './Main'
import { geographyService } from '../constant'
import { GeographyService, REFRESH_MOVE_DIST } from '../services/GeographyService'
import { ComponentStore } from './ComponentStore'

export class HomeStore extends ComponentStore {
	private _addressDesc: string
	private _loadLocationStatus: ERemoteDataLoadStatus
	constructor(parent: MainStore) {
		super(parent)
		this._addressDesc = ''
		this._loadLocationStatus = ERemoteDataLoadStatus.static
	}

	public get addressDesc(): string {
		return this._addressDesc
	}
	public set addressDesc(value: string) {
		this._addressDesc = value
		this.notify()
	}

	public get loadLocationStatus(): ERemoteDataLoadStatus {
		return this._loadLocationStatus
	}
	public set loadLocationStatus(value: ERemoteDataLoadStatus) {
		this._loadLocationStatus = value
		this.notify()
	}

	public async loadData(): Promise<void> {}

	public async refreshCurrentLocation(): Promise<void> {
		this.addressDesc = 'Positioning...'
		this.loadLocationStatus = ERemoteDataLoadStatus.loading
		const cacheLocation: TLocation = geographyService.getStorageCurrentLocation()
		geographyService.currentLocation = await geographyService.getCurrentLocation(false)!
		if (!geographyService.currentLocation) {
			geographyService.currentLocation = geographyService.createDefaultLocation()
			this.addressDesc = `Shenzhen`
			this.loadLocationStatus = ERemoteDataLoadStatus.loaded
			return
		}
		if (!cacheLocation) {
			geographyService.clearStorageCurrentLocation()
			geographyService.clearStorageCurrentLocality()
			geographyService.setStorageCurrentLocation(geographyService.currentLocation)
			const localityRes: TLocalityDesc = await geographyService.getCurrentLocalityByLocation(geographyService.currentLocation)
			if (!localityRes || !localityRes.address_component) {
				this.addressDesc = `Pos failed`
				this.loadLocationStatus = ERemoteDataLoadStatus.loadfail
				return
			}
			this.addressDesc = `${localityRes.address_component.city}-${localityRes.address_component.district}`
			this.loadLocationStatus = ERemoteDataLoadStatus.loaded
			return
		}
		const moveDist: number = GeographyService.getDistance(cacheLocation, geographyService.currentLocation)
		if (moveDist <= REFRESH_MOVE_DIST) {
			const cacheLocality: TLocalityDesc = geographyService.getStorageCurrentLocality()
			if (!cacheLocality) {
				const localityRes: TLocalityDesc = await geographyService.getCurrentLocalityByLocation(geographyService.currentLocation)
				if (!localityRes || !localityRes.address_component) {
					this.addressDesc = `Pos failed`
					this.loadLocationStatus = ERemoteDataLoadStatus.loadfail
					return
				}
				this.addressDesc = `${localityRes.address_component.city}-${localityRes.address_component.district}`
				this.loadLocationStatus = ERemoteDataLoadStatus.loaded
				return
			}
			this.addressDesc = `${cacheLocality.address_component.city}-${cacheLocality.address_component.district}`
			this.loadLocationStatus = ERemoteDataLoadStatus.loaded
			return
		}
		geographyService.clearStorageCurrentLocation()
		geographyService.clearStorageCurrentLocality()
		this.refreshCurrentLocation()
	}
}
