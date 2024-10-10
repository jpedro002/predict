import { useAuthStorage } from '@/hooks/useAuthStorage'
import { useAppSelector } from '@/store'
import { clearUser } from '@/store/slices/userSlice'
import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
	requiredRoles: string[]
	children: ReactNode
}

export function ProtectedRoute({
	requiredRoles,
	children,
}: ProtectedRouteProps) {
	const { getDefaultRoute, getJwt } = useAuthStorage()
	const user = useAppSelector((state) => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()
	const jwt = getJwt()

	useEffect(() => {
		if (!user.isLoadingUser) {
			if (!jwt) {
				navigate('/auth', { replace: true })
			} else if (user.roles.length > 0) {
				const defaultRoute = getDefaultRoute(user.roles)

				if (defaultRoute === '/logout') {
					dispatch(clearUser())
					navigate('/auth', { replace: true })
				}
			}
		}
	}, [
		user.isLoadingUser,
		getJwt,
		user.roles,
		getDefaultRoute,
		dispatch,
		navigate,
	])

	if (user.isLoadingUser) {
		return <div>Loading...</div>
	}

	const hasPermission = requiredRoles.some((role) => user.roles.includes(role))
	const defaultRoute = getDefaultRoute(user.roles)

	if (!hasPermission && !user.isLoadingUser) {
		return <Navigate to={defaultRoute} state={{ from: location }} replace />
	}

	return <>{children}</>
}
