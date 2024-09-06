import { createBrowserRouter } from 'react-router-dom'

import { AppLayout, AuthLayout } from './layouts/@index'
import { NotFound } from './pages/app/404'
import { Home } from './pages/app/Home'
import { LogOut } from './pages/app/LogOut'
import { Auth } from './pages/auth/Auth'
import { Register } from './pages/auth/Register'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/logout',
				element: <LogOut />,
			},
		],
	},
	{
		path: '/',
		element: <AuthLayout />,
		children: [
			{
				path: '/auth',
				element: <Auth />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
	{
		path: '/*',
		element: <NotFound />,
	},
])
