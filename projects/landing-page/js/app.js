const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step)); // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
let observer = new IntersectionObserver(handleIntersectionOfViewportWithSections, { threshold: range(0, 1, 0.10) });

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

function resetNavigation() {
    let newNavigationList = generateListOfSectionLinks();
    let navigation = getNavBarList();
    navigation.innerHTML = "";
    navigation.appendChild(newNavigationList);
}

function getNavBarList() {
    return document.getElementById("navbar__list");
}

function generateListOfSectionLinks() {
    let sectionListItems = document.createDocumentFragment();
    for (const element of getAllSections()) {
        sectionListItems.appendChild(createNavigationElemForSection(element));
    }
    return sectionListItems;
}

function createNavigationElemForSection(element) {
    let entry = document.createElement("li");
    let link = entry.appendChild(document.createElement("a"));
    link.setAttribute("href", `#${element.getAttribute("id")}`);
    link.textContent = element.getAttribute("data-nav");
    link.classList.add("menu__link");
    return entry;
}

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
    return getAbsoluteDistanceFromTopOfViewport(entry) < window.innerHeight * 0.4;
}

function resetActiveSectionStates(newActiveSection) {
    resetSectionsStyles(newActiveSection);
    resetNavigationStyling(newActiveSection);
}

function resetSectionsStyles(newActiveSection){
    for (const element of document.getElementsByClassName("your-active-class")) {
        if (element != newActiveSection) {
            element.classList.remove("your-active-class");
        }
    }
    newActiveSection.classList.add("your-active-class");
}

function resetNavigationStyling(newActiveSection) {
    let sectionId = newActiveSection.getAttribute("id");
    inactivateActiveNavigationLinkIfNotCurrent(sectionId);
    styleNavigationLinkOfActive(sectionId);
}

function inactivateActiveNavigationLinkIfNotCurrent(sectionId){
    for (const element of document.getElementsByClassName("menu__link_active")) {
        if (!element.getAttribute("href").endsWith("#" + sectionId)) {
            element.classList.remove("menu__link_active");
        }
    }
}

function styleNavigationLinkOfActive(sectionId) {
    for (const link of document.getElementsByClassName("menu__link")){
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
        let entrysDistanceFromTop = getAbsoluteDistanceFromTopOfViewport(entry);
        if (entry.isIntersecting && entrysDistanceFromTop < closestElementsDistanceFromTop) {
            closestElementsDistanceFromTop = entrysDistanceFromTop;
            closestEntry = entry;
        }
    });
    return closestEntry;
}

function getAbsoluteDistanceFromTopOfViewport(entry) {
    return Math.abs(entry.boundingClientRect.y)
}

document.addEventListener('DOMContentLoaded', handleStructureChange());
new MutationObserver(() => handleStructureChange())
    .observe(document.querySelector("main"), { childList: true });