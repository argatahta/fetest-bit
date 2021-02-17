import React from "react";

function Header({ children }) {
    return (
        <div className="fixed bg-yellow-300 text-white px-4 py-4 font-bold flex flex-row justify-between sm:justify-center w-full">
        {children}
        </div>
    )
}

export default Header