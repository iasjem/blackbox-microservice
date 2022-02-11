/** HTML ELEMENTS */
const componentTabContainer = document.getElementById('component_tab_container');
const componentListTab = document.getElementById('component_list_tab');
const componentListCount = document.getElementById('component_list_count');
const toggleComponentHeader = document.getElementById('toggle_component_header');
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
const componentsList = [
    {
        _id: 1,
        type: "START_COMPONENT",
        name: "Start",
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
];

/** FUNCTIONS */
const searchComponentByKeyword = (keyword) => {
    return componentsList.filter(component => new RegExp(`${keyword}`, 'gi').test(component.name) === true);
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

toggleComponentHeader.addEventListener('click', e => {
    if (componentListTab.classList.contains('show-components-list')) {
        componentListTab.classList.remove('show-components-list');
    } else {
        componentListTab.classList.add('show-components-list');
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
    componentListCount.innerHTML = componentsList ? componentsList.length : 0;
    componentListTab.innerHTML = componentsList.map(component => (`<div  class="draggable-source-component" role="source" draggable="true" style="opacity: 1;">
                                                                        ${component.logoName}
                                                                        <span class="label">${component.name}</span>
                                                                    </div>`)).join("\n");
});