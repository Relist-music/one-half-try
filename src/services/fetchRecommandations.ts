import { fetchSpotifyWithRetry } from './fetchSpotify';

interface RecommandationSeeds {
  seed_artists: string;
  seed_genres: string;
  seed_tracks: string;
}

// export function validateRecommandationsCoreValues({
//   artistList,
//   genreList,
//   trackList,
// }: {
//   artistList: string[];
//   genreList: string[];
//   trackList: string[];
// }) {
//   const [artistListLength, genreListLength, trackListLength] = [
//     artistList.length,
//     genreList.length,
//     trackList.length,
//   ];

//   const sum = artistListLength + genreListLength + trackListLength;

//   if (sum < 1) {
//     throw new Error('At least one seed is required');
//   } else if (sum > 5) {
//     throw new Error('A maximum of 5 seeds is allowed');
//   } else {
//     return {
//       seed_artists: artistList.join(','),
//       seed_genres: genreList.join(','),
//       seed_tracks: trackList.join(','),
//     };
//   }
// }

export const fetchRecommandations = async ({
  seed_artists,
  seed_genres,
  seed_tracks,
}: RecommandationSeeds & {
  limit?: number;
}) => {
  const recommendationsUrl = `https://api.spotify.com/v1/recommendations?${new URLSearchParams({
    seed_artists,
    seed_genres,
    seed_tracks,
  })}`;

  const data = await fetchSpotifyWithRetry<SpotifyApi.RecommendationsFromSeedsResponse>({
    url: recommendationsUrl,
  });

  return data;
};

export default fetchRecommandations;
