import React from "react";
import logo from "./library-books.jpg";

const Header = () => {
	return (
		<header className="row">
			<div className="col-md-5">
				<img src={logo} className="logo" alt="logo" height="100px" width="1600px" />
			</div>

			<div className="col-md-7 mt-5 subtitle"
			style={{ fontSize: "20px", fontStyle: "italic", textTransform: "uppercase", textShadow: "1px 1px 1px black", color : "white" }}>Library Management System</div>
		</header>
	);
};

export default Header;
