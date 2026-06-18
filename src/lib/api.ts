export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  rank?: string | null;
  server?: string | null;
  image?: string | null;
  image_url?: string | null;
  status: string;
  game_id: number;
  game: string;
  featured: boolean;
  sale_type?: string | null;
  created_at?: string | null;
  seller_id?: number | null;
  seller?: Seller | null;
}

export interface Game {
  id: number;
  name: string;
  image?: string | null;
  image_url?: string | null;
  telegram?: string | null;
  messenger?: string | null;
  viber?: string | null;
  phone?: string | null;
}

export interface Seller {
  id: number;
  username: string;
  role: string;
  profile_image?: string | null;
  profile_image_url?: string | null;
  telegram?: string | null;
  messenger?: string | null;
  viber?: string | null;
  phone?: string | null;
}

export interface ListingImage {
  id: number;
  image: string;
  image_url: string;
}

export interface ListingDetails extends Listing {
  buy_price?: number | null;
  sold_price?: number | null;
  sold_at?: string | null;
  seller?: Seller | null;
  images: ListingImage[];
}

export interface HomeData {
  games: Game[];
  mobile_legends_listings: Listing[];
  pubg_listings: Listing[];
}


export interface ListingsResponse {
  items: Listing[];
  page: number;
  pages: number;
  total: number;
  has_next: boolean;
  has_prev: boolean;
}


export type ListingParams = {
  search?: string;
  game_id?: string | number;
  sort?: string;
  min_price?: string | number;
  max_price?: string | number;
  page?: string | number;
  per_page?: string | number;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const buildApiUrl = (path: string, params?: Record<string, any>) => {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        url.searchParams.set(key, String(value).trim());
      }
    });
  }

  return url.toString();
};

const cache = new Map<string, { data: any; expiry: number }>();
const inFlightRequests = new Map<string, Promise<any>>();
const CACHE_DURATION = 60 * 1000; // 1 minute

const fetchWithCache = async <T>(url: string): Promise<T> => {
  const cached = cache.get(url);
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }

  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url);
  }

  const request = fetch(url).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Unable to load data (${response.status})`);
    }
    const data = await response.json();
    cache.set(url, { data, expiry: Date.now() + CACHE_DURATION });
    return data;
  }).finally(() => {
    inFlightRequests.delete(url);
  });

  inFlightRequests.set(url, request);
  return request;
};

export const getListings = async (
  params?: ListingParams
): Promise<ListingsResponse> => {
  return fetchWithCache<ListingsResponse>(buildApiUrl("/api/listings", params));
};

export const getListing = async (id: number | string): Promise<ListingDetails> => {
  return fetchWithCache<ListingDetails>(buildApiUrl(`/api/listings/${id}`));
};

export const getGames = async (): Promise<Game[]> => {
  return fetchWithCache<Game[]>(buildApiUrl("/api/games"));
};

export const getHomeData = async (search = ""): Promise<HomeData> => {
  return fetchWithCache<HomeData>(buildApiUrl("/api/home", { search }));
};

export const getImageUrl = (image?: string | null) => {
  if (!image) {
    return null;
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  return `${API_BASE_URL}/static/uploads/${image}`;
};

export const getListingImageUrl = (listing: Pick<Listing, "image" | "image_url">) => {
  return listing.image_url ?? getImageUrl(listing.image);
};