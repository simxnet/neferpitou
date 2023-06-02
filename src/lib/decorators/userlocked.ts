import { Decorators } from "@jadl/cmd";
import { owner } from "../constants";

export const Developer = Decorators.createCommandDecorator(([_], cmd) => {
	cmd.canRun.push((interaction) => {
		return interaction.user?.id === owner;
	});
});
