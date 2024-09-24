import { AthleteManagementTableRow } from '@/components/AthleteManagementTableRow'
import { FilterAthletesByCoach } from '@/components/FilterAthletesByCoach'
import { Button } from '@/components/ui/button/button'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useAppTitle } from '@/hooks/useAppTitle'
import { Helmet } from 'react-helmet-async'

export const AthleteManagementPanel = () => {
	useAppTitle({ title: 'Athlete Management' })

	return (
		<>
			<Helmet title="Athlete" />

			<div className="space-y-6 mx-auto w-full p-4 max-w-5xl  ">
				<Button className=" w-full sm:max-w-[16rem] ">Create Athlete</Button>
				<FilterAthletesByCoach />

				<div className="    ">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-full min-w-[150px]">Name</TableHead>

								<TableHead className="min-w-[150px]">status</TableHead>

								<TableHead className="min-w-[72px]">Edit</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 5 }, (_, index) => index + 1).map(
								(item) => (
									<AthleteManagementTableRow
										key={item}
										id={1}
										name="joão pedro"
										statusDailyResponse={item % 2 === 0}
									/>
								),
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
