import { CLEAR_MOVIES, SAVE_MOVIES, SAVE_SEARCH_TEXT } from "../constants/types";

export const saveMovies = ( {data = [], page=1,totalResult }) => ({
    type: SAVE_MOVIES,
    payload: {
        data,
        page,
        totalResult
    }
})

export const saveSearch = (txt) => ({
    type: SAVE_SEARCH_TEXT,
    payload: txt
})

export const clearMovie = () => ({
    type: CLEAR_MOVIES
})
