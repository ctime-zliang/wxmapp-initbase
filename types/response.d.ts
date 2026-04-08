/**
 * 接口response data类型
 */
declare namespace Res {
	interface Response<T = unknown> {
		code: number
		data: T
		msg: string
	}

	interface Record<T = unknown> {
		pageNum: number
		pageSize: number
		record: T
		totalRecord: number
		totalPage: number
		summary: unknown
	}
}
