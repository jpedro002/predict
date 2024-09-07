import { Header } from '@/components/Header'
import { INpfteste } from '@/components/INpfteste'
import { FileInput } from '@/components/InputFile'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'

export const Home = () => {
	const methods = useForm({
		defaultValues: {
			file: null,
		},
	})
	const { handleSubmit, register } = methods

	const onSubmit = (data: any) => {
		console.log('Form Data:', data)
	}

	return (
		<main>
			<Header title="Predictit" />
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full  flex justify-center items-center p-6 flex-col gap-8"
				>
					<FileInput />
					{/* <Input type="file" className="w-1/2 " {...register('input2')} />
					<INpfteste /> */}
					<Button type="submit">Submit</Button>
				</form>
			</FormProvider>
		</main>
	)
}
