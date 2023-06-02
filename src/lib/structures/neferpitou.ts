import { CommandHandler } from "@jadl/cmd";
import { GatewayIntentBits } from "discord-api-types/v10";
import { SingleWorker } from "jadl";

import commands from "../../commands";

export class Neferpitou extends SingleWorker {
	cmd = new CommandHandler(this, [...commands]);

	constructor() {
		super({
			token: process.env.DISCORD_TOKEN,
			cache: {
				channels: [],
				roles: false,
			},
			cacheControl: {
				guilds: [],
			},
			intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages,
		});

		this.setStatus("playing", "with potos");
	}
}
