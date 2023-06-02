import { Command, Options, Run } from "@jadl/cmd";
import { MessageFlags } from "discord-api-types/v10";
import { MessageBuilder } from "@jadl/builders";
import { codeBlock, isThenable } from "@sapphire/utilities";
import { Result } from "@sapphire/result";
import { Type } from "@sapphire/type";
import { inspect } from "util";

@Command("eval", "Evaluates Javascript code")
export class EvalCommand {
	@Run()
	public async run(
		@Options.String("code", "Code to eval") code: string,
	) {
		const { result, type } = await this.eval(code);

		return new MessageBuilder({
			content: `${codeBlock(result)}\n${codeBlock(type)}`,
			flags: MessageFlags.Ephemeral as number,
		});
	}

	private async eval(code: string) {
		let result: string;

		const exec = Result.from(() => eval(code));

		result = exec.unwrapOrElse((e) => {
			throw new Error(e.message);
		});

		const type = new Type(result).toString();
		if (isThenable(result)) result = await result;

		if (typeof result !== "string") {
			result = inspect(result, {
				depth: 2,
				showHidden: false,
			});
		}

		return {
			result,
			type,
		};
	}
}
