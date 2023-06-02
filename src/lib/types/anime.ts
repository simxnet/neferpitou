export type Paginated<D> = {
	data: D;
	meta: {
		total: number;
		lastPage: number;
		currentPage: number;
		perPage: number;
		prev: number | null;
		next: number | null;
	};
};

export interface AnimeError {
	statusCode: number;
	message: string;
	error: string;
}

export type RecentRelease = Paginated<Episode[]>;

export type SearchResult = Paginated<Anime[]>;

export type Anime = {
	id: string;
	slug: string;
	description: string | undefined;
	title: {
		english: string;
		native: string;
		romaji: string;
		userPreferred: string;
	};
	status: "RELEASING" | "FINISHED" | "NOT_YET_AIRED" | "HIATUS";
	coverImage: string;
	bannerImage: string;
	currentEpisode: number;
	episodes: Episode[];
	mappings: {
		mal?: number;
		anidb?: number;
		kitsu?: number;
		anilist?: number;
	};
	color: string;
};

export type Episode = {
	id: string;
	number: number;
	anime: Anime;
	title: string | undefined;
	createdAt: string;
	airedAt: Date;
	description: string | undefined;
	image: string | undefined;
	sources: Source[];
	episodes: Episode[];
};

export type Source = {
	id: string;
	website: string;
	subtitle?: string;
	url: string;
	priority: number;
};
