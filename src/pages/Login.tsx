import ConnectButton from '@/components/ConnectButton/ConnectButton';

import { scopes } from '@/constants/scopes';

import { css } from '@/styled-system/css';
import { Center, VStack } from '@/styled-system/jsx';

function ConnectWithSpotify() {
  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID ?? '';
  const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI ?? '';

  const url = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    client_id: String(client_id),
    redirect_uri: String(redirect_uri),
    scope: scopes.join(' '),
    response_type: 'code',
    show_dialog: String(true),
  }).toString()}`;

  console.log({ url });
  window.location.href = url;
}

const login = () => {
  return (
    <div>
      <Center
        className={css({
          bg: 'dark',
          marginTop: '10vh',
        })}
      >
        <VStack>
          <VStack gap={0.5}>
            <h1
              className={css({
                fontSize: '6xl',
                fontWeight: 'semibold',
              })}
            >
              Relist
            </h1>
            <p
              className={css({
                fontSize: 'xl',
              })}
            >
              Relist is a music client, that helps with recommandations and
              genres filtering
            </p>
          </VStack>
          <VStack>
            <ConnectButton
              label="Connect with Spotify"
              bgColor="#1DB954"
              onClick={ConnectWithSpotify}
            />
            <div title="not available for now">
              <ConnectButton
                label="Connect with Apple Music"
                bgColor="#F32239"
                disabled
              />
            </div>
          </VStack>
        </VStack>
      </Center>
    </div>
  );
};

export default login;
