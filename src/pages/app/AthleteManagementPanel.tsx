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
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const AthleteManagementPanel = () => {
	const [searchParams] = useSearchParams()

	const status = searchParams.get('status')
	const athleteName = searchParams.get('athleteName')

	useAppTitle({ title: 'Gestion des Athlètes' })
	const athletes = useAppSelector((state) => state.athletes.athletes)
	const dispatch = useDispatch()

	const { listAthletes } = athletesService

	useEffect(() => {
		const fetchAthletes = async () => {
			try {
				const athletesData = await listAthletes({
					athleteName: athleteName || '',
					status: status === 'all' ? undefined : status || '',
				})

				if ('message' in athletesData) {
					console.error(
						'Erreur lors de la récupération des athlètes:',
						athletesData.message,
					)
					toast.error('Erreur lors de la récupération des athlètes')
					return
				}

				dispatch(startAthletes(athletesData))
			} catch (error) {
				console.error('Erreur lors de la récupération des athlètes:', error)
				toast.error('Erreur lors de la récupération des athlètes')
			}
		}

		fetchAthletes()
	}, [dispatch, listAthletes, athleteName, status])

	return (
		<>
			<Helmet title="Athlète " />
			<div className="space-y-6 mx-auto w-full p-4 max-w-5xl">
				<CoachCreateAthleteModal />
				<FilterAthletesByCoach />

				<div className="">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-full min-w-[150px]">Nom</TableHead>
								<TableHead className="min-w-[150px]">Statut</TableHead>
								<TableHead className="min-w-[72px]">Modifier</TableHead>
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
