import { FormSubmitVideo, FormType } from '@/components/FormSubmitVideo'
import { useAppTitle } from '@/hooks/useAppTitle'
import { api } from '@/lib/axios'
import {
	PredictRunStats,
	startPredictData,
} from '@/store/slices/predictRunSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const PREDICTOPTIONS = ['volumetri', 'speed', 'time run', 'distance']

export const SoccerPredict = () => {
	useAppTitle({ title: 'Soccer Predic' })

	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	const onSubmit = async (data: FormType, reset: () => void) => {
		let formData = new FormData()

		formData.append('file', data.file)
		formData.append('predictType', data.predictType)

		setLoading(true)
		//TODO: use predict tipe to change endpoint

		api
			.post('/predict/run/treadmill', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log(response.data)

				console.log(response.data.predict.asymmetry_json)

				const data = response.data

				'output_gif' in data
					? dispatch(
							startPredictData({
								outputFileUrl: data.outputFileUrl,
								predict: data.predict,
							}),
						)
					: dispatch(
							startPredictData({
								outputFileUrl: '',
								predict: {} as PredictRunStats,
							}),
						)
			})
			.catch((error) => {
				console.error(error)
				toast.error('Error on predict')
			})
			.finally(() => {
				setLoading(false)
			})

		reset()
	}

	return (
		<main className="flex flex-col w-full h-full">
			<section className="flex items-center justify-center ">
				<FormSubmitVideo
					isLoading={loading}
					onSubmit={onSubmit}
					predicOptions={PREDICTOPTIONS}
				/>
			</section>
		</main>
	)
}
