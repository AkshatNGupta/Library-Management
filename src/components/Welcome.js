import React, { useEffect, useState } from "react";
import "./styles.css";

const Welcome = () => {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");

	useEffect(() => {
		const fetchQuote = async () => {
			const response = await fetch("https://quotes.rest/qod.json?category=inspire");
			const data = await response.json();
			setQuote(data.contents.quotes[0].quote);
			setAuthor(data.contents.quotes[0].author);
		};
		fetchQuote();
	}, []);

	return (
		<div className="jumbotron">
			<h1>Welcome to the Library Management System</h1>
			<blockquote className="blockquote mb-O">
				<p>{quote}</p>
				<footer className="blockquote-footer"> {author}</footer>
			</blockquote>
		</div>
	);
};

export default Welcome;
