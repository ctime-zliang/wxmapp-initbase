import { PAGES } from './config/pages'

export default defineAppConfig({
	/**
	 * 配置主包
	 */
	pages: [PAGES.HOME.pagePath, PAGES.PERSONAL.pagePath, PAGES.LOCATION_MAP.pagePath],
	/**
	 * 配置分包
	 */
	subPackages: [],
	/**
	 * 分包预加载
	 */
	preloadRule: {},
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat Mini App',
		navigationBarTextStyle: 'black',
		backgroundColor: '#F6F9FD',
	},
	tabBar: {
		custom: true,
		color: '#000000',
		selectedColor: '#4989ff',
		backgroundColor: '#ffffff',
		borderStyle: 'white',
		position: 'bottom',
		list: [
			{
				pagePath: 'pages/home/index',
				iconPath: 'assets/images/tabbar/home.png',
				selectedIconPath: 'assets/images/tabbar/home_actived.png',
				text: 'Home',
			},
			{
				pagePath: 'pages/personal/index',
				iconPath: 'assets/images/tabbar/personal.png',
				selectedIconPath: 'assets/images/tabbar/personal_actived.png',
				text: 'Personal',
			},
		],
	},
	usingComponents: {},
	requiredBackgroundModes: [],
	lazyCodeLoading: 'requiredComponents',
	plugins: {},
	permission: {
		'scope.userLocation': {
			desc: `Your location information will be used for displaying the effects of the mini program's location interface`,
		},
	},
	requiredPrivateInfos: ['getLocation'],
})
