import axios from "axios";

import { CoreEndpoint } from "./endpoints";

const getMovies = ({ filter, page}) => new Promise((resolve, reject) => {
    return axios.get(`${CoreEndpoint}&s=${filter}&page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            const result = response?.data
            resolve({
                meta: {
                    status: "success",
                    error: '',
                },
                data: result || [],
            })
        })
        .catch(error => {
            const errorData = error?.response?.data ?? {}
            reject(errorData)
        })
});

const getMovieDetail = (id) => new Promise((resolve, reject) => {
    return axios.get(`${CoreEndpoint}&i=${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            const result = response?.data
            resolve({
                meta: {
                    status: "success",
                    error: '',
                },
                data: result || [],
            })
        })
        .catch(error => {
            const errorData = error?.response?.data ?? {}
            reject(errorData)
        })
});

export default {
    getMovies,
    getMovieDetail
}