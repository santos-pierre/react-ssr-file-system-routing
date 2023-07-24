import React, { useEffect, useState } from "react";
import { Link } from "../routers/Link";
import { Post } from "../types/post";

export const Posts = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
			.then((response) => response.json())
			.then((data) => {
				setPosts(data);
			})
	}, []);


	return <div>
		<h1>Awesome Blog</h1>
		<ul>
			{posts.map((post) => (
				<li key={post.id}>
					<Link to={`/post?id=${post.id}`}>{post.title}</Link>
				</li>
			))}
		</ul>
	</div>
}
