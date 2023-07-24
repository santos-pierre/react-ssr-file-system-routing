import React from "react";
import { Router } from "./routers/Router";
import { Route } from "./routers/Route";
import { Posts } from "./pages/posts";
import { Post } from "./pages/post";

export const App = () => {
	return <Router>
		<Route path="/">
			<Posts />
		</Route>
		<Route path="/post">
			<Post />
		</Route>
	</Router>
}
