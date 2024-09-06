import { ReactNode } from 'react'

interface HeaderProps {
	children?: ReactNode
	title: string
	hasTitle?: boolean
}

export const Header = ({ children, title, hasTitle = true }: HeaderProps) => {
	return (
		<header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
			{hasTitle && <h1 className="text-xl font-semibold">{title}</h1>}
			{children}
		</header>
	)
}
