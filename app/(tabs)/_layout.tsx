import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Image, Pressable, useColorScheme } from 'react-native'
import Colors from '../../constants/Colors'
import { useAuthContext } from '../../contexts/auth'
import { TodoProvider } from '../../contexts/TodoContext'
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name']
	color: string
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
	const colorScheme = useColorScheme()
	const { user } = useAuthContext()

	return (
		<TodoProvider>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				}}
			>
				<Tabs.Screen
					name='index'
					options={{
						title: 'Create',
						tabBarIcon: ({ color }) => <TabBarIcon name='pencil' color={color} />,
						headerRight: () => (
							<Link href='/profile' asChild>
								<Pressable>
									<Image
										style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
										source={{
											uri:
												user?.avatar ||
												'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
										}}
									/>
								</Pressable>
							</Link>
						),
					}}
				/>
				<Tabs.Screen
					name='viewTodo'
					options={{
						title: 'View',
						tabBarIcon: ({ color }) => <TabBarIcon name='eye' color={color} />,
					}}
				/>
			</Tabs>
		</TodoProvider>
	)
}
