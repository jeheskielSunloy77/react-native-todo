import { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { useAuthContext } from '../../contexts/auth'
import { generateId } from '../../utils/helpers'
import { User } from '../../utils/types'

export default function SignIn() {
	const [isSignup, setIsSignup] = useState(false)
	const [loginDetails, setLoginDetails] = useState<User>({} as User)
	const { signIn, signUp } = useAuthContext()
	const handleAuth = () => {
		if (isSignup) {
			if (
				!loginDetails.name ||
				!loginDetails.email ||
				!loginDetails.password ||
				!loginDetails.avatar
			)
				return alert('Please fill all the fields')
			const { error } = signUp({
				...loginDetails,
				id: generateId(),
				createAt: new Date(),
			})
			if (error) return alert(error)
			alert('User created successfully!')
			setIsSignup(false)
		} else {
			if (!loginDetails.email || !loginDetails.password)
				return alert('Please fill all the fields')
			const { error } = signIn(loginDetails)
			if (error) return alert(error)
			alert('User logged in successfully!')
		}
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<View
				style={{
					shadowColor: '#111827',
					shadowOffset: {
						width: 3,
						height: 6,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
					backgroundColor: 'white',
					borderRadius: 10,
					paddingHorizontal: 20,
					paddingVertical: 30,
					width: '90%',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: 10,
				}}
			>
				<TextInput
					style={styles.textInput}
					placeholder='Email'
					textContentType='emailAddress'
					value={loginDetails.email}
					onChangeText={(email) => setLoginDetails({ ...loginDetails, email })}
				/>
				<TextInput
					style={styles.textInput}
					placeholder='Password'
					secureTextEntry
					textContentType='password'
					value={loginDetails.password}
					onChangeText={(password) => setLoginDetails({ ...loginDetails, password })}
				/>
				{isSignup && (
					<>
						<TextInput
							style={styles.textInput}
							placeholder='Name'
							textContentType='name'
							value={loginDetails.name}
							onChangeText={(name) => setLoginDetails({ ...loginDetails, name })}
						/>
						<TextInput
							style={styles.textInput}
							placeholder='Avatar URL'
							textContentType='URL'
							value={loginDetails.avatar}
							onChangeText={(avatar) => setLoginDetails({ ...loginDetails, avatar })}
						/>
					</>
				)}
				<Button title={isSignup ? 'Sign Up' : 'Sign In'} onPress={handleAuth} />
				<Text style={{ textAlign: 'center' }}>
					{isSignup ? 'Already have an account? ' : "Don't have an account? "}
					<Text
						style={{ color: 'blue' }}
						onPress={() => setIsSignup((prev) => !prev)}
					>
						{isSignup ? 'Sign In' : 'Sign Up'}
					</Text>
				</Text>
			</View>
		</View>
	)
}

const styles = {
	textInput: {
		shadowColor: '#111827',
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		borderWidth: 0.5,
		borderRadius: 5,
		width: '100%',
		padding: 10,
		borderColor: '#9ca3af',
	},
}
