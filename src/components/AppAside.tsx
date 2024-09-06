import { Bot, BrainCircuit, Code2, SquareUser, Triangle } from 'lucide-react'

import { Button } from '@/components/ui/button/button'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Link } from 'react-router-dom'
import { CustomToolTip } from './CustomToolTip'

export const AppAside = () => {
	return (
		<TooltipProvider>
			<aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
				<div className="border-b p-2">
					<Button variant="outline" size="icon" aria-label="Home">
						<Triangle className="size-5 fill-foreground" />
					</Button>
				</div>
				<nav className="grid gap-1 p-2">
					<CustomToolTip
						to="/"
						icon={<BrainCircuit className="size-5" />}
						label="Playground"
					/>
					<CustomToolTip
						to="/list"
						icon={<Bot className="size-5" />}
						label="Models"
					/>
					<CustomToolTip
						to="/config"
						icon={<Code2 className="size-5" />}
						label="API"
					/>
				</nav>
				<nav className="mt-auto grid gap-1 p-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="mt-auto rounded-lg"
								aria-label="Account"
							>
								<SquareUser className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							<Button
								variant="ghost"
								className="mt-auto rounded-lg"
								aria-label="Account"
								asChild
							>
								<Link to="/logout">Log Out</Link>
							</Button>
						</TooltipContent>
					</Tooltip>
				</nav>
			</aside>
		</TooltipProvider>
	)
}
