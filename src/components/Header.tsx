import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
    return (
        <header className='flex items-center justify-between'>
            <Link href="/" className='flex items-center space-x-2'>
                <div className='bg-[#0160FE] w-fit'>
                    <Image
                        src='https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png'
                        alt='logo'
                        className='invert'
                        height={50}
                        width={50}
                    />
                </div>
            </Link>

            <div className="px-5 flex space-x-2 items-center">
                {/* Theme toggle */}
                <UserButton afterSignOutUrl='/'/>
                <SignedOut>
                    <SignInButton afterSignInUrl='/dashboard' mode='modal'/>
                </SignedOut>
            </div>
        </header>
    )
}

export default Header