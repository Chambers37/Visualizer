import { startSpotifyAuth } from "@/app/lib/spotify"

export default function LoginPage() {

    return (
      <div>
        <h1>Login with Spotify</h1>
        <button onClick={startSpotifyAuth}>Login</button>
      </div>
    )
}