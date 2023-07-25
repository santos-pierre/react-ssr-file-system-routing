import React, { useContext } from "react";
import { RouterContext } from "./Router";

type RouteProps = {
	path: string;
	children: React.ReactNode;
}

export const Route = ({ path, children }: RouteProps) => {
	const { path: currentPath } = useContext(RouterContext);

	if (currentPath.split("?")[0] === path.split("?")[0]) {
		return <>{children}</>
	}

	return null;
}
