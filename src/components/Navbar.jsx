'use client'

import Image from "next/image"
import { PiShoppingCartDuotone } from "react-icons/pi";
import { useState, useEffect } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingBar from "react-top-loading-bar";


const Navbar = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const [progress, setProgress] = useState(0);


    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/login');
    };


    return (
        <>
            <LoadingBar
                color="#f11946"
                progress={progress}
                waitingTime={3000}
                onLoaderFinished={() => setProgress(0)}
            />

            <main className="flex flex-col md:flex-row justify-between items-center h-16 md:h-16 text-black px-4 bg-white shadow-md w-full fixed top-0 z-50">
                {/* Top Row - Logo & Toggle */}
                <div className="flex flex-row justify-between items-center w-full md:w-auto">
                    <Link href="/" onClick={() => setProgress(100)}>
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-24 md:w-32 lg:w-40 h-auto"
                        />
                    </Link>

                    {/* Search */}
                    <div className="w-full md:w-auto mt- md:mt-0">
                        <input
                            type="text"
                            placeholder="Search"
                            name="search"
                            className="w-full md:w-64 border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-green-500"
                        />
                    </div>

                    <button
                        className="md:hidden text-xl text-green-700 ml-4"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <HiX size={35} /> : <HiOutlineMenu size={35} />}
                    </button>
                </div>

                {/* Middle Row - Navigation + Search + Cart */}
                <section
                    className={`w-full  md:flex  flex-col bg-gray-50 md:bg-white md:flex-row justify-between items-center gap-4 transition-all duration-300 ease-in-out 
          ${menuOpen ? "flex" : "hidden"} md:!flex`}
                >

                    {/* Navigation Links */}
                    <ul className="flex flex-col md:flex-row gap-4 text-lg mt-4 md:mt-0 md:ml-6">
                        <li className="text-green-500 hover:text-green-800 transition duration-300 flex items-center justify-center cursor-pointer relative group">
                            <Link href="Electronics" onClick={() => setProgress(100)} className="flex items-center gap-1">
                                <span>Electronics</span>
                                <RiArrowDropDownLine size={25} className="block group-hover:hidden" />
                                <RiArrowDropUpLine size={25} className="hidden group-hover:block" />
                            </Link>
                            <div className="hidden group-hover:block absolute -top-1 left-0 w-60 bg-white shadow-lg rounded-md">
                                <ul className="absolute top-8 left-0 bg-white shadow-lg rounded-md">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Laptops">Laptops</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Mobile_Phones">Mobile Phones</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Tablets">Tablets</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="text-green-600 hover:text-green-900 transition duration-300 flex items-center justify-center cursor-pointer relative group">
                            <Link onClick={() => setProgress(100)} href="/House_Appliances" className="flex items-center gap-1">
                                House Appliances
                                <RiArrowDropDownLine size={25} className="block group-hover:hidden" />
                                <RiArrowDropUpLine size={25} className="hidden group-hover:block" />
                            </Link>
                            <div className="hidden group-hover:block absolute -top-1 left-0 w-60 bg-white shadow-lg rounded-md">
                                <ul className="absolute top-8 left-0 bg-white shadow-lg rounded-md">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Refrigerators">Refrigerators</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Washing_Machines">Washing Machines</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Air_Conditioners">Air Conditioners</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Microwaves_Ovens">Microwaves Ovens</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Fans">Fans</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="text-green-600 hover:text-green-900 transition duration-300 flex items-center justify-center cursor-pointer relative group">
                            <Link onClick={() => setProgress(100)} href="/Furniture" className="flex items-center gap-1">
                                Furniture
                                <RiArrowDropDownLine size={25} className="block group-hover:hidden" />
                                <RiArrowDropUpLine size={25} className="hidden group-hover:block" />
                            </Link>
                            <div className="hidden group-hover:block absolute -top-1 left-0 w-60 bg-white shadow-lg rounded-md">
                                <ul className="absolute top-8 left-0 bg-white shadow-lg rounded-md">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Sofas">Sofas</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Beds">Beds</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Chairs">Chairs</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Tables">Tables</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Cabinets">Cabinets</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <Link onClick={() => setProgress(100)} href="/Desks">Desks</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>


                    {/* Cart + Login */}
                    <div className="flex flex-row gap-4 items-center m-4 md:m-0  ">
                        <Link href="/cart" onClick={() => setProgress(100)}>
                            <PiShoppingCartDuotone color="#01531FFF" size={30} />
                        </Link>
                        {session ?
                            <Link onClick={() => setProgress(100)} href="/profile" className="flex flex-row gap-2 items-center cursor-pointer">
                                <h1 className="text-xl font-bold text-emerald-700">Profile</h1>
                                <Image
                                    src="/images/user.png"
                                    alt="userLogo"
                                    width={28}
                                    height={28}
                                />
                            </Link>
                            :
                            <Link href="/login">
                                <button className="bg-emerald-600 hover:bg-emerald-900 text-white font-semibold py-1 px-4 rounded-sm shadow-md transition duration-300 cursor-pointer">
                                    Login
                                </button></Link>}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Navbar;
