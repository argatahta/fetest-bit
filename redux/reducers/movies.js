import { CLEAR_MOVIES, SAVE_MOVIES, SAVE_SEARCH_TEXT} from "../constants/types"

const INITIAL_STATE = {
  data:  [],
  search: "",
  page: 0,
  totalResult: 0
}

const moviesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_MOVIES:
            return {
                ...state,
                data: action.payload.data,
                page: parseInt(action.payload.page),
                totalResult: parseInt(action.payload.totalResult)
            }
        case SAVE_SEARCH_TEXT: 
            return {
                ...state,
                search: action.payload,
                page: 0
            }
        case CLEAR_MOVIES: 
        return {
            ...state,
            data: [],
            page: 0,
            totalResult: 0
        }
        default:
            return {
                ...state,
              }
    }
}

export default moviesReducer;