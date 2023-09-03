import { useQuery } from '@tanstack/react-query';

import { refreshAccessToken } from '@/services/refreshAccessToken';

const useArtists = ({ artistIds }: { artistIds: string[] }) => {
  const url = `https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`;

  return useQuery<SpotifyApi.MultipleArtistsResponse>({
    queryKey: ['artists', [...artistIds].join(',')],
    queryFn: async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        });

        const body = await response.json();

        if (
          response.status === 401 &&
          (body.error.message === 'The access token expired' ||
            body.error.message === 'Invalid access token')
        ) {
          const { access_token, expires_in, scope, token_type } = await refreshAccessToken();
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('expires_in', expires_in);
          localStorage.setItem('scopes', scope.split(' ').join(','));
          localStorage.setItem('token_type', token_type);
          localStorage.setItem('now', new Date().toString());
        }
        if (response.status !== 429) {
          // If the response is not a 429 error, return the response
          return body;
        }
      } catch (error) {
        console.error('Request failed:', error);
      }
    },
  });
};

export default useArtists;
