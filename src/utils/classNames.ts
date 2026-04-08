export function classNames(...args: Array<any>): string {
	const classnames: Array<string> = args.filter((name: string): boolean => {
		return Boolean(name)
	})
	return classnames
		.map((name: string): string => {
			if (Object.prototype.toString.call(name) === '[object Object]') {
				const temps: Array<string> = []
				Object.keys(name).forEach((v: string): void => {
					if (name[v]) {
						temps.push(v)
					}
				})
				name = temps.join(' ')
			}
			return name
		})
		.join(' ')
}
