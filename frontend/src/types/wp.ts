export interface WPFeaturedMedia {
  source_url?: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
  };
}

export interface WPPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content?: {
    rendered?: string;
  };
  excerpt?: {
    rendered?: string;
  };
  _embedded?: {
    ["wp:featuredmedia"]?: WPFeaturedMedia[];
  };
}
