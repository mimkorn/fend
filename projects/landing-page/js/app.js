/**
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

function generateListOfSectionLinks() {
    let sectionListItems = document.createDocumentFragment();
    for (const element of getAllSections()) {
        let entry = document.createElement("li");
        sectionListItems.appendChild(entry);
        let link = entry.appendChild(document.createElement("a"));
        link.setAttribute("href", `#${element.getAttribute("id")}`);
        link.textContent = element.getAttribute("data-nav");
    }
    return sectionListItems;
}

function resetNavigation() {
    let newNavigationList = generateListOfSectionLinks();
    let navigation = getNavBarList();
    navigation.innerHTML = "";
    navigation.appendChild(newNavigationList);
    console.log("dlkjf");
}

function handleStructureChange() {
    resetNavigation();
    for (const element of getAllSections()) {
        observer.observe(element);
    }
}

function getNavBarList() {
    return document.getElementById("navbar__list");
}

function getAllSections() {
    return document.querySelectorAll("main > section");
}

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step)); // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from

let options = {
    threshold: range(0, 1, 0.10)
}

let observer = new IntersectionObserver(handleSectionViewportIntersect, options);

document.addEventListener('DOMContentLoaded', handleStructureChange());
new MutationObserver(() => handleStructureChange())
    .observe(document.querySelector("main"), { childList: true });

function handleSectionViewportIntersect(entries, observer) {
    let closestElement;
    let closestElementsDistanceFromTop = Number.MAX_VALUE;
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            let entrysDistanceFromTop = entry.boundingClientRect.y;
            if (Math.abs(entrysDistanceFromTop) < closestElementsDistanceFromTop) {
                closestElementsDistanceFromTop = entrysDistanceFromTop;
                closestElement = entry.target;
            }
        }
    });
    for (const element of document.getElementsByClassName("your-active-class")){
        if (closestElement && element != closestElement) {
            element.classList.toggle("your-active-class");
            closestElement.classList.toggle("your-active-class");
        }   
    }
}



// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


