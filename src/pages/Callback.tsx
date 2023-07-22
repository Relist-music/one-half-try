import { useEffect } from 'react';

import { fetchSpotifyTokens } from '@/services/fetchSpotifyTokens';

const Callback = () => {
  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      console.log('tokens', accessToken, refreshToken);

      if (accessToken && refreshToken) {
        window.location.href = '/relist';
      } else {
        try {
          if (code) {
            await fetchSpotifyTokens(code).then(
              () => (window.location.href = '/relist'),
            );
          }
        } catch (e) {
          console.log('catch', e);
        }
      }
    })();
  }, []);
  return (
    <div>
      <h1>Callback</h1>
    </div>
  );
};

export default Callback;
