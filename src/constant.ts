import { MainStore } from './store/Main'
import { GeographyService } from './services/GeographyService'
import { LocalCacheStorage } from './utils/LocalCacheStorage'
import { AccountServices } from './services/AccountServices'

export const localCacheStorage: LocalCacheStorage = new LocalCacheStorage()

export const accountServices: AccountServices = new AccountServices()
export const geographyService: GeographyService = new GeographyService()

export const mainStore: MainStore = new MainStore()
