import { ReactNode, createContext, useEffect, useState } from 'react';

import useArtists from '@/hooks/useArtists';

export type PlaylistContextProps = {
  tracks: SpotifyApi.TrackObjectFull[];
  setTracks: React.Dispatch<React.SetStateAction<SpotifyApi.TrackObjectFull[]>>;
  artists: SpotifyApi.ArtistObjectFull[];
  setArtists: React.Dispatch<React.SetStateAction<SpotifyApi.ArtistObjectFull[]>>;
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

export const PlaylistContext = createContext<PlaylistContextProps>({
  tracks: [],
  setTracks: () => undefined,
  artists: [],
  setArtists: () => undefined,
  filters: [],
  setFilters: () => undefined,
});

const PlaylistContextProvider = ({ children }: { children: ReactNode }) => {
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    tracks.map((track) => {
      useArtists({ artistIds: track.artists.map((artist) => artist.id) });
    });
  }, []);
  return (
    <PlaylistContext.Provider
      value={{ tracks, setTracks, artists, setArtists, filters, setFilters }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;
