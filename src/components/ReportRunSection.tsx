import { cn } from '@/lib/utils'

import { predictData } from '@/store/slices/predictRunSlice'
import { ReactNode, useEffect, useRef } from 'react'
import { CustomPlot } from './CustomPlot'

interface TitleProps {
	children: ReactNode
	className?: string
}

const Title = ({ children, className }: TitleProps) => {
	return (
		<h2 className={cn('text-2xl font-bold text-gray-800 mb-4', className)}>
			{children}
		</h2>
	)
}
type ReportProps = predictData

export const ReportRunSection = ({ outputFileUrl, predict }: ReportProps) => {
	const {
		nome = 'Nome do Arquivo',
		right_knee_angle_mean = 0,
		right_knee_angle_min = 0,
		right_knee_angle_max = 0,
		left_knee_angle_mean = 0,
		left_knee_angle_min = 0,
		left_knee_angle_max = 0,
		velocity_mean = 0,
		velocity_max = 0,
		asymmetry_mean = 0,
		asymmetry_max = 0,
		asymmetry_json,
		hip_movement_json,
		knee_angle_json,
		velocity_json,
	} = predict

	const asymetryJsonParsed = JSON.parse(asymmetry_json)
	const hipmovementJsonParsed = JSON.parse(hip_movement_json)
	const kneeJsonParsed = JSON.parse(knee_angle_json)
	const velJsonParsed = JSON.parse(velocity_json)

	const sectionRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (sectionRef.current) {
			sectionRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [])

	return (
		<section
			id="report-section"
			ref={sectionRef}
			className="w-full  mx-auto bg-white max-w-6xl flex flex-col items-center
		"
		>
			<div className="p-8 ">
				<Title className="text-center mb-8 text-3xl">
					Análise Cinemática da Caminhada - {nome}
				</Title>
				<div className="flex justify-center mb-6">
					<video
						src={outputFileUrl}
						loop
						controls
						onLoadedData={() => console.log('Video carregado')}
						onError={(e) => console.error('Erro no vídeo', e)}
					/>
				</div>

				<div className="mb-6">
					<Title>Dados Gerais</Title>
					<ul className="list-disc ml-5 text-lg text-gray-600">
						<li>Arquivo de Entrada: {nome}</li>
						<li>Taxa de Amostragem: 30 fps</li>
					</ul>
				</div>

				<div className="mb-6">
					<Title>Ângulos Articulares</Title>
					<div className="mb-4">
						<strong className="block mb-2">Ângulo do Joelho Direito</strong>
						<ul className="list-disc ml-5 text-lg text-gray-600">
							<li>Ângulo Mínimo: {right_knee_angle_min.toFixed(2)} graus</li>
							<li>Ângulo Médio: {right_knee_angle_mean.toFixed(2)} graus</li>
							<li>Ângulo Máximo: {right_knee_angle_max.toFixed(2)} graus</li>
						</ul>
					</div>
					<div>
						<strong className="block mb-2">Ângulo do Joelho Esquerdo</strong>
						<ul className="list-disc ml-5 text-lg text-gray-600">
							<li>Ângulo Mínimo: {left_knee_angle_min.toFixed(2)} graus</li>
							<li>Ângulo Médio: {left_knee_angle_mean.toFixed(2)} graus</li>
							<li>Ângulo Máximo: {left_knee_angle_max.toFixed(2)} graus</li>
						</ul>
					</div>
				</div>

				<div className="mb-6">
					<Title>Deslocamento e Velocidade dos Segmentos Corporais</Title>
					<ul className="list-disc ml-5 text-lg text-gray-600">
						<li>Velocidade Média: {velocity_mean.toFixed(2)} unidades/s</li>
						<li>Velocidade Máxima: {velocity_max.toFixed(2)} unidades/s</li>
					</ul>
				</div>

				<div className="mb-6">
					<Title>Simetria do Movimento do Quadril</Title>
					<ul className="list-disc ml-5 text-lg text-gray-600">
						<li>Assimetria Média: {asymmetry_mean.toFixed(2)} unidades</li>
						<li>Assimetria Máxima: {asymmetry_max.toFixed(2)} unidades</li>
					</ul>
				</div>

				<div className="mb-6">
					<Title>Conclusões</Title>
					<ul className="list-disc ml-5 text-lg text-gray-600">
						<li>
							A análise dos ângulos articulares indica que o joelho direito tem
							uma média de {right_knee_angle_mean.toFixed(2)} graus e o joelho
							esquerdo tem uma média de {left_knee_angle_mean.toFixed(2)} graus.
						</li>
						<li>
							A velocidade dos segmentos corporais mostra uma média de{' '}
							{velocity_mean.toFixed(2)} unidades/s, com um pico de{' '}
							{velocity_max.toFixed(2)} unidades/s.
						</li>
						<li>
							A simetria do movimento do quadril é geralmente boa, com uma média
							de assimetria de {asymmetry_mean.toFixed(2)} unidades.
						</li>
					</ul>
				</div>
			</div>
			<div className="mb-6 w-96 sm:w-[80%] md:w-full overflow-x-auto ">
				<CustomPlot
					data={asymetryJsonParsed.data}
					layout={asymetryJsonParsed.layout}
				/>
			</div>
			<div className="mb-6 w-full sm:w-[80%] md:w-full overflow-x-auto">
				<CustomPlot
					data={hipmovementJsonParsed.data}
					layout={hipmovementJsonParsed.layout}
				/>
			</div>

			<div className="mb-6 w-96 sm:w-[80%] md:w-full overflow-x-auto">
				<CustomPlot data={kneeJsonParsed.data} layout={kneeJsonParsed.layout} />
			</div>
			<div className="mb-6 w-96 sm:w-[80%] md:w-full overflow-x-auto">
				<CustomPlot data={velJsonParsed.data} layout={velJsonParsed.layout} />
			</div>
		</section>
	)
}
