import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { Helmet } from 'react-helmet-async'

import { FilterUsersByAdmin } from '@/components/FilterUsersByAdmin'

import CreateAccountModal from '@/components/CreateAccountModal'
import { useAppTitle } from '@/hooks/useAppTitle'
import { UsersTableRow } from '../../components/UsersTableRow'

export const ListUsers = () => {
	useAppTitle({ title: 'Usuários' })

	return (
		<>
			<Helmet title="Usuarios" />

			<div className="space-y-6 mx-auto w-full p-4 max-w-5xl  ">
				<CreateAccountModal />
				<FilterUsersByAdmin />

				<div className="    ">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-1/2 min-w-[150px]">Nome</TableHead>
								<TableHead className="w-1/2 min-w-[150px]">Email</TableHead>
								<TableHead className="">Cargo</TableHead>

								<TableHead className="w-[80px]">Editar</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 10 }, (_, index) => index + 1).map(
								(item) => (
									<UsersTableRow
										key={item}
										id={1}
										email="jao@gmail.com"
										name="joão pedro"
										cargo="admin"
									/>
								),
							)}
							<UsersTableRow
								id={1}
								email="jao@gmail.com"
								name="joão pedro"
								cargo="admin"
							/>
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
