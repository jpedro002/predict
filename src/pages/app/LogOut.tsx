import { useAuthStorage } from '@/hooks/useAuthStorage'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export const LogOut = () => {
	const { signout } = useAuthStorage()

	useEffect(() => {
		signout()
	}, [signout])

	return <Navigate to="/auth" />
}
