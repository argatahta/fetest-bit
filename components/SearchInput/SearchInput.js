import React from 'react'

function SearchInput({
    onChange = () => { },
    value,
    placeholder = "Search Movie",
    id = "search",
    onSearchClick = () => { },
    classContainer,
    classInput
}) {
    return (
        <form onSubmit={onSearchClick} className={`flex flex-row bg-white rounded-md border border-gray-200 w-screen max-w-xs sm:max-w-lg ${classContainer}`}>
            <input
                type='text'
                id={id}
                name={id}
                placeholder={placeholder}
                className={`px-4 py-2 outline-none w-full text-black ${classInput}`}
                value={value}
                onChange={onChange}
            />
            <button type="submit" onClick={onSearchClick} className="px-5 outline-none focus:outline-none">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="gray">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </form>
    )
}

export default SearchInput