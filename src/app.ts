import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import '@/assets/style/app.scss'

function App({ children }: PropsWithChildren<React.ReactNode>): React.ReactNode {
	useLaunch((): void => {
		console.log('App Launched.')
	})
	return children
}

export default App
