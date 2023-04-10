export interface Todo {
	id: string
	todo: string
	isDone?: boolean
	createdAt: Date
}

export interface User {
	id: string
	name: string
	email: string
	avatar: string
	createAt: Date
	password: string
}
