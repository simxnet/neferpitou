import { Author, Command, Run } from "@jadl/cmd";
import { MessageFlags, type APIUser } from "discord-api-types/v10";
import { MessageBuilder } from "@jadl/builders";

@Command("info", "Get information about Neferpitou")
export class InfoCommand {
	@Run()
	public async run(
		@Author() user: APIUser,
	) {
		return new MessageBuilder({
			content: `Hello, ${user.username}! I'm Neferpitou, a Discord bot made mostly for testing purposes but I can provide anime information!`,
			flags: MessageFlags.Ephemeral as number,
		});
	}
}
