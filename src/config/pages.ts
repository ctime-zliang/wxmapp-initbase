import { ECustomTabbarKey } from './enums'

export const TABBAR_PAGES = {
	HOME: {
		key: ECustomTabbarKey.Home,
		pagePath: 'pages/home/index',
		text: 'Home',
		iconPath: '/assets/images/tabbar/home.png',
		selectedIconPath: '/assets/images/tabbar/home_actived.png',
	},
	PERSONAL: {
		key: ECustomTabbarKey.Personal,
		pagePath: 'pages/personal/index',
		text: 'Personal',
		iconPath: '/assets/images/tabbar/personal.png',
		selectedIconPath: '/assets/images/tabbar/personal_actived.png',
	},
}

export const PAGES = {
	...TABBAR_PAGES,
	LOCATION_MAP: {
		key: 'locationMap',
		pagePath: 'pages/locationMap/index',
		text: 'LocationMap',
	},
}
