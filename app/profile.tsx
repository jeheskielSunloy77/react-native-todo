import { StatusBar } from 'expo-status-bar'
import { Image, Platform, StyleSheet } from 'react-native'

import { Text, View } from '../components/Themed'
import { useAuthContext } from '../contexts/auth'

export default function ModalScreen() {
	const { user } = useAuthContext()
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: user?.avatar }}
				style={{ width: 200, height: 200, borderRadius: 100 }}
			/>
			<Text style={styles.title}>{user?.name}</Text>
			<Text
				style={{
					fontSize: 16,
					color: '#4b5563',
				}}
			>
				{user?.email}
			</Text>

			<Text
				style={{
					fontSize: 14,
					color: '#9ca3af',
				}}
			>
				Est. {user?.createAt ? new Date().toLocaleDateString('id') : ''}
			</Text>
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		gap: 10,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
})
