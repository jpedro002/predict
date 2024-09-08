import { Header } from '@/components/Header'
import { FileInput } from '@/components/InputFile'
import { SelectPredict } from '@/components/SelectPredict'
import { Button } from '@/components/ui/button/button'
import { api } from '@/lib/axios'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', '', '.mp4']

const schema = z.object({
	file: z
		.any()
		.refine((file) => file !== null && file !== undefined, 'campo obrigatório')
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			'Only .jpg, .jpeg, .png, .webp, and .mp4 formats are supported.',
		),
	predictType: z.string().min(1, 'campo obrigatório'),
})

export type FormType = z.infer<typeof schema>

export const Home = () => {
	const methods = useForm<FormType>({
		defaultValues: {
			file: null,
			predictType: '',
		},
		resolver: zodResolver(schema),
	})

	const {
		handleSubmit,
		formState: { errors },
		reset,
	} = methods

	const onSubmit = async (data: FormType) => {
		console.log('Form Data:', data)

		let formData = new FormData()

		formData.append('file', data.file)
		formData.append('predictType', data.predictType)

		console.log(formData)

		api
			.post('http://localhost:5000/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log(response.data)
			})
			.catch((error) => {
				console.error(error)
			})

		reset()
	}

	return (
		<main>
			<Header title="Predictit" />
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

						<Button type="submit">Submit</Button>
					</form>
				</FormProvider>
			</section>
		</main>
	)
}
