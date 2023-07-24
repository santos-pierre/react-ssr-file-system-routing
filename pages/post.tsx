import React, { useEffect, useState } from "react";
import { Post as PostType } from "../types/post";
import { Link } from "../routers/Link";

export const Post = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [post, setPost] = useState<PostType>();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const postID = params.get('id');

		fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`)
			.then((response) => response.json())
			.then((data) => {
				setPost(data);
			})
			.finally(() => {
				setLoading(false);
			})
	});

	if (loading) {
		return <div>...Loading</div>;
	}

	if (!post) {
		return <div>Something went wrong</div>;
	}

	return <div>
		<Link to="/">Back</Link>
		<h1>{post.title}</h1>
		<p>{post.body}</p>
	</div>
}
