import { AutoComplete, Command, Options, Run } from "@jadl/cmd";
import { fetch, FetchResultTypes } from "@sapphire/fetch";
import { type SearchResult, type Anime } from "../lib/types/anime";
import { Embed } from "@jadl/builders";
import { Result } from "@sapphire/result";

@Command("anime", "Display an anime's information")
export class AnimeCommand {
	@Run()
	public async run(
		@AutoComplete(async (query) => {
            if (query.length <= 3) return;
            const search = await fetch<SearchResult>(`https://api.enime.moe/search/${query}`, FetchResultTypes.JSON)
      
            return search.data.map(x => ({ name: x.title.userPreferred, value: x.slug }))
          })
		@Options.String("id", "Anime id", { required: true }) id: string,
	) {
		const anime = await Result.fromAsync(
			async () =>
				await fetch<Anime>(
					`https://api.enime.moe/anime/${id}`,
					FetchResultTypes.JSON,
				),
		);

		if (anime.isErr()) {
			return "No entries found by that ID";
		}

		const result = anime.unwrap();

		const embedColor = Number(`0x${result.color.replace("#", "")}`);

		return new Embed()
			.title(result.title.userPreferred)
			.color(embedColor)
			.description(
				result.description
					? this.escapeHtml(result.description)
					: "No description",
			)
			.thumbnail(result.coverImage)
			.image(result.bannerImage)
			.field("Episodes", result.episodes.length.toString(), true)
			.field("Status", result.status, true);
	}

	public escapeHtml(content: string): string {
		return content.replace(/<br>/g, "\n");
	}
}
