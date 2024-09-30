import { Link, Outlet } from 'react-router-dom'

import { AppAside } from '@/components/AppAside'
import { Header } from '@/components/Header'
import { SheetAppMobile } from '@/components/SheetAppMobile'
import { Button } from '@/components/ui/button/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useAppSelector } from '@/store'
import { User } from 'lucide-react'

export function AppLayout() {
	const user = useAppSelector((state) => state.user)

	const titleHeader = useAppSelector((state) => state.appHeaderTitleSlice.title)

	return (
		<div className="flex flex-col md:grid h-full min-h-screen w-full md:grid-cols-[min-content_1fr] md:items-start">
			<AppAside />

			<div className="flex flex-col w-full h-full">
				<Header>
					<SheetAppMobile />
					<h1 className="text-xl font-semibold capitalize">{titleHeader}</h1>
					<div className="md:ml-auto">
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
								<DropdownMenuLabel>{user.name || 'User'}</DropdownMenuLabel>
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
