import { Dispatch, useLayoutEffect, useState } from 'react'

export type TTriggerItemCallback = () => boolean

export type TTriggerItem = {
	setState: Dispatch<number>
	callback?: TTriggerItemCallback
}

export abstract class WatchStore {
	private _ticket: number
	private _triggerIndex: number
	private _triggerMap: Map<number, TTriggerItem>
	private _isTriggering: boolean
	constructor() {
		this._ticket = 0
		this._triggerIndex = 0
		this._triggerMap = new Map()
		this._isTriggering = false
	}

	protected notify(f: boolean | undefined = undefined): void {
		if (this._isTriggering) {
			return
		}
		this._isTriggering = true
		Promise.resolve().then((): void => {
			++this._ticket
			for (let [key, value] of this._triggerMap) {
				if (f === true) {
					value.setState(this._ticket)
					continue
				}
				if (value.callback instanceof Function) {
					if (value.callback()) {
						value.setState(this._ticket)
					}
					continue
				}
				value.setState(this._ticket)
			}
			this._isTriggering = false
		})
	}

	public createEffect(setState: Dispatch<number>, callback?: TTriggerItemCallback): () => () => void {
		const idx: number = ++this._triggerIndex
		return (): (() => void) => {
			this._triggerMap.set(idx, { setState, callback })
			return (): void => {
				this._triggerMap.delete(idx)
			}
		}
	}
}

export function useWatch<T extends WatchStore>(store: T, callback?: TTriggerItemCallback): void {
	const [, setState] = useState<number>(0)
	useLayoutEffect(store.createEffect(setState, callback))
}
