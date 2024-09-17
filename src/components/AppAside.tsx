import SoccerBall from '@/assets/icons/SoccerBall'
import { Activity, ShieldMinus, Triangle } from 'lucide-react'
import VolleyBall from './../assets/icons/VolleyBall'

import { Button } from '@/components/ui/button/button'
import { TooltipProvider } from '@/components/ui/tooltip'

import { useAuthStorage } from '@/hooks/useAuthStorage'
import { CustomToolTip } from './CustomToolTip'

export const AppAside = () => {
	const { renderIfRouteIsAvailable } = useAuthStorage()
	return (
		<TooltipProvider>
			<aside className=" hidden md:flex h-full flex-col border-r">
				<div className="border-b p-2 min-h-[56.8px] max-h-[56.8px]">
					<Button variant="outline" size="icon" aria-label="Home">
						<Triangle className="size-5 fill-foreground" />
					</Button>
				</div>
				<nav className="grid gap-1 p-2">
					{renderIfRouteIsAvailable(
						<CustomToolTip
							to="/run"
							icon={<Activity className="size-5" />}
							label="Run"
						/>,
						'run',
					)}
					{renderIfRouteIsAvailable(
						<CustomToolTip
							to="/volleyball"
							icon={<VolleyBall className="size-5" />}
							label="Volleyball"
						/>,
						'volleyball',
					)}
					{renderIfRouteIsAvailable(
						<CustomToolTip
							to="/soccer"
							icon={<SoccerBall className="size-5" />}
							label="Soccer"
						/>,
						'soccer',
					)}
					{renderIfRouteIsAvailable(
						<CustomToolTip
							to="/admin"
							icon={<ShieldMinus className="size-5" />}
							label="Admin"
						/>,
						'admin',
					)}
				</nav>
			</aside>
		</TooltipProvider>
	)
}
