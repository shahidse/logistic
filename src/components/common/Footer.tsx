import React from 'react'

function Footer() {
    return (
        <footer className="flex justify-center bg-foreground items-center text-lightText h-10">
            &copy; Copyright @{new Date().getFullYear()} | By <a href="#" className='text-surface font-bold ml-1'>Shahid</a>
        </footer>
    )
}

export default Footer
