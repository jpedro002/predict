import { Button } from '@/components/ui/button/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { TableCell, TableRow } from '@/components/ui/table'
import { Ellipsis } from 'lucide-react'
import { useMemo } from 'react'
import { DeleteUserAlert } from './DeleteUserAlert'
import UpdateUserModal from './UpdateUserModal'

interface UsersTableRowProps {
	id: number
	name: string
	email: string
	cargo: string[]
}

export const UsersTableRow = ({
	id,
	name,
	email,
	cargo,
}: UsersTableRowProps) => {
	const defaultValues = useMemo(() => {
		return {
			name,
			email,
			roles: cargo.map((role) => ({ role })),
		}
	}, [])

	return (
		<TableRow key={id}>
			<TableCell className=" font-medium">{name}</TableCell>
			<TableCell>{email}</TableCell>
			<TableCell>{cargo.join(', ')}</TableCell>
			<TableCell>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="ghost" className="size-10 p-2">
							<Ellipsis />
						</Button>
					</PopoverTrigger>
					<PopoverContent align="end" className="w-[200px]">
						<UpdateUserModal defaultValues={defaultValues} userID={id} />
						<DeleteUserAlert userID={id} />
					</PopoverContent>
				</Popover>
			</TableCell>
		</TableRow>
	)
}
