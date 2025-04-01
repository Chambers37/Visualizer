import { useState, useEffect } from "react";
import useSpotifyWebPlaybackSdk from "use-spotify-web-playback-sdk";



export default function Webplayback() {

  useEffect(() => {

    const script: HTMLScriptElement = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

    }

  })

  return (
    <div>
      <div>

      </div>
    </div>
  )
}