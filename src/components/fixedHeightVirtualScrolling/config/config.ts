import { TFixedHeightListScrollingProfile } from '../types/types'

export const defaultProfileFixed: TFixedHeightListScrollingProfile = {
	containerHeight: 0,
	countTotal: 0,
	isShowBottom: false,
	bottomHeight: 0,
	bottomContent: null!,
	estimatedRowHeight: 25,
	topBufferSize: 25,
	bottomBufferSize: 25,
	initContainerScrollTop: 0,
	onScroll: null!,
	onScrollToLower: null!,
	children: null!,
}
