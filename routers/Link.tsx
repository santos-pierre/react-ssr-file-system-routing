import React, { MouseEvent, ReactNode, useContext } from "react";
import { RouterContext } from "./Router";

type LinkProps = {
	to: string;
	children: ReactNode
}

export const Link = ({to, children} : LinkProps) => {
	const { pushState } = useContext(RouterContext);

	const handleClik = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		pushState(to);
	}

	return <a href={to} onClick={handleClik}>
		{children}
	</a>
}
