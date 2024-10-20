import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { to: "/", label: "Inicio" },
        { to: "/continent/Africa", label: "África" },
        { to: "/continent/Asia", label: "Asia" },
        { to: "/continent/Europe", label: "Europa" },
        { to: "/continent/Americas", label: "América" },
        { to: "/continent/Oceania", label: "Oceanía" },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-teal-900 p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/logo.webp" className="w-16" alt="Logo" />
                    <h1 className="text-xl font-bold ml-2">Consulta Poblacional Global</h1>
                </div>
                <button
                    onClick={toggleMenu}
                    className="block lg:hidden focus:outline-none text-white"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
                <ul className="hidden lg:flex lg:space-x-8 lg:items-center">
                    {navLinks.map((link) => (
                        <li key={link.to} className="py-2 px-4 lg:py-0 lg:px-0">
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    isActive ? "text-yellow-50 font-bold" : "hover:text-gray-300"
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <ul className={`w-full ${isMenuOpen ? 'block' : 'hidden'} lg:hidden flex flex-col items-center bg-teal-900`}>
                {navLinks.map((link) => (
                    <li key={link.to} className="py-2 border-b border-sky-500 w-full text-center">
                        <NavLink
                            to={link.to}
                            className={({ isActive }) =>
                                isActive ? "text-yellow-50 font-bold" : "hover:text-gray-300"
                            }
                        >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavigationBar;
