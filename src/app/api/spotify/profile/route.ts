
export async function getProfile(accessToken: string | null) {
  // const accessToken: string | null = sessionStorage.getItem('access_token');

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  console.log('data', data)
}