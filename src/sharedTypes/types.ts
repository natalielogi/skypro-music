export type TrackType = {
  _id: number;
  name: string;
  author: string;
  release_date?: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: {
    type: string;
    data: number[];
  } | null;
  track_file: string;
  staredUser: number[];
};

export type SelectionType = {
  _id: number;
  items: number[];
  owner: number[];
  __v: number;
};

export type GetTracksResponse = {
  success: boolean;
  data: TrackType[];
};

export type GetSelectionsResponse = {
  success: boolean;
  data: SelectionType[];
};

export type RawTrack = {
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

export type Props = {
  pageTitle?: string;
};

export type authUserProps = {
  email: string;
  password: string;
};

export type authUserReturn = {
  email: string;
  username: string;
  _id: number;
};

export type registerUserprops = {
  email: string;
  password: string;
  username: string;
};

export type registerUserReturn = {
  message: string;
  result: {
    username: string;
    email: string;
    _id: number;
  };
  success: boolean;
};

export type User = {
  email: string;
  username: string;
  _id: number;
};

export type AuthState = {
  user: User | null;
  isAuth: boolean;
};
