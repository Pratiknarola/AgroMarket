import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";

// create a form with
// a text input for N with max value of 140
// a text input for P with max value of 140
// a text input for K with max value of 205
// a text input for temperature with max value of 50
// a text input for humidity with max value of 100
// a text input for rainfall with max value of 300
// a number input for ph with value between 0 and 14
// a button to submit the form which would send the data to the server
// with url : https://prediction-xipqzrlqna-el.a.run.app/crop

const SuggestionPage = ({ user }) => {
	const [suggestion, setSuggestion] = useState({
		N: "",
		P: "",
		K: "",
		temperature: "",
		humidity: "",
		rainfall: "",
		ph: "",
	});

	useEffect(() => {
		setSuggestion({
			N: "",
			P: "",
			K: "",
			temperature: "",
			humidity: "",
			rainfall: "",
			ph: "",
		});
	}, []);

	const [suggestionResult, setSuggestionResult] = useState("");

	const handleSubmit = (e) => {
		console.log("handle submit called");
		// check if any of the inputs are empty
		if (
			suggestion.N === "" ||
			suggestion.P === "" ||
			suggestion.K === "" ||
			suggestion.temperature === "" ||
			suggestion.humidity === "" ||
			suggestion.rainfall === "" ||
			suggestion.ph === ""
		) {
			alert("Please fill all the fields");
			return;
		}
		e.preventDefault();
		axios
			.post(
				"https://prediction-xipqzrlqna-el.a.run.app/crop",
				suggestion,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				console.log("request successful", res);
				// setSuggestionResult(res.data);
				localStorage.setItem("suggestionResult", res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const checkbound = (s, min, max) => {
		let num = parseFloat(s);
		if (isNaN(num)) {
			return false;
		} else if (num < min || num > max) {
			return false;
		} else {
			return true;
		}
	};

	const handleChange = (e) => {
		if (e.target.value === "") {
			setSuggestion({
				...suggestion,
				[e.target.name]: e.target.value,
			});
			return;
		}
		if (!isNaN(e.target.value)) {
			if (e.target.name === "ph") {
				if (checkbound(e.target.value, 0, 14)) {
					setSuggestion({
						...suggestion,
						[e.target.name]: e.target.value,
					});
				} else {
					alert("Please enter a value between 0 and 14");
					e.target.value = "";
					setSuggestion({
						...suggestion,
						[e.target.name]: "",
					});
				}
			} else if (e.target.name === "rainfall") {
				if (checkbound(e.target.value, 0, 300)) {
					setSuggestion({
						...suggestion,
						[e.target.name]: e.target.value,
					});
				} else {
					alert("Please enter a value between 0 and 300");
					e.target.value = "";
					setSuggestion({
						...suggestion,
						[e.target.name]: "",
					});
				}
			} else if (e.target.name === "temperature") {
				if (checkbound(e.target.value, 0, 50)) {
					setSuggestion({
						...suggestion,
						[e.target.name]: e.target.value,
					});
				} else {
					alert("Please enter a value between 0 and 50");
					e.target.value = "";
					setSuggestion({
						...suggestion,
						[e.target.name]: "",
					});
				}
			} else if (e.target.name === "humidity") {
				if (checkbound(e.target.value, 0, 100)) {
					setSuggestion({
						...suggestion,
						[e.target.name]: e.target.value,
					});
				} else {
					alert("Please enter a value between 0 and 100");
					e.target.value = "";
					setSuggestion({
						...suggestion,
						[e.target.name]: "",
					});
				}
			} else if (e.target.name === "N") {
				if (checkbound(e.target.value, 0, 140)) {
					setSuggestion({
						...suggestion,
						[e.target.name]: e.target.value,
					});
				} else {
					alert("Please enter a value between 0 and 140");
					e.target.value = "";
					setSuggestion({
						...suggestion,
						[e.target.name]: "",
					});
				}
			} else if (e.target.name === "P") {
				if (checkbound(e.target.value, 0, 140)) {
					setSuggestion({
						...suggestion,
						[e.target.name]: e.target.value,
					});
				} else {
					alert("Please enter a value between 0 and 140");
					e.target.value = "";
					setSuggestion({
						...suggestion,
						[e.target.name]: "",
					});
				}
			} else if (e.target.name === "K") {
				if (checkbound(e.target.value, 0, 205)) {
					setSuggestion({
						...suggestion,
						[e.target.name]: e.target.value,
					});
				} else {
					alert("Please enter a value between 0 and 205");
					e.target.value = "";
					setSuggestion({
						...suggestion,
						[e.target.name]: "",
					});
				}
			}
		}
	};

	return (
		<div style={containerstyle}>
            <style>
                {`
                    button:hover {
                        background-color: #38a3c7 !important;
                        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
                        cursor: pointer;
                    }
                `}
            </style>
			<h1> Suggestion Page </h1>{" "}
			<form style={formstyle}>
				<label style={labelstyle}>
					N:
					<input
						type="text"
						name="N"
						onChange={handleChange}
						value={suggestion.N}
                        style={inputstyle}
					/>{" "}
				</label>{" "}
				<label style={labelstyle}>
					P:
					<input
						type="text"
						name="P"
						onChange={handleChange}
						value={suggestion.P}
                        style={inputstyle}
					/>{" "}
				</label>{" "}
				<label style={labelstyle}>
					K:
					<input
						type="text"
						name="K"
						onChange={handleChange}
						value={suggestion.K}
                        style={inputstyle}
					/>{" "}
				</label>{" "}
				<label style={labelstyle}>
					Temperature:
					<input
						type="text"
						name="temperature"
						onChange={handleChange}
						value={suggestion.temperature}
                        style={inputstyle}
					/>{" "}
				</label>{" "}
				<label style={labelstyle}>
					Humidity:
					<input
						type="text"
						name="humidity"
						onChange={handleChange}
						value={suggestion.humidity}
                        style={inputstyle}
                        
					/>{" "}
				</label>{" "}
				<label style={labelstyle}>
					Rainfall:
					<input
						type="text"
						name="rainfall"
						onChange={handleChange}
						value={suggestion.rainfall}
                        style={inputstyle}
					/>{" "}
				</label>{" "}
				<label style={labelstyle}>
					PH:
					<input
						type="text"
						name="ph"
						onChange={handleChange}
						value={suggestion.ph}
                        style={inputstyle}
					/>{" "}
				</label>{" "}
				<button
					type="submit"
					onClick={handleSubmit}
					style={buttonstyle}
				>
					{" "}
					Submit{" "}
				</button>{" "}
			</form>{" "}
		</div>
	);
};

const containerstyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
	backgroundColor: "#f5f5f5",
};
const formstyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
	backgroundColor: "#f5f5f5",
};

const labelstyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
	backgroundColor: "#f5f5f5",
	padding: "10px",
};

const buttonstyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "#008CBA",
	color: "white",
	padding: "10px",
    fontSize: "20px",
    border: "none",

};

const inputstyle = {
    display: "flex",    
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "80%",
    backgroundColor: "#f5f5f5",
    padding: "10px",
    fontSize: "20px",
    borderRadius: "5px",
};
export default SuggestionPage;
