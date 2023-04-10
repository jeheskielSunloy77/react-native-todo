import { useRouter, useSegments } from 'expo-router'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import { User } from '../utils/types'

const AuthContext = createContext({} as AuthContext)

interface AuthContext {
	signIn: (loginDetails: LoginDetails) => { error: string | null }
	signUp: (userDetails: User) => { error: string | null }
	signOut: () => void
	user: User | null
}

interface LoginDetails extends Pick<User, 'email' | 'password'> {}

export const useAuthContext = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
	const segments = useSegments()
	const router = useRouter()

	const [usersList, setUsersList] = useStorage<User[]>('@users', [])
	const [user, setAuth] = useStorage<User | null>('@user', null)

	useEffect(() => {
		const inAuthGroup = segments[0] === '(auth)'

		if (user && inAuthGroup) return router.push('/')
		if (!user && !inAuthGroup) router.push('/sign-in')
	}, [user, segments])
	const signIn = (loginDetails: LoginDetails) => {
		const user = usersList.find(
			(user) =>
				user.email === loginDetails.email && user.password === loginDetails.password
		)
		if (user) setAuth(user)
		return { error: user ? null : 'User not found!' }
	}
	const signUp = (userDetails: User) => {
		try {
			setUsersList((prev) => [...prev, userDetails])
			return { error: null }
		} catch (error) {
			return { error: 'Failed to register user!' }
		}
	}

	return (
		<AuthContext.Provider
			value={{
				signUp,
				signIn,
				signOut: () => setAuth(null),
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
