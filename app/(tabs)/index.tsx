import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Platform, Pressable, ScrollView, TextInput } from 'react-native'
import { Text, View } from '../../components/Themed'
import { useTodoContext } from '../../contexts/TodoContext'
import { SetValue } from '../../hooks/useStorage'
import { generateId } from '../../utils/helpers'
import { Todo } from '../../utils/types'

export default function TabOneScreen() {
	const { todos, setTodos } = useTodoContext()
	const [input, setInput] = useState('')
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				paddingHorizontal: 20,
				paddingVertical: 10,
			}}
		>
			<TextInput
				style={{
					shadowColor: '#111827',
					shadowOffset: {
						width: 1,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
					marginTop: 10,
					borderWidth: 0.5,
					borderRadius: 5,
					width: '100%',
					padding: 10,
					borderColor: '#9ca3af',
				}}
				onChangeText={(v) => setInput(v)}
				onSubmitEditing={() => {
					setTodos((prev) => [
						{ todo: input, id: generateId(), createdAt: new Date() },
						...prev,
					])
					setInput('')
				}}
				placeholder='Add new todo!'
				placeholderTextColor='#9ca3af'
				value={input}
			/>
			<View
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
				style={{
					marginVertical: 10,
					height: 1,
					width: '100%',
				}}
			/>
			<ScrollView style={{ width: '100%' }}>
				{todos.map(({ todo, isDone, id, createdAt }) => (
					<TodoCard
						key={id}
						setTodos={setTodos}
						todo={todo}
						id={id}
						isDone={isDone}
						createdAt={createdAt}
					/>
				))}
			</ScrollView>
		</View>
	)
}

const TodoCard = ({
	todo,
	isDone,
	setTodos,
	id,
}: Todo & {
	setTodos: SetValue<Todo[]>
}) => {
	const router = useRouter()
	const toggleIsDone = () => {
		setTodos((prev) =>
			prev.map((v) => {
				if (v.todo === todo) {
					return {
						...v,
						isDone: !isDone,
					}
				}
				return v
			})
		)
	}
	const deleteTodo = () => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id))
		router.push('/')
		Platform.OS === 'web'
			? alert('Todo has been deleted!')
			: Alert.alert('Todo has been deleted!')
	}

	return (
		<Pressable
			onPress={() => router.push('/viewTodo?id=' + id)}
			style={{
				shadowColor: '#111827',
				shadowOffset: {
					height: 2,
					width: 1,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				backgroundColor: '#f3f4f6',
				borderRadius: 5,
				padding: 10,
				display: 'flex',
				flexDirection: 'row',
				gap: 10,
				marginTop: 10,
			}}
		>
			<Text style={{ fontSize: 20 }}>
				{todo.length > 25 ? todo.slice(0, 25) + '...' : todo}
			</Text>
			<View
				style={{
					position: 'absolute',
					right: 10,
					top: 10,
					display: 'flex',
					flexDirection: 'row',
					gap: 10,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'transparent',
				}}
			>
				<FontAwesome
					name='trash'
					color='#ef4444'
					size={20}
					onPress={deleteTodo}
					style={{
						backgroundColor: '#fee2e2',
						borderRadius: 2,
						paddingVertical: 2,
						paddingHorizontal: 4,
					}}
				/>
				<FontAwesome
					name='check'
					style={{
						borderWidth: 0.5,
						borderColor: '#9ca3af',
						backgroundColor: '#e5e7eb',
						borderRadius: 2,
						padding: 2,
					}}
					color={isDone ? '#2f95dc' : '#d1d5db'}
					size={20}
					onPress={toggleIsDone}
				/>
			</View>
		</Pressable>
	)
}
