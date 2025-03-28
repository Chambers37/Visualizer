'use client'

import { useEffect } from "react";

export default function Callback() {

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
        
        const data: {
          access_token: string;
          refresh_token: string;
          expires_in: number;
          scope: string;
          token_type: string;
        } = await response.json();
        
        console.log('Access token:', data.access_token);  

      } catch (error) {
        console.log('OAuth callback erroror', error)
      }
    };

    codeForTokenExchange();

  },[])

return (
  <div>
    Callback
  </div>
)

}