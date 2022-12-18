//Reducer for character information Initialize State

const initState = {
    ad_type: "",
    med_type: "",
    channel: "",
    seldate: "",
    downVURL: "Empty",
    downAURL: "Empty",
    channelList: ["Empty"]
}

//Define Actions
const synthReducer = (state = initState, action) => {
    switch (action.type) {
        //Change character name
        case 'CHANGE_ADTYPE':
            return {
                ...state,
                ad_type: action.payload,
                downVURL: "Empty",
                downAURL: "Empty",
                channel: "Empty"
            }

        case 'CHANGE_MEDTYPE':
            return {
                ...state,
                med_type: action.payload,
                downVURL: "Empty",
                downAURL: "Empty",
                channel: "Empty"
            }
        case 'CHANGE_CHANNEL':
            return {
                ...state,
                channel: action.payload,
                downVURL: "Empty",
                downAURL: "Empty"
            }
        case 'CHANGE_DATE':
            return {
                ...state,
                seldate: action.payload,
                downVURL: "Empty",
                downAURL: "Empty"
            }
        case 'DOWN_FILE_VURL':
            return {
                ...state,
                downVURL: action.payload
            }
        case 'DOWN_FILE_AURL':
            return {
                ...state,
                downAURL: action.payload
            }
        case 'CHANGE_CHANNELLIST':
            return {
                ...state,
                channelList: action.payload,
                channel: "Empty",
                downVURL: "Empty",
                downAURL: "Empty"
            }
        default:
            return state
    }
}

export default synthReducer;