import React, { useEffect, useState } from "react";
import { Post, Post as PostType } from "../types/post";
import { Link } from "../routers/Link";

type PostProps = {
	initialPost: Post | null;
}

 const Post = ({ initialPost = null }: PostProps) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [post, setPost] = useState<PostType|null>(initialPost);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const postID = params.get('id');

		if (postID) {
			loadPost(postID).then(setPost);
		}
	}, []);

	if (!post) {
		return <div>Something went wrong</div>;
	}

	return <div>
		<Link to="/">Back</Link>
		<h1>{post.title}</h1>
		<p>{post.body}</p>
	</div>
}

export const loadPost = async (postID: string) => {
	return fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`)
			.then((response) => response.json())
			.then((data) => {
				return data
			})
}

export const getSSP = async ({query} :any) => {
	return {
		initialPost: await loadPost(query.id),
	}
}

export default Post;
