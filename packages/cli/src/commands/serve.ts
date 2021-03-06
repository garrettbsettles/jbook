import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

const isProd = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
	.command("serve [filename]")
	.description("Open a file for editing")
	.option("-p, --port <number>", "port to run server on", "4005")
	.action(async (filename = "notebook.js", { port }: { port: string }) => {
		try {
			const dir = path.join(process.cwd(), path.dirname(filename));
			await serve(parseInt(port), path.basename(filename), dir, !isProd);
			console.log(
				`Opened ${filename}. Navigate to http://localhost:${port} to edit the file`
			);
		} catch (error) {
			if (error.code === "EADDRINUS") {
				console.error(
					"Port is in use. Try running on a different port."
				);
			} else {
				console.log("Here's the problem:", error.message);
			}
			process.exit(1);
		}
	});
