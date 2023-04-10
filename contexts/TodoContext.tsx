import { createContext, ReactNode, useContext } from 'react'
import useStorage, { SetValue } from '../hooks/useStorage'
import { Todo } from '../utils/types'

const TodoContext = createContext({} as TodoContext)

export const TodoProvider = ({ children }: { children: ReactNode }) => {
	const [todos, setTodos, clearTodos] = useStorage<Todo[]>('@todos', [])
	return (
		<TodoContext.Provider value={{ todos: todos || [], setTodos, clearTodos }}>
			{children}
		</TodoContext.Provider>
	)
}
export const useTodoContext = () => useContext(TodoContext)

interface TodoContext {
	todos: Todo[]
	setTodos: SetValue<Todo[]>
	clearTodos: () => Promise<void>
}
