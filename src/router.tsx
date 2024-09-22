import { Outlet, createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from './components/ProtectedRoute'
import { AppLayout, AuthLayout } from './layouts/@index'
import { NotFound } from './pages/app/404'
import { LogOut } from './pages/app/LogOut'
import { Run } from './pages/app/Run'
import { SoccerQuestions } from './pages/app/SoccerQuestions'
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
						element: (
							<ProtectedRoute requiredRoles={['abc']}>
								<div>rota sem nada :)</div>
							</ProtectedRoute>
						),
					},
					{
						path: '/run',
						element: (
							<ProtectedRoute requiredRoles={['run', 'admin']}>
								<Run />
							</ProtectedRoute>
						),
					},
					{
						path: '/soccer',
						element: (
							<ProtectedRoute requiredRoles={['soccer', 'admin']}>
								<div>soccer</div>
							</ProtectedRoute>
						),
					},
					{
						path: '/volleyball',
						element: (
							<ProtectedRoute requiredRoles={['volleyball', 'admin']}>
								<div>volleyball</div>
							</ProtectedRoute>
						),
					},
					{
						path: '/soccer-questions',
						element: (
							<ProtectedRoute requiredRoles={['soccerQuestions', 'admin']}>
								<SoccerQuestions />
							</ProtectedRoute>
						),
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
				element: (
					<ProtectedRoute requiredRoles={['admin']}>
						<AppLayout />
					</ProtectedRoute>
				),
				children: [
					{
						path: '/admin',
						element: <div>Admin</div>,
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
