import { Outlet } from 'react-router-dom'

import { AdminAside } from '@/components/AdminAside'
import { Header } from '@/components/Header'
import { SheetAdminMobile } from '@/components/SheetAdminMobile'

import { DropDownUserSettings } from '@/components/DropDownUserSettings'
import { useAppSelector } from '@/store'

export function AdminLayout() {
	const titleHeader = useAppSelector((state) => state.appHeaderTitleSlice.title)

	return (
		<div className="flex flex-col md:grid h-full min-h-screen w-full md:grid-cols-[min-content_1fr] md:items-start">
			<AdminAside />

			<div className="flex flex-col w-full h-full">
				<Header>
					<SheetAdminMobile />
					<h1 className="text-xl font-semibold capitalize">{titleHeader}</h1>
					<div className="md:ml-auto">
						<DropDownUserSettings />
					</div>
				</Header>

				<Outlet />
			</div>
		</div>
	)
}
