import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
	const [value, setValue] = useState("");
	const [message, setMessage] = useState("");
	const [previousChats, setPreviousChats] = useState([]);
	const [currentTitle, setCurrentTitle] = useState("");

	const createNewChat = () => {
		setMessage("");
		setValue("");
		setCurrentTitle("");
	};

	const historyItemClick = (title) => {
		setMessage("");
		setValue("");
		setCurrentTitle(title);
	};

	const getMessages = async () => {
		const options = {
			method: "POST",
			body: JSON.stringify({
				message: value,
			}),
			headers: {
				"Content-type": "application/json",
			},
		};
		try {
			const response = await fetch(
				"http://localhost:8080/completions",
				options
			);

			const data = await response.json();
			if (data.choices) {
				setMessage(data.choices[0].message);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (!currentTitle && value && message) {
			setCurrentTitle(value);
		}
		if (currentTitle && value && message) {
			setPreviousChats((prevChats) => [
				...prevChats,
				{
					title: currentTitle,
					role: "user",
					content: value,
				},
				{
					title: currentTitle,
					role: message.role,
					content: message.content,
				},
			]);
		}
	}, [message, currentTitle]);

	const currentChat = previousChats.filter(
		(previousChat) => previousChat.title === currentTitle
	);
	const uniqTitles = Array.from(
		new Set(previousChats.map((previousChat) => previousChat.title))
	);

	return (
		<div className="app">
			<section className="sidebar">
				<button onClick={createNewChat}>New Chat</button>
				<ul className="history">
					{uniqTitles?.map((uniqTitle, index) => (
						<li
							key={index}
							onClick={() => historyItemClick(uniqTitle)}
						>
							{uniqTitle}
						</li>
					))}
				</ul>
				<nav>
					<p>Made by Manthan Parmar</p>
				</nav>
			</section>
			<section className="main">
				{!currentTitle && <h1>ChatGPT React Clone</h1>}
				<ul className="top-section">
					{currentChat?.map((chatMessage, index) => (
						<li key={index}>
							<p className="role">{chatMessage.role}</p>
							<p>{chatMessage.content}</p>
						</li>
					))}
				</ul>
				<div className="bottom-section">
					<div className="input-container">
						<input
							value={value}
							onChange={(event) => setValue(event.target.value)}
						/>
						<div id="submit" onClick={getMessages}>
							<p className="fa fa-angle-double-right"></p>
						</div>
					</div>
					<p className="metadata">
						This app is made for learning purpose only. If you have
						any query or issue. You can contact me on
						Github@Manthan1313Github.
						<br />
						Chat GPT version - 14
					</p>
				</div>
			</section>
		</div>
	);
};

export default App;
