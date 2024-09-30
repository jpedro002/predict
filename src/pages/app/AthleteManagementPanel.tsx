import { AthleteManagementTableRow } from '@/components/AthleteManagementTableRow'
import CoachCreateAthleteModal from '@/components/CoachCreateAthleteModal'
import { FilterAthletesByCoach } from '@/components/FilterAthletesByCoach'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useAppTitle } from '@/hooks/useAppTitle'
import athletesService from '@/services/volleyballManagement/volleyballManagement'
import { useAppSelector } from '@/store'
import { startAthletes } from '@/store/slices/athletesSlice'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

export const AthleteManagementPanel = () => {
	useAppTitle({ title: 'Athlete Management' })
	const athletes = useAppSelector((state) => state.athletes.athletes)
	const dispatch = useDispatch()

	const { listAthletes } = athletesService

	useEffect(() => {
		const fetchAthletes = async () => {
			try {
				const athletesData = await listAthletes()

				if ('message' in athletesData) {
					console.error('Error fetching athletes:', athletesData.message)
					toast.error('Error fetching athletes')
					return
				}

				dispatch(startAthletes(athletesData))
			} catch (error) {
				console.error('Error fetching athletes:', error)
				toast.error('Error fetching athletes')
			}
		}

		fetchAthletes()
	}, [dispatch, listAthletes])

	return (
		<>
			<Helmet title="Athlete" />

			<div className="space-y-6 mx-auto w-full p-4 max-w-5xl  ">
				<CoachCreateAthleteModal />
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
							{athletes.map((a) => (
								<AthleteManagementTableRow
									key={a.id}
									id={a.id}
									name={a.name}
									statusDailyResponse={a.status}
									email={a.email}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
