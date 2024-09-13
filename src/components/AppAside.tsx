import { Activity, Bot, BrainCircuit, Code2, Triangle } from 'lucide-react'

import { Button } from '@/components/ui/button/button'

import SoccerBall from '@/assets/icons/SoccerBall'
import { TooltipProvider } from '@/components/ui/tooltip'
import VolleyBall from './../assets/icons/VolleyBall'
import { CustomToolTip } from './CustomToolTip'

export const AppAside = () => {
	return (
		<TooltipProvider>
			<aside className=" hidden md:flex h-full flex-col border-r">
				<div className="border-b p-2 min-h-[56.8px] max-h-[56.8px]">
					<Button variant="outline" size="icon" aria-label="Home">
						<Triangle className="size-5 fill-foreground" />
					</Button>
				</div>
				<nav className="grid gap-1 p-2">
					<CustomToolTip
						to="/run"
						icon={<Activity className="size-5" />}
						label="Run"
					/>
					<CustomToolTip
						to="/soccer"
						icon={<SoccerBall className="size-5" />}
						label="Soccer"
					/>
					<CustomToolTip
						to="/volleyball"
						icon={<VolleyBall className="size-5" />}
						label="Volleyball"
					/>
				</nav>
			</aside>
		</TooltipProvider>
	)
}
