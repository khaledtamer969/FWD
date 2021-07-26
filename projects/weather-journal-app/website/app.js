/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=78857c9b274884e72a9434418cabc940";
const zipInput = document.getElementById("zip");
const dateCard = document.getElementById("date");
const tempCard = document.getElementById("temp");
const contentCard = document.getElementById("content");
const entryTitle = document.getElementsByClassName("title")[0];

/* Helper functions */

// Get weather data from Open Weather API
const getWeather = async (baseURL, zipInput, apiKey) => {
	let res = await fetch(baseURL + zipInput + apiKey);
	try {
		const data = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

// Post received data to our express server
const postData = async (url = "", data = {}) => {
	const response = await fetch(url, {
		method: "Post",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
	//in case of error
	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log("error", error);
	}
};

// Update UI with weather data, today's date and user feelings
const updateUI = async url => {
	let res = await fetch(url);
	try {
		res = await res.json();
		entryTitle.innerHTML = `${res.name}`;
		tempCard.innerHTML = `It's <span class="generated-data">${res.forecast}</span>`;
		dateCard.innerHTML = `On <span class="generated-data">${makeDate()}</span>`;
		const feelings = document.getElementById("feelings").value;
		if (feelings.length) {
			contentCard.innerHTML = `And you feel <span class="generated-data">${feelings}</span>`;
		} else {
			contentCard.innerHTML = "";
		}
	} catch (err) {
		console.error(err);
	}
};

// Create a new date instance dynamically with JS
const makeDate = () => {
	let d = new Date();
	return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
};

function performAction() {
	const zipcode = zipInput.value;

	getWeather(baseURL, zipcode, apiKey)
		.then(data => postData("/add-weather", data))
		.then(res => {
			console.log(res.msg); // 4DEBUGAAA

			if (res.msg === "Data recieved") {
				console.log(`with ID: ${res.dataId}`);
				updateUI("/get-weather");
			} else {
				entryTitle.innerHTML = res.msg;
				tempCard.innerHTML = "";
				dateCard.innerHTML = "";
				contentCard.innerHTML = "";
			}
		});
}

// Event listeners to generate data
document.getElementById("generate").addEventListener("click", performAction);
zipInput.addEventListener("keyup", evt => {
	if (evt.key === "Enter") {
		performAction();
	}
});
