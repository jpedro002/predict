import { CustomPlot } from '@/components/CustomPlot'
import { FormSubmitVideo, FormType } from '@/components/FormSubmitVideo'
import { useAppTitle } from '@/hooks/useAppTitle'
import { api } from '@/lib/axios'
import { useState } from 'react'

import { toast } from 'sonner'

const PREDICTOPTIONS = ['block', 'pass', 'serve']

export const VolleyballPredict = () => {
	useAppTitle({ title: 'VolleyBall Predict' })

	const [loading, setLoading] = useState(false)
	const [predictDataABC, setPredictDataABC] = useState<{
		predict?: {
			data: any
			layout: any
			frames: any
		}
		jump_height_analysis?: { data: any; layout: any }
		reaction_time_and_speed_analysis?: { data: any; layout: any }
		arm_angles_analysis?: { data: any; layout: any }
		body_symmetry_analysis?: { data: any; layout: any }
	}>({})

	const onSubmit = async (data: FormType, reset: () => void) => {
		let formData = new FormData()
		formData.append('file', data.file)

		setLoading(true)

		const endpoint: Record<string, string> = {
			block: '/block',
			serve: '/serve',
			pass: '/pass',
		}

		try {
			const response = await api.post(
				`/predict/voley${endpoint[data.predictType]}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			)

			const responseData = response.data

			if (responseData) {
				try {
					const parsedPredict = responseData.predict

					// Fazendo o parsing dos campos que chegam como JSON string
					const jumpHeightAnalysis = responseData.jump_height_analysis
						? JSON.parse(responseData.jump_height_analysis)
						: {}
					const reactionTimeAndSpeedAnalysis =
						responseData.reaction_time_and_speed_analysis
							? JSON.parse(responseData.reaction_time_and_speed_analysis)
							: {}
					const armAnglesAnalysis = responseData.arm_angles_analysis
						? JSON.parse(responseData.arm_angles_analysis)
						: {}
					const bodySymmetryAnalysis = responseData.body_symmetry_analysis
						? JSON.parse(responseData.body_symmetry_analysis)
						: {}

					setPredictDataABC({
						predict: parsedPredict,
						jump_height_analysis: jumpHeightAnalysis,
						reaction_time_and_speed_analysis: reactionTimeAndSpeedAnalysis,
						arm_angles_analysis: armAnglesAnalysis,
						body_symmetry_analysis: bodySymmetryAnalysis,
					})

					console.log(responseData)
				} catch (error) {
					console.error('Error parsing response data:', error)
					toast.error('Invalid response format')
				}
			} else {
				toast.error('No data found in the response')
			}
		} catch (error) {
			console.error('Error during prediction:', error)
			toast.error('Error on predict')
		} finally {
			setLoading(false)
		}

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
			{predictDataABC.predict && (
				<CustomPlot
					data={predictDataABC.predict.data}
					layout={predictDataABC.predict.layout}
					frames={predictDataABC.predict.frames}
					divH="h-[800px]"
					plotH="h-[800px]"
				/>
			)}

			{predictDataABC.jump_height_analysis && (
				<CustomPlot
					data={predictDataABC.jump_height_analysis.data}
					layout={predictDataABC.jump_height_analysis.layout}
					divH="h-[400px]"
					plotH="h-[400px]"
				/>
			)}

			{predictDataABC.reaction_time_and_speed_analysis && (
				<CustomPlot
					data={predictDataABC.reaction_time_and_speed_analysis.data}
					layout={predictDataABC.reaction_time_and_speed_analysis.layout}
					divH="h-[400px]"
					plotH="h-[400px]"
				/>
			)}

			{predictDataABC.arm_angles_analysis && (
				<CustomPlot
					data={predictDataABC.arm_angles_analysis.data}
					layout={predictDataABC.arm_angles_analysis.layout}
					divH="h-[400px]"
					plotH="h-[400px]"
				/>
			)}

			{predictDataABC.body_symmetry_analysis && (
				<CustomPlot
					data={predictDataABC.body_symmetry_analysis.data}
					layout={predictDataABC.body_symmetry_analysis.layout}
					divH="h-[400px]"
					plotH="h-[400px]"
				/>
			)}
		</main>
	)
}
