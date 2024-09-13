import { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { AppAside } from '@/components/AppAside'
import { Header } from '@/components/Header'
import { NavLink } from '@/components/NavLink'
import { Button } from '@/components/ui/button/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuthStorage } from '@/hooks/useAuthStorage'
import { BrainCircuit, Menu, User } from 'lucide-react'

export function AppLayout() {
	const [isOpened, setIsOpened] = useState(false)

	const navigate = useNavigate()
	const location = useLocation()
	const { getUser } = useAuthStorage()

	useEffect(() => {
		const user = getUser()

		if (!user && location.pathname !== '/auth') {
			navigate('/auth')
		}
	}, [location.pathname, getUser, navigate])

	const handleChangeOpen = () => {
		setIsOpened((prev) => !prev)
	}

	const titleHeader = useMemo(
		() => location.pathname.split('/')[1],
		[location.pathname],
	)

	return (
		<div className=" flex flex-col  md:grid h-screen w-full md:grid-cols-[min-content_1fr] md:items-start">
			<AppAside />

			<div className="flex flex-col w-full h-full">
				<Header>
					<Sheet onOpenChange={setIsOpened} open={isOpened}>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left">
							<nav className="grid gap-6 text-lg font-medium">
								<Link
									to="/"
									className="flex items-center gap-2 text-lg font-semibold"
								>
									<BrainCircuit className="h-6 w-6" />
									<span className="sr-only">Predict Home</span>
								</Link>
								<NavLink onClick={handleChangeOpen} to="/run">
									Run
								</NavLink>
								<NavLink onClick={handleChangeOpen} to="/volleyball">
									Volleyball
								</NavLink>
								<NavLink onClick={handleChangeOpen} to="/soccer">
									Soccer
								</NavLink>
							</nav>
						</SheetContent>
					</Sheet>
					<h1 className="text-xl font-semibold capitalize">{titleHeader}</h1>
					<div className="md:ml-auto ">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full"
								>
									<User className="h-5 w-5" />
									<span className="sr-only">Toggle user menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>User Name</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link to="/logout">Logout</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</Header>

				<Outlet />
			</div>
		</div>
	)
}
