import { predictData } from '@/pages/app/Home'
import { ReactNode } from 'react'

interface TitleProps {
	children: ReactNode
}

const Title = ({ children }: TitleProps) => {
	return <h2 className="text-2xl font-bold text-gray-800 mb-4">{children}</h2>
}

type ReportProps = predictData

export const Report = ({ output_gif, predict }: ReportProps) => {
	const {
		nome,
		right_knee_angle_mean,
		right_knee_angle_min,
		right_knee_angle_max,
		left_knee_angle_mean,
		left_knee_angle_min,
		left_knee_angle_max,
		velocity_mean,
		velocity_max,
		asymmetry_mean,
		asymmetry_max,
	} = predict!

	return (
		<section>
			<div className="container p-8 max-w-2xl mx-auto bg-white">
				<Title>Análise Cinemática da Caminhada - {nome}</Title>
				<div className="flex justify-center mb-6">
					<img src={`data:image/gif;base64,${output_gif}`} alt="Output GIF" />
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
		</section>
	)
}
