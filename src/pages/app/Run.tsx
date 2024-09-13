import { FileInput } from '@/components/InputFile'
import { Report } from '@/components/Report'
import { SelectPredict } from '@/components/SelectPredict'
import { Button } from '@/components/ui/button/button'
import { api } from '@/lib/axios'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_FILE_SIZE = 100 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'video/mp4']

const schema = z.object({
	file: z
		.any()
		.refine((file) => file !== null && file !== undefined, 'campo obrigatório')
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine((file) => {
			// console.log(file?.type)

			return ACCEPTED_IMAGE_TYPES.includes(file?.type)
		}, 'Only .jpg, .jpeg, .png, .webp, and .mp4 formats are supported.'),
	predictType: z.string().min(1, 'campo obrigatório'),
})

export type FormType = z.infer<typeof schema>

interface predict {
	nome: string
	right_knee_angle_mean: number
	right_knee_angle_min: number
	right_knee_angle_max: number
	left_knee_angle_mean: number
	left_knee_angle_min: number
	left_knee_angle_max: number
	velocity_mean: number
	velocity_max: number
	asymmetry_mean: number
	asymmetry_max: number
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	asymmetry_json: any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	hip_movement_json: any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	knee_angle_json: any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	velocity_json: any
}
export interface predictData {
	output_gif: string
	predict: predict
}

export const Run = () => {
	const [predictData, setPredictData] = useState<predictData>({
		output_gif: '',
		predict: {} as predict,
	})
	const [loading, setLoading] = useState(false)

	const methods = useForm<FormType>({
		defaultValues: {
			file: null,
			predictType: '',
		},
		resolver: zodResolver(schema),
	})

	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = methods

	const onSubmit = async (data: FormType) => {
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
					? setPredictData({
							output_gif: data.output_gif,
							predict: data.predict,
						})
					: setPredictData({
							output_gif: '',
							predict: {} as predict,
						})
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
				<FormProvider {...methods}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className=" w-full md:w-1/2  max-w-lg  flex p-6 flex-col gap-8"
					>
						<div className="flex flex-col w-full gap-2  ">
							<label htmlFor="file">File</label>
							<FileInput />
							{errors.file?.message && (
								<span className="text-red-500">
									{String(errors.file.message)}
								</span>
							)}
						</div>
						<div className="flex flex-col w-full gap-2  ">
							<label htmlFor="file">Type Predict</label>
							<SelectPredict
								placeholder="Select type of prediction"
								options={['a', 'b', 'c', 'd']}
							/>
							{errors.predictType?.message && (
								<span className="text-red-500">
									{String(errors.predictType.message)}
								</span>
							)}
						</div>

						<Button
							type="submit"
							disabled={isSubmitting || loading}
							className="flex items-center justify-center gap-4"
						>
							{loading && (
								<div className="size-5 border-2 border-blue-500 border-solid rounded-full border-t-transparent animate-spin" />
							)}

							<span>Submit</span>
						</Button>
					</form>
				</FormProvider>
			</section>
			{predictData.output_gif && (
				<Report
					output_gif={predictData.output_gif}
					predict={predictData.predict}
				/>
			)}
		</main>
	)
}
