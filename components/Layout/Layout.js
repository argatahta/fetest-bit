import React from "react";

function Layout({ children, className }) {
    return (
        <div className={`container mx-auto min-h-screen min-w-full sm:flex sm:flex-col ${className}`}>
            {children}
        </div>
    )
}

export default Layout