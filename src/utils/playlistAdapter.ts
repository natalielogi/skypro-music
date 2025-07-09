import { TrackType } from '@/sharedTypes/types';

type RawTrack = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: unknown[];
};

export const formatTracks = (rawTracks: RawTrack[]): TrackType[] => {
  return rawTracks.map((track) => ({
    id: track._id,
    title: track.name,
    artist: track.author,
    album: track.album,
    duration: track.duration_in_seconds,
    track_file: track.track_file,
  }));
};
