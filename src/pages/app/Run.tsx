import { FormSubmitVideo, FormType } from '@/components/FormSubmitVideo'
import { ReportRunSection } from '@/components/ReportRunSection'
import { api } from '@/lib/axios'
import { useAppSelector } from '@/store'
import {
	PredictRunStats,
	startPredictData,
} from '@/store/slices/predictRunSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const Run = () => {
	const predictGif = useAppSelector((state) => state.predictRunSlice.output_gif)
	const predict = useAppSelector((state) => state.predictRunSlice.predict)

	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	const onSubmit = async (data: FormType, reset: () => void) => {
		let formData = new FormData()

		formData.append('file', data.file)
		formData.append('predictType', data.predictType)

		setLoading(true)

		api
			.post('/predict-run', formData, {
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
								output_gif: data.output_gif,
								predict: data.predict,
							}),
						)
					: dispatch(
							startPredictData({
								output_gif: '',
								predict: {} as PredictRunStats,
							}),
						)
			})
			.catch((error) => {
				console.error(error)
			})
			.finally(() => {
				setLoading(false)
			})

		reset()
	}

	return (
		<main className="flex flex-col w-full h-full">
			<section className="flex items-center justify-center ">
				<FormSubmitVideo isLoading={loading} onSubmit={onSubmit} />
			</section>
			{predictGif && predict && (
				<ReportRunSection output_gif={predictGif} predict={predict} />
			)}
		</main>
	)
}
