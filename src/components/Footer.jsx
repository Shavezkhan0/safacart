'use client'

import Image from 'next/image'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-green-100 text-green-900 px-4 sm:px-6 pt-4 pb-2">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo & Slogan */}
                <div className="flex flex-row md:flex-col items-center gap-4">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={80}
                        height={80}
                    />
                    <p className="text-sm">Sustainable products for a greener tomorrow. 🌍</p>
                </div>


                {/* Quick Links */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-700">Shop</a></li>
                        <li><a href="#" className="hover:text-green-700">About Us</a></li>
                        <li><a href="#" className="hover:text-green-700">My Account</a></li>
                        <li><a href="#" className="hover:text-green-700">FAQ</a></li>
                    </ul>
                </div>

                {/* Subscribe & Social */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                    <p className="text-sm mb-3">Get eco-friendly updates & offers</p>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="px-3 py-2 border border-green-300 rounded-t-md sm:rounded-l-md sm:rounded-tr-none w-full focus:outline-none"
                        />
                        <button className="bg-green-900 text-white px-4 py-2 rounded-b-md sm:rounded-r-md sm:rounded-bl-none hover:bg-green-800 mt-2 sm:mt-0">
                            Subscribe
                        </button>
                    </div>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Connect With Us</h3>
                    <div className="flex justify-center md:justify-start space-x-4 text-xl mt-2">
                        <a href="#" className="text-green-900 hover:text-green-600">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="text-green-900 hover:text-green-600">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center mt-8 border-t border-green-300 pt-2 text-sm">
                ©2025 EcoShop. Built for a better planet. 🌿
            </div>
        </footer>
    )
}

export default Footer
