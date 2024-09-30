import { Outlet, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AppLayout, AuthLayout } from './layouts/@index'
import { AdminLayout } from './layouts/AdminLayout'
import { UserProvider } from './layouts/UserProvider'
import { ListUsers } from './pages/admin/ListUsers'
import { NotFound } from './pages/app/404'
import { AthleteManagementPanel } from './pages/app/AthleteManagementPanel'
import { LogOut } from './pages/app/LogOut'
import { Run } from './pages/app/Run'
import { SoccerPredict } from './pages/app/SoccerPredict'
import { SoccerQuestions } from './pages/app/SoccerQuestions'
import { VolleyballPredict } from './pages/app/VolleyballPredict'
import { Auth } from './pages/auth/Auth'

const Roles = {
	ADMIN: 'admin',
	RUN: 'run',
	SOCCER: 'soccer',
	VOLLEYBALL: 'volleyball',
	VOLLEYBALL_ATHLETE: 'volleyballAthlete',
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<UserProvider>
				<Outlet />,
			</UserProvider>
		),
		children: [
			{
				element: <AppLayout />,
				children: [
					{
						path: '',
						element: (
							<ProtectedRoute requiredRoles={['abc']}>
								<div>rota sem nada :)</div>
							</ProtectedRoute>
						),
					},
					{
						path: 'run',
						element: (
							<ProtectedRoute requiredRoles={[Roles.RUN, Roles.ADMIN]}>
								<Run />
							</ProtectedRoute>
						),
					},
					{
						path: 'soccer',
						element: (
							<ProtectedRoute requiredRoles={[Roles.SOCCER, Roles.ADMIN]}>
								<SoccerPredict />
							</ProtectedRoute>
						),
					},
					{
						path: 'volleyball',
						element: (
							<ProtectedRoute requiredRoles={[Roles.VOLLEYBALL, Roles.ADMIN]}>
								<VolleyballPredict />
							</ProtectedRoute>
						),
					},
					{
						path: 'questions',
						element: (
							<ProtectedRoute
								requiredRoles={[Roles.VOLLEYBALL_ATHLETE, Roles.ADMIN]}
							>
								<SoccerQuestions />
							</ProtectedRoute>
						),
					},
					{
						path: 'volleyball/management',
						element: (
							<ProtectedRoute requiredRoles={[Roles.VOLLEYBALL, Roles.ADMIN]}>
								<AthleteManagementPanel />
							</ProtectedRoute>
						),
					},
					{
						path: 'logout',
						element: <LogOut />,
					},
				],
			},
			{
				path: 'admin',
				element: <AdminLayout />,
				children: [
					{
						path: '',
						element: (
							<ProtectedRoute requiredRoles={[Roles.ADMIN]}>
								<ListUsers />
							</ProtectedRoute>
						),
					},
				],
			},
			{
				path: 'auth',
				element: <AuthLayout />,
				children: [
					{
						path: '',
						element: <Auth />,
					},
				],
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
])
