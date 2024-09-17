import { useAuthStorage } from '@/hooks/useAuthStorage'
import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
	requiredRoles: string[]
	children: ReactNode
}

export function ProtectedRoute({
	requiredRoles,
	children,
}: ProtectedRouteProps) {
	const { getUser, getDefaultRoute } = useAuthStorage()
	const user = getUser()
	const location = useLocation()

	if (!user) {
		return <Navigate to="/auth" state={{ from: location }} replace />
	}

	const hasPermission = requiredRoles.some((role) => user.roles.includes(role))

	const defaultRoute = getDefaultRoute(user.roles)

	if (!hasPermission) {
		return <Navigate to={defaultRoute} replace />
	}

	return children
}
