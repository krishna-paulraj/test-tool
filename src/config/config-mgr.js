import chalk from "chalk";
import { cosmiconfigSync } from "cosmiconfig";
import Ajv from "ajv";
import betterAjvErrors from "better-ajv-errors";
import schema from "./schema.json" with { type: "json" };

const ajv = new Ajv();
const configLoader = cosmiconfigSync("tool");

export function getConfig() {
  const result = configLoader.search(process.cwd());

  if (!result) {
    console.log(chalk.red("❌ Couldn't find config file"));
    return { port: 1234 };
  }

  const validate = ajv.compile(schema);
  const valid = validate(result.config);

  if (!valid) {
    console.log(chalk.red("❌ Invalid config schema:"));
    console.log(betterAjvErrors(schema, result, validate.errors));
    process.exit(1);
  }

  console.log(chalk.green("✅ Found valid config:"));
  console.dir(result.config, { colors: true, depth: null });

  return result.config;
}
