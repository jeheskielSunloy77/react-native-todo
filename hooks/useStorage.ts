import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'

type ValueOrFunction<T> = T | ((currentValue: T) => T)
export type SetValue<T> = (v: ValueOrFunction<T>) => Promise<void>

const useStorage = <T>(key: string, defaultValue: T) => {
	const [value, setValue] = useState<T>(defaultValue)

	useEffect(() => {
		const getData = async () => {
			try {
				const storageValue = await AsyncStorage.getItem(key)
				if (storageValue !== null) {
					setValue(JSON.parse(storageValue))
				} else if (defaultValue !== undefined) {
					setValue(defaultValue)
				}
			} catch (error) {
				console.error(`Error retrieving data from AsyncStorage: ${error}`)
			}
		}

		getData()
	}, [])

	const setAsyncStorageValue: SetValue<T> = useCallback(
		async (newValueOrFunction: ValueOrFunction<T>) => {
			try {
				let newValue: T
				if (typeof newValueOrFunction === 'function') {
					newValue = (newValueOrFunction as (v: T) => T)(value)
				} else newValue = newValueOrFunction

				await AsyncStorage.setItem(key, JSON.stringify(newValue))
				setValue(newValue)
			} catch (error) {
				console.error(`Error setting data to AsyncStorage: ${error}`)
			}
		},
		[key, value]
	)

	const clearAsyncStorageValue = useCallback(async () => {
		try {
			await AsyncStorage.removeItem(key)
			setValue(defaultValue)
		} catch (error) {
			console.error(`Error clearing data from AsyncStorage: ${error}`)
		}
	}, [key, defaultValue])

	return [value, setAsyncStorageValue, clearAsyncStorageValue] as const
}

export default useStorage
