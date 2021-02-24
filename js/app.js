const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step)); // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from

let observer = new IntersectionObserver(handleIntersectionOfViewportWithSections, { threshold: range(0, 1, 0.10) });

/**
 * For dynamic building of navigation and related observations.
 */
function handleStructureChange() {
    resetNavigation();
    observer.disconnect()
    for (const element of getAllSections()) {
        observer.observe(element);
    }
}

function getAllSections() {
    return document.querySelectorAll("main > section");
}

/**
 * Generates new styled navigation and puts it in place of the old one.
 */
function resetNavigation() {
    let newNavigationList = generateListOfSectionLinks();
    let navigation = getNavBarList();
    navigation.innerHTML = "";
    navigation.appendChild(newNavigationList);
}

/**
 * Lookup element, where nevagiation takes place.
 */
function getNavBarList() {
    return document.getElementById("navbar__list");
}

/**
 * Generates new navigation based on existing sections.
 */
function generateListOfSectionLinks() {
    let sectionListItems = document.createDocumentFragment();
    for (const element of getAllSections()) {
        sectionListItems.appendChild(createNavigationElemForSection(element));
    }
    return sectionListItems;
}

/**
 * 
 * @param {*} sectionElement 
 * @return a styled navigation element for the sectionElement
 */
function createNavigationElemForSection(sectionElement) {
    let entry = document.createElement("li");
    let link = entry.appendChild(document.createElement("a"));
    link.setAttribute("href", `#${sectionElement.getAttribute("id")}`);
    link.textContent = sectionElement.getAttribute("data-nav");
    link.classList.add("menu__link");
    return entry;
}

/**
 * Handles observed intersection changes, especially for making styling changes.
 * @param {IntersectionObserverEntry[]} entries 
 */
function handleIntersectionOfViewportWithSections(entries) {
    let closestEntry = findClosestIntersectingEntryToViewPortTop(entries);
    if (closestEntry && isObservedIntersectionCloseEnoughToViewportTop(closestEntry)) {
        resetActiveSectionStates(closestEntry.target);
    }
}

/**
 * Since not all observed targets might have been captured as changed when observer was triggered, 
 * there's a threshold for a section to be at least 40% away from top to be considered the new active section. 
 * This fixes the problem of sections rapidly changing active class while scrolling. 
 *
 * This was happening because multiple observations with different targets were queued one after another and each
 * of the callbacks would always set the closest **observed** section intersecting as new active and another queued
 * callback would set the other one etc.
 * 
 * @param {IntersectionObserverEntry} entry
 */
function isObservedIntersectionCloseEnoughToViewportTop(entry) {
    return Math.abs(entry.boundingClientRect.y) < window.innerHeight * 0.4;
}

/**
 * For a specified newActiveSection makes appropriate styling changes.
 * @param {*} newActiveSection 
 */
function resetActiveSectionStates(newActiveSection) {
    resetSectionsStyles(newActiveSection);
    resetNavigationStyling(newActiveSection);
}

/**
 * Adds styling to activated section, removing it from non-active ones.
 * @param {*} newActiveSection 
 */
function resetSectionsStyles(newActiveSection) {
    for (const element of document.getElementsByClassName("your-active-class")) {
        if (element != newActiveSection) {
            element.classList.remove("your-active-class");
        }
    }
    newActiveSection.classList.add("your-active-class");
}

/**
 * Adds styling to navigation reference of activated section, removing it from non-active ones.
 * @param {*} newActiveSection 
 */
function resetNavigationStyling(newActiveSection) {
    let sectionId = newActiveSection.getAttribute("id");
    inactivateActiveNavigationLinkIfNotCurrent(sectionId);
    styleNavigationLinkOfActive(sectionId);
}

function inactivateActiveNavigationLinkIfNotCurrent(sectionId) {
    for (const element of document.getElementsByClassName("menu__link_active")) {
        if (!element.getAttribute("href").endsWith("#" + sectionId)) {
            element.classList.remove("menu__link_active");
        }
    }
}

function styleNavigationLinkOfActive(sectionId) {
    for (const link of document.getElementsByClassName("menu__link")) {
        if (link.getAttribute("href").endsWith("#" + sectionId)) {
            link.classList.add("menu__link_active");
        }
    }
}

/**
 * All observed intersections will have a different distance to viewport top. 
 * This finds the one that is currently closest AND was observed to have changed its intersection.
 * @param {IntersectionObserverEntry[]} entries
 * @returns {IntersectionObserverEntry} closest to the top of view port, null if none of the observed targets is intersecting with viewport anymore.
 */
function findClosestIntersectingEntryToViewPortTop(entries) {
    let closestEntry;
    let closestElementsDistanceFromTop = Number.MAX_VALUE;
    entries.forEach((entry) => {
        let entrysDistanceFromTop = Math.abs(entry.boundingClientRect.y);
        if (entry.isIntersecting && entrysDistanceFromTop < closestElementsDistanceFromTop) {
            closestElementsDistanceFromTop = entrysDistanceFromTop;
            closestEntry = entry;
        }
    });
    return closestEntry;
}

document.addEventListener('DOMContentLoaded', handleStructureChange());
new MutationObserver(() => handleStructureChange())
    .observe(document.querySelector("main"), { childList: true });

let navigationBar = getNavBarList();
navigationBar.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    document.querySelector(`section[data-nav='${event.target.innerText}']`).scrollIntoView();
})