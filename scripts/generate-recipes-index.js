// @ts-check
import { fileURLToPath } from "node:url";
import process from "node:process";
import { glob } from "node:fs/promises";
import matter from "gray-matter";
import { readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, parse } from "node:path";

/**
 * @import {RecipeMetadata} from "@/types.js"
 */

/**
 *
 * @param {string} pattern
 * @returns {Promise<string[]>}
 */
async function scanFiles(pattern) {
  const files = [];
  for await (const file of glob(pattern)) {
    files.push(file);
  }
  return files;
}

/**
 *
 * @param {string[]} paths
 * @returns {Array<RecipeMetadata>}
 */
function parseRecipes(paths) {
  /**
   * @type {Array<RecipeMetadata>}
   */
  const recipes = [];

  for (const path of paths) {
    const fileContent = readFileSync(path, "utf8");
    // @ts-ignore
    const { data } = matter(fileContent);
    if (Object.keys(data).length > 0) {
      const recipe = {
        slug: getSlug(path),
        path: path.replaceAll("\\", "/"),
        title: data["title"] ?? null,
        tags: data["tags"] ?? null,
        time: data["time"] ?? null,
      };
      recipes.push(recipe);
    } else {
      console.info(`[recipes] Recipe with empty frontmatter found: ${path}`);
    }
  }
  return recipes;
}

/**
 *
 * @param {string} filePath
 * @returns {string}
 */
function getSlug(filePath) {
  const parent = basename(dirname(filePath));
  const name = parse(filePath).name.replaceAll("_", "-");
  return `${parent}-${name}`;
}

/**
 *
 * @param {string} filePath
 * @param {Array<RecipeMetadata>} data
 */
function writeJson(filePath, data) {
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

async function generateIndex() {
  const files = await scanFiles("src/content/*/**/*.md");
  const recipes = parseRecipes(files);
  writeJson("src/content/recipes-index.json", recipes);
  console.info(`[recipes] Index generated (${recipes.length} recipes)`);
}

// Check if the file is directly called with node command
const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  generateIndex().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export { generateIndex };
