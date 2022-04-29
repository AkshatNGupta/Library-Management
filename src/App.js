import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./components/Welcome";
import BookList from "./components/BookList";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

function App() {
	return (
		<div style={{ backgroundColor: "#212529" }} className="App">
			<Header />
			<Container style={{ marginTop: "20px" }}>
				<Welcome />
				<BookList />
			</Container>
		</div>
	);
}

export default App;
