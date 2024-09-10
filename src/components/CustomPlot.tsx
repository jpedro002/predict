import Plot from 'react-plotly.js'

interface CustomPlotProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	layout: any
}

export const CustomPlot = ({ data, layout }: CustomPlotProps) => {
	return (
		<Plot
			data={data}
			layout={layout}
			useResizeHandler
			className="w-full max-w-6xl h-[500px]"
		/>
	)
}
