import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { AppAside } from '@/components/AppAside'
import { useAuthStorage } from '@/hooks/useAuthStorage'

// export const AppLayout = () => {

// 	return (
// 		<div className="flex min-h-screen flex-col antialiased">
// 			<Outlet />
// 		</div>
// 	)
// }

export const description =
	'An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.'

export function AppLayout() {
	const navigate = useNavigate()
	const location = useLocation()
	const { getUser } = useAuthStorage()

	useEffect(() => {
		const user = getUser()

		if (!user && location.pathname !== '/auth') {
			navigate('/auth')
		}
	}, [location.pathname, getUser, navigate])

	return (
		<div className="grid h-screen w-full pl-[56px]">
			<AppAside />
			<div className="flex flex-col">
				<Outlet />
			</div>
		</div>
	)
}
