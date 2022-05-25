import React from 'react'

const NavbarComponent = ({ children }) => (
    <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <img id='logo_img' src='src/images/logo.png' alt='logo' />
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarTogglerDemo03' aria-controls='navbarTogglerDemo03' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon' />
            </button>
            <div className='collapse navbar-collapse' id='navbarTogglerDemo03'>
                <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                    {children}
                </ul>
            </div>
        </nav>
    </div>
)

export default NavbarComponent
