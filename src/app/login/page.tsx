'use client'

import { startSpotifyAuth } from "@/app/lib/spotify"
import Link from "next/link"

export default function LoginPage() {

    return (
      <div>
        <div className="flex justify-center mt-10">
          <button onClick={startSpotifyAuth}
          className="bg-[rgb(29,180,82)] hover:bg-[rgb(27,163,74)] rounded-full text-xl font-bold py-2 px-4"
          >
            Sign in with Spotify
          </button>
        </div>
        <div className='flex justify-center mt-7'>
          <div className=' text-3xl bg-blue-500 rounded-full w-[200px] text-center '>
            <Link  href='/'>
              Home
            </Link>
          </div> 
        </div>
      </div>
    )
}