import Taro from '@tarojs/taro'

export async function getSetting(): Promise<Taro.getSetting.SuccessCallbackResult> {
	return new Promise<Taro.getSetting.SuccessCallbackResult>((resolve, reject): void => {
		Taro.getSetting({
			success: (res: Taro.getSetting.SuccessCallbackResult): void => {
				resolve(res)
			},
			fail: (err: TaroGeneral.CallbackResult): void => {
				reject(err)
			},
		})
	})
}
