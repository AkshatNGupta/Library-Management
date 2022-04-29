import { Card, Form, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faRefresh, faSave } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BookList = () => {
	const [books, setBooks] = useState([]);
	const [method, setMethod] = useState("create");
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [isbn, setIsbn] = useState("");
	const [rating, setRating] = useState("");
	const [id, setId] = useState("");

	//http://localhost:8080/books
	const fetchBooks = async () => {
		const response = await axios.get("http://localhost:8080/books");
		setBooks(response.data);
	};

	const deleteBook = async (id) => {
		await axios.delete(`http://localhost:8080/book/${id}`);
		fetchBooks();
	};

	const updateBooks = async (id) => {
		await axios.put(`http://localhost:8080/book/${id}`, {
			title,
			author,
			isbn,
			rating,
		});
		fetchBooks();
		resetBook();
	};

	const createBooks = async () => {
		await axios.post("http://localhost:8080/book", {
			title,
			author,
			isbn,
			rating,
		});
		fetchBooks();
		resetBook();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (method === "create") {
			createBooks();
		} else {
			updateBooks(id);
		}
	};

	const resetBook = () => {
		setTitle("");
		setAuthor("");
		setIsbn("");
		setRating("");
		setId("");
	};

	useEffect(() => {
		fetchBooks();
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<Card>
						<Card.Header>
							<h3>Create Book</h3>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Title</Form.Label>
									<Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
								</Form.Group>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Author</Form.Label>
									<Form.Control type="text" placeholder="Enter Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
								</Form.Group>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>ISBN</Form.Label>
									<Form.Control type="text" placeholder="Enter ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
								</Form.Group>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Rating</Form.Label>
									<Form.Control type="text" placeholder="Enter Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
								</Form.Group>
								<Button variant="primary" type="submit" onClick={handleSubmit}>
									<FontAwesomeIcon icon={faSave} />
								</Button>
								<Button variant="primary" type="button" onClick={resetBook}>
									<FontAwesomeIcon icon={faRefresh} />
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</div>
				<div className="col-md-6">
					<Card>
						<Card.Header>
							<h3>Book List</h3>
						</Card.Header>
						<Card.Body>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Title</th>
										<th>Author</th>
										<th>ISBN</th>
										<th>Rating</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{books.map((book) => (
										<tr key={book.id}>
											<td>{book.title}</td>
											<td>{book.author}</td>
											<td>{book.isbn}</td>
											<td>{book.rating}</td>
											<td>
												<Button
													variant="primary"
													onClick={() => {
														setTitle(book.title);
														setAuthor(book.author);
														setIsbn(book.isbn);
														setRating(book.rating);
														setId(book.id);
														setMethod("update");
													}}
												>
													<FontAwesomeIcon icon={faEdit} />
												</Button>
												<Button
													variant="danger"
													onClick={() => {
														setId(book.id);
													}}
												>
													<FontAwesomeIcon icon={faTrash} onClick={() => deleteBook(book.id)} />
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default BookList;
