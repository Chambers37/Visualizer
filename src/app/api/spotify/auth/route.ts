import { NextResponse, NextRequest } from "next/server";

type TokenRequestBody = {
  code: string;
  codeVerifier: string;
};

type TokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}


export async function POST(req: NextRequest): Promise<NextResponse> {

  try {
    const { code, codeVerifier }: TokenRequestBody = await req.json();
    const clientId: string = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const redirectUri: string = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL!;

    const body: URLSearchParams = new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });

    const spotifyResponse: Response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!spotifyResponse.ok) {
      const errorText: string = await spotifyResponse.text();
      return NextResponse.json(
        {error: 'Token exchange failed', details: errorText },
        { status: 400 },
      );
    };

    const tokenData: TokenResponse = await spotifyResponse.json();
    return NextResponse.json(tokenData);
  } catch (error: unknown) {
      console.error('Token exchange error:', error);
      return NextResponse.json({ error: 'Unexpected error during token exchange' }, { status: 500 });
  }

}