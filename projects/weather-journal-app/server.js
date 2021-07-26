"use strict";
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
const listeningSuccess = () => {
	console.log(`Aaah! I'm alive on ${port}`);
};
const server = app.listen(port, listeningSuccess);

// posting data to endpoint
app.post("/add-weather", (req, res) => {
	if (req.body.message) {
		console.log(req.body.message);
		res.send({ msg: req.body.message });
	} else if (req.body.id) {
		console.log(
			`Server: Hello from ${req.body.name}, ${req.body.sys.country}!` // 4 DEBUGAAA
		);

		projectData = {
			name: `Hello from ${req.body.name}, ${req.body.sys.country}`,
			forecast: `${Math.ceil(req.body.main.temp - 273.15)} °C, with ${
				req.body.weather[0].description
			}`
		};
		
		res.send({
			msg: "Data recieved",
			dataId: req.body.id
		});
		console.log(projectData); // 4DEBUGAAA
	} else {
		res.send({ msg: "alien witchcraft exists" });
	}
});

// getting data from the endpoint
app.get("/get-weather", (req, res) => {
	res.send(projectData);
});
