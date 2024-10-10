import { useAuthStorage } from '@/hooks/useAuthStorage'
import { useAppSelector } from '@/store'
import { ReactNode, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { SpinnerLoading } from './SpinnerLoading'

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
	const location = useLocation()
	const jwt = getJwt()

	useEffect(() => {
		if (!jwt) {
			navigate('/auth', { replace: true })
		}
	}, [jwt])

	if (user.isLoadingUser) {
		return (
			<div className="w-full h-full grid place-items-center">
				<SpinnerLoading className="size-8" />
			</div>
		)
	}

	const hasPermission = requiredRoles.some((role) => user.roles.includes(role))
	const defaultRoute = getDefaultRoute(user.roles)

	if (!hasPermission && !user.isLoadingUser) {
		return <Navigate to={defaultRoute} state={{ from: location }} replace />
	}

	return <>{children}</>
}
