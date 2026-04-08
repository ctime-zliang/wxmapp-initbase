import Taro from '@tarojs/taro'
import { TCommonObjectResponse } from '../types/types'
import { REQUEST_BASE_URL } from '../config/config'
import { mainStore } from '../constant'
import { TLoginedInfoData } from '../services/AccountServices'
import { getHashIden } from './uuid'

export const REQUEST_FAILER_MSGS: Array<string> = [`REQUEST_ABORT`, `REQUEST_FAILER`]
export const REQUEST_FAILER_CODES: Array<number> = [-900001, -900009]

export type TRequestOptional = {
	headers?: Partial<any>
	urlParams?: Partial<any>
	updateData?: Partial<any>
	beforeSend?: (requestId: string) => void | boolean
	onUploadStart?: (uploadTask: Taro.UploadTask.UploadTaskPromise) => void
	onUploadProgress?: (res: Taro.UploadTask.OnProgressUpdateCallbackResult) => void
}

function parseUrl(url: string, data: Partial<any> = {}): string {
	const params: string = Object.keys(data)
		.filter((key: string): boolean => {
			return data[key] !== undefined && data[key] !== null
		})
		.map((key: string): string => {
			const value: any = data[key]
			if (Array.isArray(value)) {
				return value
					.map((v: string): string => {
						return `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
					})
					.join('&')
			}
			if (typeof value === 'object') {
				return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`
			}
			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
		})
		.join('&')
	if (!params) {
		return url
	}
	return url + (url.includes('?') ? '&' : '?') + params
}

export async function getRequest<T>(url: string, data: Partial<any> = {}, optional: TRequestOptional = {}): Promise<TCommonObjectResponse<T>> {
	const { headers = {}, beforeSend } = optional
	const requestId: string = getHashIden()
	return new Promise((_): void => {
		const sf: boolean = beforeSend instanceof Function ? beforeSend(requestId)! : true
		if (sf === false) {
			_({ code: REQUEST_FAILER_CODES[0], data: null!, msg: REQUEST_FAILER_MSGS[0], __requestId: requestId })
			return
		}
		const loginedInfo: TLoginedInfoData = mainStore.personalStore.loginedInfo ? mainStore.personalStore.loginedInfo : ({} as TLoginedInfoData)
		Taro.request({
			url: REQUEST_BASE_URL + parseUrl(url, data),
			method: 'GET',
			header: {
				sessionId: loginedInfo.sessionId,
				...headers,
			},
			success(remoteResult: Taro.request.SuccessCallbackResult<TCommonObjectResponse<T>>): void {
				if (remoteResult && remoteResult.data && typeof remoteResult.data.code === 'number' && !Number.isNaN(remoteResult.data.code)) {
					_({ ...remoteResult.data, __requestId: requestId })
					return
				}
				_({ code: REQUEST_FAILER_CODES[1], data: null!, msg: REQUEST_FAILER_MSGS[1], __requestId: requestId })
			},
			fail(remoteError: TaroGeneral.CallbackResult): void {
				_({ code: REQUEST_FAILER_CODES[1], data: null!, msg: REQUEST_FAILER_MSGS[1], __requestId: requestId })
			},
		})
	})
}

export async function postRequest<T>(url: string, data: Partial<any>, optional: TRequestOptional = {}): Promise<TCommonObjectResponse<T>> {
	const { urlParams = {}, headers = {}, beforeSend } = optional
	const requestId: string = getHashIden()
	return new Promise((_): void => {
		const loginedInfo: TLoginedInfoData = mainStore.personalStore.loginedInfo ? mainStore.personalStore.loginedInfo : ({} as TLoginedInfoData)
		const sf: boolean = beforeSend instanceof Function ? beforeSend(requestId)! : true
		if (sf === false) {
			_({ code: REQUEST_FAILER_CODES[0], data: null!, msg: REQUEST_FAILER_MSGS[0], __requestId: requestId })
			return
		}
		Taro.request({
			url: REQUEST_BASE_URL + parseUrl(url, urlParams),
			method: 'POST',
			data,
			header: {
				sessionId: loginedInfo.sessionId,
				...headers,
			},
			success(remoteResult: Taro.request.SuccessCallbackResult<TCommonObjectResponse<T>>): void {
				if (remoteResult && remoteResult.data && typeof remoteResult.data.code === 'number' && !Number.isNaN(remoteResult.data.code)) {
					_({ ...remoteResult.data, __requestId: requestId })
					return
				}
				_({ code: REQUEST_FAILER_CODES[1], data: null!, msg: REQUEST_FAILER_MSGS[1], __requestId: requestId })
			},
			fail(remoteError: TaroGeneral.CallbackResult): void {
				_({ code: REQUEST_FAILER_CODES[1], data: null!, msg: REQUEST_FAILER_MSGS[1], __requestId: requestId })
			},
		})
	})
}

export async function uploadFileRequest<T>(
	uploadUrl: string,
	filePath: string,
	nameInServer: string,
	optional: TRequestOptional = {}
): Promise<TCommonObjectResponse<T>> {
	const { updateData = {}, urlParams = {}, headers = {}, beforeSend, onUploadStart, onUploadProgress } = optional
	const requestId: string = getHashIden()
	return new Promise((_): void => {
		const loginedInfo: TLoginedInfoData = mainStore.personalStore.loginedInfo ? mainStore.personalStore.loginedInfo : ({} as TLoginedInfoData)
		const sf: boolean = beforeSend instanceof Function ? beforeSend(requestId)! : true
		if (sf === false) {
			_({ code: REQUEST_FAILER_CODES[0], data: null!, msg: REQUEST_FAILER_MSGS[0], __requestId: requestId })
			return
		}
		const uploadTask: Taro.UploadTask.UploadTaskPromise = Taro.uploadFile({
			url: REQUEST_BASE_URL + parseUrl(uploadUrl, urlParams),
			filePath,
			name: nameInServer,
			formData: updateData,
			header: {
				sessionId: loginedInfo.sessionId,
				...headers,
			},
			success(remoteResult: Taro.request.SuccessCallbackResult): void {
				if (remoteResult && remoteResult.data && typeof remoteResult.data.code === 'number' && !Number.isNaN(remoteResult.data.code)) {
					_({ ...remoteResult.data, __requestId: requestId })
					return
				}
				_({ code: REQUEST_FAILER_CODES[1], data: null!, msg: REQUEST_FAILER_MSGS[1], __requestId: requestId })
			},
			fail(remoteError: TaroGeneral.CallbackResult): void {
				_({ code: REQUEST_FAILER_CODES[1], data: null!, msg: REQUEST_FAILER_MSGS[1], __requestId: requestId })
			},
		})
		onUploadStart && onUploadStart(uploadTask)
		uploadTask.progress((res: Taro.UploadTask.OnProgressUpdateCallbackResult): void => {
			onUploadProgress && onUploadProgress(res)
		})
	})
}
