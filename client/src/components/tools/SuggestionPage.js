import React from "react";
import { useEffect, useState } from "react";
import Center from "react-center";
import Spinner from "react-spinkit";

import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

// create a form with
// a text input for N with max value of 140
// a text input for P with max value of 140
// a text input for K with max value of 205
// a text input for temperature with max value of 50
// a text input for humidity with max value of 100
// a text input for rainfall with max value of 300
// a number input for ph with value between 0 and 14
// a button to submit the form which would send the data to the server
// with url : https://mlagrohelp-xipqzrlqna-el.a.run.app/crop

// create a react component which will display the result recieved from the server
// it should be a modal which will display the result
// it should have a button which will close the modal
// it will show the result below suggestion page
// it should use bootstrap classes
// it should show the entered value and the result recieved from the server
// it should also show the error message if any
// it should also show the success message if the suggestion is successful
// it should also show the loading message if the server is processing the request
// it should also show the error message if the server is not responding

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

	const [loading, setLoading] = useState(false);

	const handleClose = () => {
		setSuggestion({
			N: "",
			P: "",
			K: "",
			temperature: "",
			humidity: "",
			rainfall: "",
			ph: "",
		});
	};

	const handlePredictClose = () => {
		setSuggestionResult(null)
	}


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

	const [suggestionResult, setSuggestionResult] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		
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
		setLoading(true);
		axios
			.post(
				"https://mlagrohelp-xipqzrlqna-el.a.run.app/crop",
				suggestion,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				console.log("request successful", res.data);
				setSuggestionResult(res.data);
				setLoading(false);
				localStorage.setItem("suggestionResult", res.data);
			})
			.catch((err) => {
				setLoading(false);
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
		loading ? (
			// put this div in center
			<Center>
				<Spinner animation="border" variant="primary" />
			</Center>
			
		) : (
		suggestionResult == "" || suggestionResult == null || suggestionResult == undefined ? 
		<div className="container" style={{ border: "1.5px solid black", marginTop:"15vh" }}>
			<div className="row">
				<div className="col-md-12">
					<div className="card m-5" style={{ border: "1.5px solid darkgreen" }}>
						<div className="card-header">
							<h3 style={{ color: "darkgreen" }}>
								<i className="fas fa-leaf"></i>
								<strong>Crop Suggestion</strong>
							</h3>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											pH
										</label>
										<input
											type="number"
											className="form-control"
											name="ph"
											value={suggestion.ph}
											onChange={handleChange}
											style={{ border: "1.5px solid black" }}
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											Temperature
										</label>
										<input
											type="number"
											className="form-control"
											name="temperature"
											value={suggestion.temperature}
											onChange={handleChange}
											style={{ border: "1.5px solid black" }}
										/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											Humidity
										</label>
										<input
											type="number"
											className="form-control"
											name="humidity"
											value={suggestion.humidity}
											onChange={handleChange}
											style={{ border: "1.5px solid black" }}
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											N (Nitrogen)
										</label>
										<input
											type="number"
											className="form-control"
											name="N"
											value={suggestion.N}
											onChange={handleChange}
											style={{ border: "1.5px solid black" }}
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											P (Phosphorus)
										</label>
										<input
											type="number"
											className="form-control"
											name="P"
											value={suggestion.P}
											onChange={handleChange}
											style={{ border: "1.5px solid black" }}
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											Rainfall
										</label>
										<input
											type="number"
											className="form-control"
											name="rainfall"
											value={suggestion.rainfall}
											onChange={handleChange}
											style={{ border: "1.5px solid black" }}
										/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											K (Potassium)
										</label>
										<input
											type="number"
											className="form-control"
											name="K"
											value={suggestion.K}
											onChange={handleChange}
											style={{ border: "1.5px solid black" }}
										/>
									</div>
								</div>
							</div>
							<div className="row">
								
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
								onClick={handleClose}
							>
								Clear All
							</button>
							<button
								type="submit"
								className="btn btn-primary"
								onClick={handleSubmit}
							>
								Suggest
							</button>
						</div>
					</div>
				</div>
			</div>
		</div> 
		: 
		// {/* if suggestion result is not empty, we will show the suggestion result along with input values from suggestion state */}
		<div className="container m-5">
			<div className="row">
				<div className="col-md-12">
					<div className="card m-5">
						<div className="card-header">
							<h3>
								<i className="fas fa-leaf"></i>
								Crop Suggestion Result
							</h3>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											pH
										</label>
										<h4>{suggestion.ph}</h4>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											Temperature
										</label>
										<h4>{suggestion.temperature}</h4>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											Humidity
										</label>
										<h4>{suggestion.humidity}</h4>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											N (Nitrogen)
										</label>
										<h4>{suggestion.N}</h4>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											P (Phosphorus)
										</label>
										<h4>{suggestion.P}</h4>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											Rainfall
										</label>
										<h4>{suggestion.rainfall}</h4>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											K (Potassium)
										</label>
										<h4>{suggestion.K}</h4>
									</div>
								</div>
							</div>
						
							<br/>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group p-2">
										<label style={{color: "darkblue"}}>
											<i className="fas fa-leaf"></i>
											Suggested Crop
										</label>
										<h2>{suggestionResult.crop}</h2>
									</div>
								</div>
							</div>
						</div>

						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
								onClick={handlePredictClose}
							>
								Close
							</button>
							
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	);
							
};

// a circular loading indicator




export default SuggestionPage;


