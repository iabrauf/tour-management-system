'use client'
import React from 'react'
import Image from 'next/image'
import logo from '../assets/logo.jpg'
import userImage from '../assets/user.svg'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NavBar = () => {
    const pathname = usePathname();
    return (
        <>
            {pathname !== "/login" && pathname !== "/register" && (
                < div className="navbar fixed top-0 shadow-md bg-gray-200 md:px-5 z-50">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <Link href="/" className='mr-5'><li>Home</li></Link>
                                <Link href="#" className='mr-5'><li>Tours</li></Link>
                                <Link href="#" className='mr-5'><li>Manage Tours</li></Link>
                                <Link href="/users" className='mr-5'><li>Users</li></Link>
                                <Link href="/contact-us" className='mr-5'><li>Cantact Us</li></Link>
                            </ul>
                        </div>
                        <Image
                            src={logo}
                            width={150}
                            height={150}
                            alt='logo'
                        />
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <Link href="/" className='mr-5'><li>Home</li></Link>
                            <Link href="/tours" className='mr-5'><li>Tours</li></Link>
                            <Link href="#" className='mr-5'><li>Manage Tours</li></Link>
                            <Link href="/users" className='mr-5'><li>Users</li></Link>
                            <Link href="/contact-us" className='mr-5'><li>Cantact Us</li></Link>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <Image
                                        src={userImage}
                                        width={24}
                                        height={24}
                                        alt='user image'
                                    >

                                    </Image>
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><Link href={'/logout'}>Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}

export default NavBar