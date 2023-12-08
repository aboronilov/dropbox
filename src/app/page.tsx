import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="flex p-10 flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className='text-5xl font-bold'>
            Welcome to Dropbox
            <br/><br/>
            Storing everything for you and for your business needs. All in one place
          </h1>
          <p className='pb-20'>
            Enhance your personal storage with Dropbox, offering a simple and efficient way
            to upload, organize and access files from anywhere. Securely store importnant documents and media, and experience
            the conveniance of easy file management and sharing in one centralized solution.
          </p>
          <Link href='/dashboard' className='flex cursor-pointer bg-blue-500 p-5 w-fit hover:opacity-80 transition duration-300'>
            Try it for free!
            <ArrowRight className='ml-10'/>
          </Link>
        </div>
        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className='rounded-lg'>
            <source 
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <p className='text-center font-bold text-xl pt-5'>Disclaimer</p>
      <p className='text-center font-light p-2'>
        This site is made for informational purposes only. We do not own or affilate with Dropbox or/and any of its
        subsidairies in any form. Copyright disclaimer under section 107 of Copyright act 1976, allawance is made
        for fair use of this site for educational purposes
      </p>
    </main>
  )
}
