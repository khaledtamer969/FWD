/**
 *
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const contentSections = document.getElementsByTagName("section");
const navBarList = document.getElementById("navbar__list");
//define a NavBar list array to access the li elements in the ul tag
const navBarListArray = document.getElementById("navbar__list").childNodes;
// need to declare a sidebar constant and a header to toggle classes to nav the responsive effect with the hamburger menu
const sideBar = document.querySelector(".hamburger-menu");
const header = document.querySelector(".page__header");
// get the Y corrdinates in the page of all sections in an array
const arrayOfYCorrdinates = [];
let activeSection;
let activeSectionIndex;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const navBar = () => {
	for (let section of contentSections) {
		let li = section.attributes["data-nav"].nodeValue;

		navBarList.innerHTML += `<li><a href="" class="menu__link">${li}</a></li>`;
		// get our sections pageYOffset values
		arrayOfYCorrdinates.push(section.offsetTop);
	}
	// set our first li item active
	navBarList.childNodes[0].classList.add("active-nav");
};
navBar();

/**
 * End Main Functions
 * Begin Events
 *
 */

// track the window YOffset to detect the active section

window.addEventListener("scroll", e => {
	// check if we reached the first section
	if (arrayOfYCorrdinates && window.pageYOffset >= arrayOfYCorrdinates[0]) {
		// loop through just our sections pageYOffset values to detect the active section
		arrayOfYCorrdinates.map((value, index) => {
			// 150 to avoid changing active class when we just hit the last few px of the section
			if (value <= window.pageYOffset + 150) {
				activeSection = contentSections[index];
				// define
				activeSectionIndex = index;
			}
		});

		// check if our active class is already in our active section classList
		if (activeSection.classList.contains("your-active-class")) {
			return;
		} else {
			// remove our active class from all sections
			for (let section of contentSections) {
				section.classList.remove("your-active-class");
			}
			// remove our active class from all nav li
			for (let li of navBarListArray) {
				li.classList.remove("active-nav");
			}
			// add our active class to only our active section
			activeSection.classList.add("your-active-class");
			// add our active class to only our active nav li
			navBarListArray[activeSectionIndex].classList.add("active-nav");
		}
	}
});

// show side menu
sideBar.addEventListener("click", e => {
	header.classList.toggle("slide-out");
});

// Scroll to section on link click
navBarList.addEventListener("click", e => {
	// prevent a(href) default behaviour
	e.preventDefault();
	// to see the elements inside the navBarListArray;

	for (let section of contentSections) {
		if (e.target.outerText == section.attributes["data-nav"].nodeValue) {
			window.scrollTo({
				top: section.offsetTop,
				left: section.offsetLeft,
				behavior: "smooth"
			});
		}
	}
});
