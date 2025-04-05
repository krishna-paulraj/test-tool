import chalk from "chalk";

export function start(config) {
  console.log(chalk.cyan(" Starting the app"));
  console.log(chalk.whiteBright("Recevied configs to start -"), config);
}
