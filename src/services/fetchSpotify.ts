import { refreshAccessToken } from './refreshAccessToken';

export const fetchSpotifyWithRetry = async <T>({
  url,
  maxRetries = 4,
  retryDelay = 1000,
  method = 'GET',
  body,
}: {
  url: string;
  maxRetries?: number;
  retryDelay?: number;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}): Promise<T> => {
  let retries = 0;
  let response: Response | undefined;

  while (retries <= maxRetries) {
    try {
      return fetchSpotify<T>({
        url,
        body,
        method,
      });
    } catch (error) {
      console.error('Request failed:', error);
    }
    // If the response is a 429 error, wait for the specified retry delay or the value from the "Retry-After" header, if available
    const retryAfter = response?.headers.get('Retry-After');
    const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : retryDelay;
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    retries++;
    retryDelay *= 2; // Exponential backoff
  }
  throw new Error('Max retries reached. Request failed.');
};

const fetchSpotify = async <T>({
  url,
  body,
  method,
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
      method,
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseBody = await response.json();

    if (
      response.status === 401 &&
      (responseBody.error.message === 'The access token expired' ||
        responseBody.error.message === 'Invalid access token')
    ) {
      const { access_token, expires_in, scope, token_type } = await refreshAccessToken();
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('expires_in', expires_in);
      localStorage.setItem('scopes', scope.split(' ').join(','));
      localStorage.setItem('token_type', token_type);
      localStorage.setItem('now', new Date().toString());
    }

    return responseBody as T;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};
