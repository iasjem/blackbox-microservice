/** HTML ELEMENTS */
const componentTabContainer = document.getElementById('component_tab_container');
const componentsToggableTab = document.getElementById('components_toggable_tab');
const componentListTab = document.getElementById('component_list_tab');
const componentListCount = document.getElementById('component_list_count');
const toggleComponentHeader = document.querySelectorAll('.component-header');
const toggleComponentTabButton = document.getElementById('toggle_component_tab_button');
const searchKeywordTextField = document.getElementById('search_keyword_text_field');
const componentsToggableTabContainer = document.getElementById('components_toggable_tab_container');
const noResultsFoundContainer = document.getElementById('no_results_found_container');
const componentSearchListContainer = document.getElementById('component_search_list_container')
const canvasAreaContainer = document.getElementById('canvas_area_container');
const searchBarIcon = document.getElementById('search_bar_icon');

/** INITIALIZERS */
let isSearching = false;
let searchResult = null;

/** CONSTANTS */
const componentsList = {
    "DEFAULT": [
        {
            _id: 1,
            type: "START_COMPONENT",
            name: "Start",
            description: "Start Workflow",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                        </svg>`,
            properties: {
                startingComponent: true,
                calledOnce: true,
                connectedAfter: true,
                connectedBefore: false,
                canBeReplaced: false
            }
        },
        {
            _id: 2,
            type: "END_COMPONENT",
            name: "End",
            description: "End Workflow",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>`,
            properties: {
                startingComponent: false,
                calledOnce: true,
                connectedAfter: false,
                connectedBefore: true,
                canBeReplaced: false
            }
        }
    ],
    "FLIGHT_BOOKING": [
        {
            _id: 1,
            type: "ACCESS_HOME_PAGE_COMPONENT",
            name: "Access Home",
            description: "Access Home Page",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                        </svg>`,
            properties: {
                startingComponent: false,
                calledOnce: false,
                connectedAfter: true,
                connectedBefore: true,
                canBeReplaced: true
            }
        },
        {
            _id: 2,
            type: "SEARCH_FLIGHT_ONEWAY_COMPONENT",
            name: "Search Flight",
            description: "Search Flight (One-way)",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>`,
            properties: {
                startingComponent: false,
                calledOnce: false,
                connectedAfter: true,
                connectedBefore: true,
                canBeReplaced: true
            }
        },
        {
            _id: 3,
            type: "SELECT_FLIGHT_ONEWAY_COMPONENT",
            name: "Select Flight",
            description: "Select Flight (One-way)",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>`,
            properties: {
                startingComponent: false,
                calledOnce: false,
                connectedAfter: true,
                connectedBefore: true,
                canBeReplaced: true
            }
        },
        {
            _id: 4,
            type: "SELECT_BUNDLES_GO_BASIC_COMPONENT",
            name: "Select Bundles",
            description: "Select Bundles (GO BASIC)",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>`,
            properties: {
                startingComponent: false,
                calledOnce: false,
                connectedAfter: true,
                connectedBefore: true,
                canBeReplaced: true
            }
        },
        {
            _id: 5,
            type: "REVIEW_FLIGHTS_COMPONENT",
            name: "Review Flights",
            description: "Review Flights",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>`,
            properties: {
                startingComponent: false,
                calledOnce: false,
                connectedAfter: true,
                connectedBefore: true,
                canBeReplaced: true
            }
        },
        {
            _id: 6,
            type: "VIEW_GUEST_DETAILS_COMPONENT",
            name: "Guest Details",
            description: "View Guest Details",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>`,
            properties: {
                startingComponent: false,
                calledOnce: false,
                connectedAfter: true,
                connectedBefore: true,
                canBeReplaced: true
            }
        },
        {
            _id: 7,
            type: "SELECT_ADDONS_COMPONENT",
            name: "Select Add-ons",
            description: "Select Add-ons",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>`,
            properties: {
                startingComponent: false,
                calledOnce: false,
                connectedAfter: true,
                connectedBefore: true,
                canBeReplaced: true
            }
        },
        {
            _id: 8,
            type: "VIEW_BOOKING_RECAP_COMPONENT",
            name: "Booking Recap",
            description: "View Booking Recap",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>`,
            properties: {
                startingComponent: false,
                calledOnce: false,
                connectedAfter: true,
                connectedBefore: true,
                canBeReplaced: true
            }
        },
        {
            _id: 9,
            type: "PAYMENT_WITH_PAYMAYA_COMPONENT",
            name: "Payment",
            description: "Payment with PayMaya",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>`,
            properties: {
                startingComponent: false,
                calledOnce: false,
                connectedAfter: true,
                connectedBefore: true,
                canBeReplaced: true
            }
        },
        {
            _id: 10,
            type: "CONFIRM_PAYMENT_WITH_PAYMAYA_COMPONENT",
            name: "Confirm Payment",
            description: "Confirm Payment with PayMaya",
            logoName: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>`,
            properties: {
                startingComponent: false,
                calledOnce: false,
                connectedAfter: true,
                connectedBefore: true,
                canBeReplaced: true
            }
        }
    ]
};

/** FUNCTIONS */
const searchComponentByKeyword = (keyword) => {
    return Object.keys(componentsList).flatMap(list => [...componentsList[list]]).filter(component => new RegExp(`${keyword}`, 'gi').test(component.name) === true);
}

/** EVENT LISTENERS */
searchKeywordTextField.addEventListener('keyup', e => {
    let value = e.target.value;

    searchResult = searchComponentByKeyword(value);

    isSearching = value && value.length > 0 ? true : false;

    const reset = () => {
        isSearching = false;
        searchResult = null;
        componentsToggableTabContainer.style.display = "block";
        componentSearchListContainer.style.display = "none";
        searchBarIcon.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                </svg>`;
    }

    if (!isSearching) {
        reset();
    } else {
        componentsToggableTabContainer.style.display = "none";
        componentSearchListContainer.style.display = "block";
        searchBarIcon.innerHTML = `<svg id="clear_search_icon" style="cursor:pointer;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                                        <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                    </svg>`;

        if (searchResult && searchResult.length > 0) {
            noResultsFoundContainer.style.display = "none";
            componentSearchListContainer.innerHTML = `<div class="component-content show-components-list">
                                                        ${
                                                            searchResult.map(component => (`<div class="draggable-source-component" role="source" draggable="true">
                                                                                                ${component.logoName}
                                                                                                <span class="label">${component.name}</span>
                                                                                            </div>`)).join("\n")
                                                        }
                                                    </div>`;
        } else {
            componentSearchListContainer.innerHTML = `<div className="no-results-found-container" id="no_results_found_container" style="text-align: center; padding: 32px 16px;">
                                                        No Results found.
                                                    </div>`;
        }

        document.getElementById('clear_search_icon').addEventListener('click', e => {
            searchKeywordTextField.value = "";
            reset();
        });
    }
});

toggleComponentTabButton.addEventListener('click', e => {
    if (componentTabContainer.classList.contains('show-components-tab')) {
        componentTabContainer.classList.remove('show-components-tab');
        canvasAreaContainer.classList.add('canvas-area-container-wide');
    } else {
        componentTabContainer.classList.add('show-components-tab');
        canvasAreaContainer.classList.remove('canvas-area-container-wide');
    }
});

/** PAGE LOAD INITIALIZATION */
document.addEventListener("DOMContentLoaded", function() {
    componentsToggableTabContainer.innerHTML = `<div class="components-toggable-tab" id="components_toggable_tab">
                                                    ${ Object.keys(componentsList).map(list => `<div class="components-toggable-tab" id="components_toggable_tab">
                                                        <div class="component-header" id="toggle_component_header_${list}">
                                                            <span class="component-label">${list}</span>
                                                            <div class="component-control">
                                                                <span class="component-count" id="component_list_count">${componentsList[list].length}</span>
                                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                                    <path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div class="component-content show-components-list toggle_component_header_${list}">
                                                        ${componentsList[list].map(component => `<div class="draggable-source-component" role="source" draggable="true" title="${component.description}">
                                                                                                        ${component.logoName}
                                                                                                        <span class="label">${component.name}</span>
                                                                                                    </div>`).join("\n")}
                                                            </div>
                                                        </div>`).join("\n") }
                                                </div>`;
    canvasAreaContainer.innerHTML = `<div class="target-component-container">
                                        <div role="target" class="target-component-empty">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                            </svg>
                                        </div>
                                    </div>`;
});