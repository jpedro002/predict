import { FileInput } from '@/components/InputFile'
import { SelectPredict } from '@/components/SelectPredict'
import { Button } from '@/components/ui/button/button'

import { zodResolver } from '@hookform/resolvers/zod'

import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Label } from './ui/label'

const MAX_FILE_SIZE = 100 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'video/mp4']

const schema = z.object({
	file: z
		.any()
		.refine((file) => file !== null && file !== undefined, 'campo obrigatório')
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine((file) => {
			return ACCEPTED_IMAGE_TYPES.includes(file?.type)
		}, 'Only .jpg, .jpeg, .png, .webp, and .mp4 formats are supported.'),
	predictType: z.string().min(1, 'campo obrigatório'),
})

export type FormType = z.infer<typeof schema>

interface FormSubmitVideoProps {
	onSubmit: (data: FormType, reset: () => void) => void
	isLoading: boolean
	predicOptions: string[]
}

export const FormSubmitVideo = ({
	isLoading,
	onSubmit,
	predicOptions,
}: FormSubmitVideoProps) => {
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

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit((data) => {
					onSubmit(data, reset)
				})}
				className=" w-full md:w-1/2  max-w-lg  flex p-6 flex-col gap-8"
			>
				<div className="flex flex-col w-full gap-2  ">
					<Label htmlFor="file">File</Label>
					<FileInput />
					{errors.file?.message && (
						<span className="text-red-500">{String(errors.file.message)}</span>
					)}
				</div>
				<div className="flex flex-col w-full gap-2  ">
					<Label htmlFor="file">Type Predict</Label>
					<SelectPredict
						placeholder="Select type of prediction"
						options={predicOptions}
					/>
					{errors.predictType && (
						<span className="text-red-500">
							{String(errors.predictType.message)}
						</span>
					)}
				</div>

				<Button
					type="submit"
					disabled={isSubmitting || isLoading}
					className="flex items-center justify-center gap-4"
				>
					{isLoading && (
						<div className="size-5 border-2 border-blue-500 border-solid rounded-full border-t-transparent animate-spin" />
					)}

					<span>Submit</span>
				</Button>
			</form>
		</FormProvider>
	)
}
