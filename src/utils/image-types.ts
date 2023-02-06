export type UnsplashUrls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
};

export type UnsplashLinks = {
  self: string;
  html: string;
  download: string;
  download_location: string;
};

export type UnsplashUser = {
  id: string;
  username: string;
  name: string;
  portfolio_url: string;
  instagram_username: string;
  twitter_username: string;
};

export type UnsplashImage = {
  id: string;
  created_at: Date;
  updated_at: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  urls: UnsplashUrls;
  links: UnsplashLinks;
  user: UnsplashUser;
};

export type OpenAiImageUrl = {
  url: string;
}

export type OpenAiResponse = {
  created: number;
  data: OpenAiImageUrl[];
}