import { FontAwesome } from '@expo/vector-icons'
import { useRouter, useSearchParams } from 'expo-router'
import { useState } from 'react'
import { Alert, Button, Platform, StyleSheet, TextInput } from 'react-native'
import { Text, View } from '../../components/Themed'
import { useTodoContext } from '../../contexts/TodoContext'
import { generateId } from '../../utils/helpers'

const alertUser = (msg: string) =>
	Platform.OS === 'web' ? alert(msg) : Alert.alert(msg)

export default function TabTwoScreen() {
	const { id } = useSearchParams()
	const router = useRouter()
	const { todos, setTodos } = useTodoContext()
	const todo = todos.find((todo) => todo.id === id)
	const [input, setInput] = useState(todo?.todo)

	const isUpdate = !!todo

	const deleteTodo = () => {
		setTodos(todos.filter((todo) => todo.id !== id))
		router.push('/')
		alertUser('Todo has been deleted!')
	}
	const upsertTodo = () => {
		if (isUpdate)
			setTodos((prev) =>
				prev.map((v) => {
					if (v.id === id) {
						return {
							...v,
							todo: input as string,
						}
					}
					return v
				})
			)
		else
			setTodos((prev) => [
				...prev,
				{
					createdAt: new Date(),
					id: generateId(),
					todo: input as string,
				},
			])
		alertUser('Todo has been updated!')
	}

	return (
		<>
			<View
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'row',
					paddingVertical: 10,
					paddingHorizontal: 20,
					alignItems: 'center',
				}}
			>
				<Text style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
					<FontAwesome name='calendar' size={15} color='#2f95dc' />
					{todo
						? new Date(todo.createdAt).toLocaleDateString('id')
						: new Date().toLocaleDateString('id')}
				</Text>
				<View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
					{input && todo?.todo !== input && (
						<Button title={isUpdate ? 'Update' : 'Create'} onPress={upsertTodo} />
					)}
					{todo && <Button title='Delete' onPress={deleteTodo} color='#ef4444' />}
				</View>
			</View>
			<View style={{ minHeight: '100%', padding: 20 }}>
				<TextInput
					multiline
					numberOfLines={28}
					style={styles.title}
					onChangeText={(v) => setInput(v)}
					value={input}
					defaultValue={todo?.todo}
					placeholder='What do you want to do?'
					placeholderTextColor='#d1d5db'
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		padding: 10,
		borderRadius: 10,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
})
