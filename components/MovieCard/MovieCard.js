import React from 'react'

function MovieCard({
    onImageClick=()=>{},
    onMovieClick=()=>{},
    imageUrl="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title="Untitled Movie",
    years
}) {
    return (
        <div className="flex flex-row my-5 bg-gray-100 w-full max-w-lg shadow-md rounded-2xl">
            <img alt={title} onClick={()=> onImageClick(imageUrl)} className="flex h-auto w-4/12 rounded-tl-lg rounded-bl-lg mt-0 mr-10 cursor-pointer" src={imageUrl} />
            <a onClick={onMovieClick} className="flex self-center text-2xl cursor-pointer w-8/12 p-5 h-44 items-center text-gray-800 overflow-auto">{title} {years ? `(${years})` : ""}</a>
        </div>
    )
}

export default MovieCard