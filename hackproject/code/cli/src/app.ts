import * as path from "path";
import * as fs from "fs/promises";
import { FileNotSpecified, InvalidFile } from "./errors";
import { getFileLocation, FileType } from "./utils/argument";
import { ContrastValidator, Requirement, validate } from "../../sdk/";

const main = async () => {
  try {
    let htmlFile = "index.html";
    if (process.argv.includes("--html")) {
      htmlFile = getFileLocation(FileType.HTML);
    }
    const htmlPath = path.join(__dirname, '../', htmlFile);
    const html = await fs.readFile(htmlPath, { encoding: "utf-8" });

    let css = "";
    if (process.argv.includes("--css")) {
      const cssFile = getFileLocation(FileType.CSS);
      css = await fs.readFile(path.join(__dirname, cssFile), {
        encoding: "utf-8",
      });
    }

    const responses = await validate({
      html: html,
      htmlPath: htmlPath,
      validator: new ContrastValidator(),
      requirement: Requirement.AA,
    });

    let isValid = true;

    responses.forEach((response) => (isValid &&= response.isValid));

    if (!isValid) {
      console.log("\x1b[31m accessibility test failed!\x1b[0m");
      process.exit(1);
    }
    console.log("\x1b[32m accessibility test passed!\x1b[0m");
    process.exit(0);
  } catch (error) {
    if (error instanceof FileNotSpecified) {
      console.error(error.message);
    } else if (error instanceof InvalidFile) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
};

main().catch(console.error);
