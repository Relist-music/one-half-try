export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token') ?? '';
  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        btoa(
          `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
            import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
          }`,
        ),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
  }).then((data) => data.json());
};
