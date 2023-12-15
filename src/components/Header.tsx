"use client"

import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ThemeToggler } from './ThemeToggler'
import { useUser } from '@clerk/nextjs';

type Props = {}

const Header = (props: Props) => {
    const { isLoaded, user } = useUser();
    // console.log(isLoaded, user)
    return (
        <header className='flex items-center justify-between'>
            <Link href="/" className='flex items-center space-x-2 cursor-pointer'>
                <div className='bg-[#0160FE] w-fit'>
                    <Image
                        src='https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png'
                        alt='logo'
                        className='invert'
                        height={50}
                        width={50}
                    />
                </div>
                <h1 className='font-bold text-xl'>Dropbox</h1>
            </Link>

            <div className="px-5 flex space-x-2 items-center">
                <ThemeToggler />
                { user ? (
                    <UserButton afterSignOutUrl='/' />
                ) : (
                    <SignInButton afterSignInUrl='/dashboard' mode='modal' />
                )}
            </div>
        </header>
    )
}

export default Header