'use client'

import { useEffect, useState } from "react";
import { getProfile } from "../api/spotify/profile/route";

type TokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export default function Callback() {

  const [responseData, setResponseData] = useState<TokenResponse>();

  useEffect(() => {

    const codeForTokenExchange = async (): Promise<void> => {

      
      const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
      const code: string | null = urlParams.get('code');      
      const codeVerifier: string | null = sessionStorage.getItem('spotify_code_verifier');

      console.log('code', code);
      console.log('codeVerifier', codeVerifier);
      
      if (!code || !codeVerifier) {
        console.error('Missing code or verifier');
        return;
      }

      try {
        const response: Response = await fetch('/api/spotify/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({code, codeVerifier}),
        }) 

        if (!response.ok) {
          throw new Error('Token exchange failed');
        }
        
        setResponseData( await response.json());
        
        if (responseData) {
          console.log('Spotify Token Response:', {
            access_token: responseData.access_token,
            refresh_token: responseData.refresh_token,
            expires_in: responseData.expires_in,
            scope: responseData.scope,
            token_type: responseData.token_type,
          });
  
          sessionStorage.setItem('access_token', responseData.access_token)
        }

      } catch (error) {
        console.log('OAuth callback erroror', error)
      }
    };

    codeForTokenExchange();
    getProfile(sessionStorage.getItem('access_token'));

  },[])

return (
  <div>
    <div className="flex justify-center h-[100px]r">
      <h1 className="text-4xl">
        Callback
      </h1>
    </div>
    <div className="my-5">
      {responseData ? <div>Access Token: {responseData.access_token}</div> : null}
    </div>
    <div className="mb-5">
      {responseData ? <div>Token Type: {responseData.token_type}</div> : null}
    </div>
    <div className="mb-5">
      {responseData ? <div>Expires In: {responseData.expires_in}</div> : null}
    </div>
    <div className="mb-5">
      {responseData ? <div>Scope: {responseData.scope}</div> : null}
    </div>
    <div className="mb-5">
      {responseData ? <div>Refresh Token: {responseData.refresh_token}</div> : null}
    </div>
  </div>
)

}