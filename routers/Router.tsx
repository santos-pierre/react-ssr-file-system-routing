import React, {ReactNode, createContext, useEffect, useState} from "react";

type RouterProps = {
	initialPath: string;
	children: ReactNode;
}

export const RouterContext = createContext({
	path: "",
	pushState: (path: string) => {},
	replaceState: (path: string) => {},
});

const canWindow = () => typeof window !== 'undefined';

export const Router = ({ initialPath ,children }: RouterProps) => {
	const [path, setPath] = useState<string>(canWindow() ? window.location.pathname : initialPath);

	const pushState = (path: string) => {
		window.history.pushState({}, '', path);
		setPath(path);
	}

	const replaceState = (path: string) => {
		window.history.replaceState({}, '', path);
		setPath(path);
	}

	useEffect(() => {
		window.addEventListener('popstate', () => {
			setPath(window.location.pathname);
		})
	}, []);

	return (
		<RouterContext.Provider value={{path, pushState, replaceState}}>
			{children}
		</RouterContext.Provider>
	)
}
