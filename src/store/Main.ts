import { WatchStore } from '../utils/WatchStore'
import { HomeStore } from './HomeStore'
import { LocationMapStore } from './LocationMapStore'
import { TabbarStore } from './TabbarStore'
import { PersonalStore } from './PersonalStore'

export class MainStore extends WatchStore {
	public homeStore: HomeStore
	public tabbarStore: TabbarStore
	public personalStore: PersonalStore
	public locationMapStore: LocationMapStore
	constructor() {
		super()
		this.homeStore = new HomeStore(this)
		this.tabbarStore = new TabbarStore(this)
		this.personalStore = new PersonalStore(this)
		this.locationMapStore = new LocationMapStore(this)
	}
}
