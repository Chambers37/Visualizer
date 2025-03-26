'use client'

import { startSpotifyAuth } from "@/app/lib/spotify"

export default function LoginPage() {

    return (
      <div>
        <button onClick={startSpotifyAuth}
        className="bg-[rgb(29,180,82)] hover:bg-[rgb(27,163,74)] rounded-full text-xl font-bold py-2 px-4"
        >
          Sign in with Spotify
        </button>
      </div>
    )
}