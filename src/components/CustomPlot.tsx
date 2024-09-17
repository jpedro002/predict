import Plot from 'react-plotly.js'

interface CustomPlotProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	layout: any
}

export const CustomPlot = ({ data, layout }: CustomPlotProps) => {
	const responsiveLayout = {
		...layout,
		autosize: true,
		width: undefined,
		height: undefined,
	}

	return (
		<div className="min-w-[600px] w-full max-w-full overflow-x-auto">
			<Plot
				data={data}
				layout={responsiveLayout}
				useResizeHandler
				style={{ width: '100%', height: '100%' }}
				className="h-[500px]"
			/>
		</div>
	)
}
