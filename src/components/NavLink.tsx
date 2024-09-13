import { cn } from '@/lib/utils'
import { Link, LinkProps, useLocation } from 'react-router-dom'

type NavLinkProps = LinkProps

export const NavLink = (LinkProps: NavLinkProps) => {
	const { pathname } = useLocation()

	return (
		<Link
			{...LinkProps}
			to={LinkProps.to}
			className={cn(
				'text-muted-foreground hover:text-foreground data-[current=true]:text-foreground',
				LinkProps.className,
			)}
			data-current={pathname === LinkProps.to}
		>
			{LinkProps.children}
		</Link>
	)
}
