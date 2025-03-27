'use client'

import { useEffect } from "react";

export default function Callback() {

  useEffect(() => {

    const codeForTokenExchange = async (): Promise<void> => {

      
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');      
      const codeVerifier = sessionStorage.getItem('spotify_code_verifier');

      console.log('code', code);
      console.log('codeVerifier', codeVerifier);
      
      if (!code || !codeVerifier) {
        console.error('Missing code or verifier');
        return;
      }

      try {
        const response = await fetch('api/spotify/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'appilication/json'
          },
          body: JSON.stringify({code, codeVerifier}),
        }) 

        if (!response.ok) {
          throw new Error('Token exchange failed');
        }
        
        const data = await response.json();
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