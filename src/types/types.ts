export type TBoundingClientRectResultToJSONResult = {
	left: number
	top: number
	right: number
	bottom: number
	width: number
	height: number
	x: number
	y: number
}

export type TCommonObjectResponse<T> = {
	code: number
	msg: string
	data: T
	__requestId: string
}
export type TCommonObjectPageListData<T> = {
	page: number
	size: number
	total: number
	list: Array<T>
}

export type TLocation = { longitude: number; latitude: number }

export type TLocalityDesc = {
	ad_info: {
		adcode: string
		city: string
		city_code: string
		district: string
		location: { lat: number; lng: number }
		name: string
		nation: string
		nation_code: string
		phone_area_code: string
		province: string
		_distance: number
	}
	address_component: {
		nation: string
		province: string
		city: string
		district: string
		street: string
		street_number: string
	}
	address: string
	formatted_addresses: {
		recommend: string
		rough: string
	}
	location: {
		lat: number
		lng: number
	}
	address_reference: {
		business_area: {
			id: string
			location: { lat: number; lng: number }
			title: string
			_dir_desc: string
			_distance: number
		}
		crossroad: {
			id: string
			location: { lat: number; lng: number }
			title: string
			_dir_desc: string
			_distance: number
		}
		famous_area: {
			id: string
			location: { lat: number; lng: number }
			title: string
			_dir_desc: string
			_distance: number
		}
		landmark_l2: {
			id: string
			location: { lat: number; lng: number }
			title: string
			_dir_desc: string
			_distance: number
		}
		street: {
			id: string
			location: { lat: number; lng: number }
			title: string
			_dir_desc: string
			_distance: number
		}
		street_number: {
			id: string
			location: { lat: number; lng: number }
			title: string
			_dir_desc: string
			_distance: number
		}
		town: {
			id: string
			location: { lat: number; lng: number }
			title: string
			_dir_desc: string
			_distance: number
		}
	}
}

export type TMapMarker = {
	id: number
	latitude: number
	longitude: number
	name: string
	desc: string
	iconPath: string
	width?: number
	height?: number
	callout?: {
		content: string
		color: string
		fontSize: number
		anchorX: number
		anchorY: number
		borderRadius: number
		borderWidth: number
		borderColor: string
		bgColor: string
		padding: number
		textAlign: 'left' | 'right' | 'center'
		display: 'BYCLICK' | 'ALWAYS'
	}
	customCallout?: {
		display: 'BYCLICK' | 'ALWAYS'
		anchorX: number
		anchorY: number
	}
	label?: {
		content: string
		color: string
		fontSize: number
		anchorX: number
		anchorY: number
		borderWidth: number
		borderColor: string
		borderRadius: number
		bgColor: string
		padding: number
		textAlign: 'left' | 'right' | 'center'
	}
}
