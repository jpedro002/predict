import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAuthStorage } from '@/hooks/useAuthStorage'

export const AuthLayout = () => {
	const navigate = useNavigate()
	const { getJwt } = useAuthStorage()

	useEffect(() => {
		const jwt = getJwt()

		if (jwt) {
			navigate('/')
		}
	}, [navigate, getJwt])

	return (
		<div className="grid min-h-screen grid-cols-1 place-items-center antialiased">
			<Outlet />
		</div>
	)
}
