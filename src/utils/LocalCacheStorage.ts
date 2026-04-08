import Taro from '@tarojs/taro'
import { safeJsonParse } from './utils'

export type TStorageData<T> = {
	value: T
	expire?: number
}

export class LocalCacheStorage {
	constructor() {}

	public set<T>(key: string, value: T, expire?: number): void {
		const data: TStorageData<T> = {
			value,
			expire: expire ? Date.now() + expire * 1000 : undefined,
		}
		Taro.setStorageSync(key, JSON.stringify(data))
	}

	public get<T>(key: string): T | null {
		const item: string | null | void = Taro.getStorageSync(key)
		if (!item) {
			return null
		}
		try {
			const data: TStorageData<T> = safeJsonParse(item)
			if (data.expire && data.expire < Date.now()) {
				this.remove(key)
				return null
			}
			return data.value
		} catch (error: any) {
			return null
		}
	}

	public remove(key: string): void {
		try {
			Taro.removeStorageSync(key)
		} catch (e) {}
	}

	public clear(): void {
		try {
			Taro.clearStorageSync()
		} catch (e) {}
	}

	public has(key: string): boolean {
		return this.get(key) !== null
	}
}
