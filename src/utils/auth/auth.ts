import Taro from '@tarojs/taro'

export async function getCode(): Promise<string> {
	return new Promise<string>((resolve, reject): void => {
		Taro.login({
			success: (res: Taro.login.SuccessCallbackResult): void => {
				resolve(res.code)
			},
			fail: (res: TaroGeneral.CallbackResult): void => {
				reject(res)
			},
		})
	})
}
