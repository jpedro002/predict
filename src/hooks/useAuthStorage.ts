import { ReactNode, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthData {
	jwt: string
	name: string
	email: string
	roles: string[]
}

const APP_KEY = 'APP_KEY'

export const useAuthStorage = () => {
	const navigate = useNavigate()

	const signin = ({ jwt, email, name, roles }: AuthData) => {
		localStorage.setItem(APP_KEY, JSON.stringify({ jwt, email, name, roles }))

		console.log(getDefaultRoute(roles))

		navigate(getDefaultRoute(roles), { replace: true })
	}

	const signout = () => {
		localStorage.removeItem(APP_KEY)
		navigate('/auth', { replace: true })
	}

	const getUser = (): AuthData | null => {
		const userData = localStorage.getItem(APP_KEY)
		return userData ? JSON.parse(userData) : null
	}

	const roleRoutes: { [key: string]: string } = {
		run: '/run',
		soccer: '/soccer',
		volleyball: '/volleyball',
		admin: '/admin',
		volleyballAthlete: '/questions',
	}

	const getDefaultRoute = (roles: string[]): string => {
		const route = roles.find((role) => roleRoutes[role])
		return route ? roleRoutes[route] : '/logout'
	}

	const user = getUser()
	const userRoles = user?.roles || []

	const availableRoutes = useMemo(() => {
		return Object.keys(roleRoutes).filter((role) => userRoles.includes(role))
	}, [userRoles])

	const renderIfRouteIsAvailable = (children: ReactNode, role: string) => {
		if (availableRoutes.includes(role) || availableRoutes.includes('admin'))
			return children
	}

	const ROLES = Object.keys(roleRoutes)

	return {
		signin,
		signout,
		getUser,
		getDefaultRoute,
		renderIfRouteIsAvailable,
		roleRoutes,
		availableRoutes,
		ROLES,
	}
}
