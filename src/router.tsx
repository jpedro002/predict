import { Outlet, createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from './components/ProtectedRoute'
import { AppLayout, AuthLayout } from './layouts/@index'
import { AdminLayout } from './layouts/AdminLayout'
import { ListUsers } from './pages/admin/ListUsers'
import { NotFound } from './pages/app/404'
import { AthleteManagementPanel } from './pages/app/AthleteManagementPanel'
import { LogOut } from './pages/app/LogOut'
import { Run } from './pages/app/Run'
import { SoccerPredict } from './pages/app/SoccerPredict'
import { SoccerQuestions } from './pages/app/SoccerQuestions'
import { VolleyballPredict } from './pages/app/VolleyballPredict'
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
								<SoccerPredict />
							</ProtectedRoute>
						),
					},
					{
						path: '/volleyball',
						element: (
							<ProtectedRoute requiredRoles={['volleyball', 'admin']}>
								<VolleyballPredict />
							</ProtectedRoute>
						),
					},
					{
						path: '/questions',
						element: (
							<ProtectedRoute requiredRoles={['volleyballAthlete', 'admin']}>
								<SoccerQuestions />
							</ProtectedRoute>
						),
					},
					{
						path: '/volleyball/management',
						element: (
							<ProtectedRoute requiredRoles={['volleyball', 'admin']}>
								<AthleteManagementPanel />
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
						<AdminLayout />
					</ProtectedRoute>
				),
				children: [
					{
						path: '/admin',
						element: <ListUsers />,
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
