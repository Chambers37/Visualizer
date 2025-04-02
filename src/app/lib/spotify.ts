import { generateRandomString, sha256, base64encode } from './pkce'

export const startSpotifyAuth = async (): Promise<void> => {

  const codeVerifier: string = generateRandomString(64);
  sessionStorage.setItem('spotify_code_verifier', codeVerifier);

  const hashed: ArrayBuffer = await sha256(codeVerifier);
  const codeChallenge: string = base64encode(hashed);

  const clientId: string = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const redirectUrl: string = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL!;

  const scope: string = 'user-read-private user-read-email user-library-read playlist-read-private streaming user-read-playback-state user-modify-playback-state';
  const authUrl: URL = new URL('https://accounts.spotify.com/authorize');

  const params: Record<string, string> = {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUrl,
  }

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}3