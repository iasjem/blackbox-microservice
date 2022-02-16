/** HTML ELEMENTS */
var componentTabContainer = document.getElementById('component_tab_container');
var componentsToggableTab = document.getElementById('components_toggable_tab');
var componentListTab = document.getElementById('component_list_tab');
var componentListCount = document.getElementById('component_list_count');
var toggleComponentHeader = document.querySelectorAll('.component-header');
var toggleComponentTabButton = document.getElementById('toggle_component_tab_button');
var searchKeywordTextField = document.getElementById('search_keyword_text_field');
var componentsToggableTabContainer = document.getElementById('components_toggable_tab_container');
var noResultsFoundContainer = document.getElementById('no_results_found_container');
var componentSearchListContainer = document.getElementById('component_search_list_container')
var canvasAreaContainer = document.getElementById('canvas_area_container');
var searchBarIcon = document.getElementById('search_bar_icon');
var saveProgressButton = document.getElementById('save_progress');
var clearCanvasButton = document.getElementById('clear_canvas');

/** INITIALIZERS */
var isSearching = false;
var searchResult = null;
var droppedComponents = [];

/** CONSTANTS */
var componentsList = {
    'DEFAULT': [
        {
            _id: 1,
            type: 'START_COMPONENT',
            name: 'Start',
            description: 'Start Workflow',
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"play\" class=\"svg-inline--fa fa-play fa-w-14 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"> \
                            <path fill=\"currentColor\" d=\"M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z\"></path> \
                        </svg>',
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
            type: 'END_COMPONENT',
            name: 'End',
            description: 'End Workflow',
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"stop\" class=\"svg-inline--fa fa-stop fa-w-14 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"> \
                        <path fill=\"currentColor\" d=\"M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z\"></path> \
                    </svg>',
            properties: {
                startingComponent: false,
                calledOnce: true,
                connectedAfter: false,
                connectedBefore: true,
                canBeReplaced: false
            }
        }
    ],
    'FLIGHT_BOOKING': [
        {
            _id: 1,
            type: 'ACCESS_HOME_PAGE_COMPONENT',
            name: 'Access Home',
            description: 'Access Home Page',
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"home\" class=\"svg-inline--fa fa-home fa-w-18 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"> \
                        <path fill=\"currentColor\" d=\"M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z\"></path> \
                    </svg>',
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
            type: 'SEARCH_FLIGHT_ONEWAY_COMPONENT',
            name: 'Search Flight',
            description: 'Search Flight (One-way)',
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"plane\" class=\"svg-inline--fa fa-plane fa-w-18 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"> \
                            <path fill=\"currentColor\" d=\"M480 192H365.71L260.61 8.06A16.014 16.014 0 0 0 246.71 0h-65.5c-10.63 0-18.3 10.17-15.38 20.39L214.86 192H112l-43.2-57.6c-3.02-4.03-7.77-6.4-12.8-6.4H16.01C5.6 128-2.04 137.78.49 147.88L32 256 .49 364.12C-2.04 374.22 5.6 384 16.01 384H56c5.04 0 9.78-2.37 12.8-6.4L112 320h102.86l-49.03 171.6c-2.92 10.22 4.75 20.4 15.38 20.4h65.5c5.74 0 11.04-3.08 13.89-8.06L365.71 320H480c35.35 0 96-28.65 96-64s-60.65-64-96-64z\"></path> \
                        </svg>',
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
            type: 'SELECT_FLIGHT_ONEWAY_COMPONENT',
            name: 'Select Flight',
            description: 'Select Flight (One-way)',
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"plane\" class=\"svg-inline--fa fa-plane fa-w-18 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"> \
                            <path fill=\"currentColor\" d=\"M480 192H365.71L260.61 8.06A16.014 16.014 0 0 0 246.71 0h-65.5c-10.63 0-18.3 10.17-15.38 20.39L214.86 192H112l-43.2-57.6c-3.02-4.03-7.77-6.4-12.8-6.4H16.01C5.6 128-2.04 137.78.49 147.88L32 256 .49 364.12C-2.04 374.22 5.6 384 16.01 384H56c5.04 0 9.78-2.37 12.8-6.4L112 320h102.86l-49.03 171.6c-2.92 10.22 4.75 20.4 15.38 20.4h65.5c5.74 0 11.04-3.08 13.89-8.06L365.71 320H480c35.35 0 96-28.65 96-64s-60.65-64-96-64z\"></path> \
                        </svg>',
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
            type: 'SELECT_BUNDLES_GO_BASIC_COMPONENT',
            name: 'Select Bundles',
            description: 'Select Bundles (GO BASIC)',
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"gift\" class=\"svg-inline--fa fa-gift fa-w-16 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"> \
                            <path fill=\"currentColor\" d=\"M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z\"></path> \
                        </svg>',
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
            type: 'REVIEW_FLIGHTS_COMPONENT',
            name: 'Review Flights',
            description: 'Review Flights',
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"plane\" class=\"svg-inline--fa fa-plane fa-w-18 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"> \
                            <path fill=\"currentColor\" d=\"M480 192H365.71L260.61 8.06A16.014 16.014 0 0 0 246.71 0h-65.5c-10.63 0-18.3 10.17-15.38 20.39L214.86 192H112l-43.2-57.6c-3.02-4.03-7.77-6.4-12.8-6.4H16.01C5.6 128-2.04 137.78.49 147.88L32 256 .49 364.12C-2.04 374.22 5.6 384 16.01 384H56c5.04 0 9.78-2.37 12.8-6.4L112 320h102.86l-49.03 171.6c-2.92 10.22 4.75 20.4 15.38 20.4h65.5c5.74 0 11.04-3.08 13.89-8.06L365.71 320H480c35.35 0 96-28.65 96-64s-60.65-64-96-64z\"></path> \
                        </svg>',
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
            type: 'VIEW_GUEST_DETAILS_COMPONENT',
            name: 'Guest Details',
            description: 'View Guest Details',
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"passport\" class=\"svg-inline--fa fa-passport fa-w-14 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"> \
                            <path fill=\"currentColor\" d=\"M129.62 176h39.09c1.49-27.03 6.54-51.35 14.21-70.41-27.71 13.24-48.02 39.19-53.3 70.41zm0 32c5.29 31.22 25.59 57.17 53.3 70.41-7.68-19.06-12.72-43.38-14.21-70.41h-39.09zM224 286.69c7.69-7.45 20.77-34.42 23.43-78.69h-46.87c2.67 44.26 15.75 71.24 23.44 78.69zM200.57 176h46.87c-2.66-44.26-15.74-71.24-23.43-78.69-7.7 7.45-20.78 34.43-23.44 78.69zm64.51 102.41c27.71-13.24 48.02-39.19 53.3-70.41h-39.09c-1.49 27.03-6.53 51.35-14.21 70.41zM416 0H64C28.65 0 0 28.65 0 64v384c0 35.35 28.65 64 64 64h352c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32zm-80 416H112c-8.8 0-16-7.2-16-16s7.2-16 16-16h224c8.8 0 16 7.2 16 16s-7.2 16-16 16zm-112-96c-70.69 0-128-57.31-128-128S153.31 64 224 64s128 57.31 128 128-57.31 128-128 128zm41.08-214.41c7.68 19.06 12.72 43.38 14.21 70.41h39.09c-5.28-31.22-25.59-57.17-53.3-70.41z\"></path> \
                        </svg>',
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
            type: 'SELECT_ADDONS_COMPONENT',
            name: 'Select Add-ons',
            description: 'Select Add-ons',
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"plus\" class=\"svg-inline--fa fa-plus fa-w-14 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"> \
                            <path fill=\"currentColor\" d=\"M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z\"></path> \
                        </svg>',
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
            type: 'VIEW_BOOKING_RECAP_COMPONENT',
            name: 'Booking Recap',
            description: 'View Booking Recap',
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"passport\" class=\"svg-inline--fa fa-passport fa-w-14 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg" viewBox=\"0 0 448 512\"> \
                            <path fill=\"currentColor\" d=\"M129.62 176h39.09c1.49-27.03 6.54-51.35 14.21-70.41-27.71 13.24-48.02 39.19-53.3 70.41zm0 32c5.29 31.22 25.59 57.17 53.3 70.41-7.68-19.06-12.72-43.38-14.21-70.41h-39.09zM224 286.69c7.69-7.45 20.77-34.42 23.43-78.69h-46.87c2.67 44.26 15.75 71.24 23.44 78.69zM200.57 176h46.87c-2.66-44.26-15.74-71.24-23.43-78.69-7.7 7.45-20.78 34.43-23.44 78.69zm64.51 102.41c27.71-13.24 48.02-39.19 53.3-70.41h-39.09c-1.49 27.03-6.53 51.35-14.21 70.41zM416 0H64C28.65 0 0 28.65 0 64v384c0 35.35 28.65 64 64 64h352c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32zm-80 416H112c-8.8 0-16-7.2-16-16s7.2-16 16-16h224c8.8 0 16 7.2 16 16s-7.2 16-16 16zm-112-96c-70.69 0-128-57.31-128-128S153.31 64 224 64s128 57.31 128 128-57.31 128-128 128zm41.08-214.41c7.68 19.06 12.72 43.38 14.21 70.41h39.09c-5.28-31.22-25.59-57.17-53.3-70.41z\"></path> \
                        </svg>',
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
            type: 'PAYMENT_WITH_PAYMAYA_COMPONENT',
            name: 'Payment',
            description: "Payment with PayMaya",
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"credit-card\" class=\"svg-inline--fa fa-credit-card fa-w-18 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"> \
                            <path fill=\"currentColor\" d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z\"></path> \
                        </svg>',
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
            type: 'CONFIRM_PAYMENT_WITH_PAYMAYA_COMPONENT',
            name: 'Confirm Payment',
            description: "Confirm Payment with PayMaya",
            logoName: '<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"credit-card\" class=\"svg-inline--fa fa-credit-card fa-w-18 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"> \
                            <path fill=\"currentColor\" d=\"M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z\"></path> \
                        </svg>',
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
if (!Array.prototype.flatMap) {
    function flatMap (f, ctx) {
      return this.reduce
        ( (r, x, i, a) =>
            r.concat(f.call(ctx, x, i, a))
        , []
        )
    }
    Array.prototype.flatMap = flatMap
  }

function uuidv4 () {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, function (c) {
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
}

function findIndexFromArrayById (id, arr) {
    return arr.findIndex(component => component._id === id);
}

function moveInArray (arr, from, to) {
    var item = arr.splice(from, 1);
    arr.splice(to, 0, item[0]);
}

function loadDroppedComponentsList (arr) {
    var targetComponent = arr.map(function (component, index) {
        var spaceBetweenComponents = index * 150;
        var arrowPositionBetweenComponents = index > 1 ? index * 80 + (index * 70 - 70) : index * 80;

        return '<div class="target-component-container with-component" id="' + component._id + '" style="top: calc(15% + ' + spaceBetweenComponents + 'px);" title="' + component.type + '" draggable="true" ondragstart="dragDroppedComponent(event)" ondragover="allowDropSource(event)" ondrop=\"dropToAnotherComponent(event)\"> \
                    <div role="target" class="target-component"> \
                        ' + component.logoName + ' \
                        <span class="label">' + component.name + '</span> \
                    </div> \
                    ' + (component.properties.connectedAfter ? '' : '<div class="whitespace"></div>') + '</div>'
                    + (index > 0 ? '<div class="target-component-arrow-down" style="top: calc(14.8% + ' + arrowPositionBetweenComponents + 'px);"> \
                    <div class="line"></div> \
                    <div class="triangle"></div> \
                </div>' : '')}).join("\n");

    var emptyTargetComponent = arr[arr.length - 1].properties.connectedAfter ? 
                                '<div class="target-component-container" style="top: calc(15% + ' + arr.length * 150 + 'px" ondrop="dropToCanvas(event)" ondragover="allowDropSource(event)"> \
                                        <div role="target" class="target-component-empty"> \
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> \
                                            <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path> \
                                            </svg> \
                                        </div> \
                                        <div class="whitespace"></div> \
                                    </div>' : '';

    return targetComponent + emptyTargetComponent;
}

function loadEmptyCanvas () {
    return '<div class=\"target-component-container\" ondrop=\"dropToCanvas(event)\" ondragover=\"allowDropSource(event)\"> \
                <div role=\"target" class="target-component-empty\"> \
                    <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"plus\" class=\"svg-inline--fa fa-plus fa-w-14 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"> \
                    <path fill=\"currentColor\" d=\"M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z\"></path> \
                    </svg> \
                </div> \
            </div>';
}

function loadComponentsListTab () {
    var component = Object.keys(componentsList).map(function (list) {
        var componentListCount = '<span class\="component-count\" id=\"component_list_count\">' + componentsList[list].length + '</span>';
        var components = componentsList[list].map(function (component, i) {
                                                    return '<div class=\"draggable-source-component\" id=\"' + component.type + '\" role="source\" draggable=\"true\" ondragstart=\"dragSource(event)\" title=\"' + component.description + '\"> \
                                                            ' + component.logoName + '<span class=\"label\">' + component.name + '</span> \
                                                        </div>';
                                                }).join("\n");

            return '<div class=\"components-toggable-tab\" id=\"components_toggable_tab\"> \
                        <div class=\"component-header\" id=\"toggle_component_header_' + list + '\"> \
                            <span class=\"component-label\">' + list + '</span> \
                            <div class=\"component-control\"> \
                                <span class=\"component-count\" id=\"component_list_count\">' + componentListCount + '</span> \
                                <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"chevron-right\" class=\"svg-inline--fa fa-chevron-right fa-w-10 \" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\"> \
                                    <path fill=\"currentColor\" d=\"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z\"></path> \
                                </svg> \
                            </div> \
                        </div> \
                        <div class=\"component-content show-components-list toggle_component_header_' + list + '\"> ' + components + ' </div> \
                    </div>';
    }).join("\n"); 

    return '<div class=\"components-toggable-tab\" id=\"components_toggable_tab\">' + component + '</div>';
}

function searchComponentByKeyword (keyword) {
    return Object.keys(componentsList).flatMap(function (list) {
                return [].concat(componentsList[list]);
            }).filter(function (component) {
                return new RegExp(keyword, 'gi').test(component.name) === true;
            });
}

function allowDropSource (e) {
    e.preventDefault();
}
  
function dragSource (e) {
    e.dataTransfer.setData('source_component', e.target.id);
}

function dragDroppedComponent (e) {
    e.dataTransfer.setData('dropped_component', e.target.id);
}
    
function dropToCanvas (e) {    
    e.preventDefault();

    var droppedComponent = Object.keys(componentsList).flatMap(function (list) {
                return [].concat(componentsList[list]);
            }).filter(function (component) {
                return component.type === e.dataTransfer.getData('source_component');
            })[0];

    if ((droppedComponent.properties.startingComponent && droppedComponents.length < 1) || (!droppedComponent.properties.startingComponent && droppedComponents.length > 0)) {
        droppedComponent._id = uuidv4();

        droppedComponents.push(droppedComponent);

        canvasAreaContainer.innerHTML = loadDroppedComponentsList(droppedComponents);
    } else {
        alert('Workflow must begin with a START component when there are no other components inside the canvas.');
    }
}

function dropToAnotherComponent (e) {
    var componentInPosition = e.currentTarget.id;
    var componentInPositionIndex = findIndexFromArrayById(componentInPosition, droppedComponents);
    var componentInPositionProperties = droppedComponents[componentInPositionIndex].properties;
    var componentInPositionSortable = componentInPositionProperties.connectedAfter && componentInPositionProperties.connectedBefore;

    var selectedComponent = e.dataTransfer.getData('dropped_component');
    var selectedComponentIndex = findIndexFromArrayById(selectedComponent, droppedComponents);
    var selectedComponentProperties = droppedComponents[selectedComponentIndex].properties;
    var selectedComponentSortable = selectedComponentProperties.connectedAfter && selectedComponentProperties.connectedBefore;
    
    if (componentInPositionSortable && selectedComponentSortable) {
        moveInArray(droppedComponents, selectedComponentIndex, componentInPositionIndex);
        canvasAreaContainer.innerHTML = loadDroppedComponentsList(droppedComponents);
    } else {
        alert('Cannot sort START/END components inside the canvas.');
    }
}

/** EVENT LISTENERS */
searchKeywordTextField.addEventListener('keyup', function (e) {
    var value = e.target.value;

    searchResult = searchComponentByKeyword(value);

    isSearching = value && value.length > 0 ? true : false;

    function reset () {
        isSearching = false;
        searchResult = null;
        componentsToggableTabContainer.style.display = 'block';
        componentSearchListContainer.style.display = 'none';
        searchBarIcon.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> \
                                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path> \
                                    </svg>';
    }

    if (!isSearching) {
        reset();
    } else {
        componentsToggableTabContainer.style.display = 'none';
        componentSearchListContainer.style.display = 'block';
        searchBarIcon.innerHTML = '<svg id="clear_search_icon" style="cursor:pointer;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"> \
                                        <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path> \
                                    </svg>';

        if (searchResult && searchResult.length > 0) {
            noResultsFoundContainer.style.display = 'none';
            componentSearchListContainer.innerHTML = '<div class="component-content show-components-list">'
                                                             + searchResult.map(function (component) {
                                                                return '<div class="draggable-source-component" id="' + component.type + '" role="source" draggable="true" ondragstart="dragSource(event)" title="' + component.description + '"> \
                                                                            ' + component.logoName + ' <span class="label">' + component.name + '</span>\
                                                                        </div>';
                                                             }).join("\n") + '</div>';
        } else {
            componentSearchListContainer.innerHTML = '<div className="no-results-found-container" id="no_results_found_container" style="text-align: center; padding: 32px 16px;"> \
                                                            No Results found. \
                                                        </div>'; 
        }

        document.getElementById('clear_search_icon').addEventListener('click', function (e) {
            searchKeywordTextField.value = '';
            reset();
        });
    }
});

toggleComponentTabButton.addEventListener('click', function (e) {
    if (componentTabContainer.classList.contains('show-components-tab')) {
        componentTabContainer.classList.remove('show-components-tab');
        canvasAreaContainer.classList.add('canvas-area-container-wide');
    } else {
        componentTabContainer.classList.add('show-components-tab');
        canvasAreaContainer.classList.remove('canvas-area-container-wide');
    }
});

saveProgressButton.addEventListener('click', function (e) {
    if (confirm('Are you sure you want to save your progress?')) {
        localStorage.setItem('blackbox_progress', JSON.stringify(droppedComponents, null, 2)); // Save to localstorage
    }
});

clearCanvasButton.addEventListener('click', function (e) {
    if (confirm('Are you sure you want to clear canvas?')) {
        localStorage.removeItem('blackbox_progress'); // Remove from localstorage

        droppedComponents = [];

        canvasAreaContainer.innerHTML = loadEmptyCanvas();
    }
});

/** PAGE LOAD INITIALIZATION */
document.addEventListener('DOMContentLoaded', function() {
    var currentProgress = JSON.parse(localStorage.getItem("blackbox_progress")); // get saved progress from localstorage

    componentsToggableTabContainer.innerHTML = loadComponentsListTab();

    if (currentProgress && currentProgress.length > 0) {
        droppedComponents = currentProgress;

        canvasAreaContainer.innerHTML = loadDroppedComponentsList(droppedComponents);
    } else {
        canvasAreaContainer.innerHTML = loadEmptyCanvas();
    }
});