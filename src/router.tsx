import { Outlet, createBrowserRouter } from 'react-router-dom'

import { AppLayout, AuthLayout } from './layouts/@index'
import { NotFound } from './pages/app/404'
import { LogOut } from './pages/app/LogOut'
import { Run } from './pages/app/Run'
import { Auth } from './pages/auth/Auth'
import { Register } from './pages/auth/Register'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Outlet />,
		children: [
			{
				path: '/',
				element: <AppLayout />,
				children: [
					{
						path: '/',
						element: <div>Navigate to avaliable route in your role</div>,
					},
					{
						path: '/run',
						element: <Run />,
					},
					{
						path: '/soccer',
						element: <div>soccer</div>,
					},
					{
						path: '/volleyball',
						element: <div>volleyball</div>,
					},
					{
						path: '/logout',
						element: <LogOut />,
					},
				],
			},
		],
	},
	{
		path: '/',
		element: <Outlet />,
		children: [
			{
				path: '/admin',
				element: <AppLayout />,
				children: [
					{
						path: '/admin',
						element: <div>admin</div>,
					},
				],
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
