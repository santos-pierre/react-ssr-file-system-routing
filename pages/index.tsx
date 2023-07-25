import React, { useEffect, useState } from "react";
import { Link } from "../routers/Link";
import { Post } from "../types/post";

type PostsProps = {
	initialPosts: Post[];
}

export const loadPosts = async () => {
	return fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
}

const Posts = ({initialPosts = []} : PostsProps) => {
	const [posts, setPosts] = useState<Post[]>(initialPosts);

	useEffect(() => {
		loadPosts().then(setPosts);
	}, []);


	return <div>
		<h1>Awesome Blog</h1>
		<ul>
			{posts.map((post) => (
				<li key={post.id}>
					<Link to={`/posts?id=${post.id}`}>{post.title}</Link>
				</li>
			))}
		</ul>
	</div>
}

export const getSSP = async () => {
	return {
		initialPosts: await loadPosts(),
	}
}

export const getSEO = async () => {
	return {
		title: 'Awesome blog',
		description: 'WOW!',
	}
}
export default Posts;
