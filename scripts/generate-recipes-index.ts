import { fileURLToPath } from "node:url";
import process from "node:process";
import { glob } from "node:fs/promises";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { RecipeMetadata } from "../src/types.ts";

/**
 * Scan files matching a glob pattern
 */
async function scanFiles(pattern: string): Promise<string[]> {
  const files: string[] = [];
  for await (const file of glob(pattern)) {
    files.push(file);
  }
  return files;
}

/**
 * Parse markdown files
 */
function parseRecipes(paths: readonly string[]): RecipeMetadata[] {
  const recipes: RecipeMetadata[] = [];

  for (const filePath of paths) {
    try {
      const fileContent = readFileSync(filePath, "utf8");
      const { data } = matter<any, any>(fileContent);
      const frontmatter = data as Partial<RecipeMetadata>;
      if (!frontmatter || Object.keys(frontmatter).length === 0) {
        console.info(`[recipes] Recipe with empty frontmatter found: ${filePath}`);
        continue;
      }

      const recipe: RecipeMetadata = {
        slug: getSlug(filePath),
        path: filePath.replaceAll("\\", "/"),
        title: typeof frontmatter.title === "string" ? frontmatter.title : null,
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : null,
        time: typeof frontmatter.time === "number" ? frontmatter.time : null,
      };
      recipes.push(recipe);
    } catch (error) {
      console.error(`[recipes] Failed to parse: ${filePath}`, error);
    }
  }
  return recipes;
}

/**
 * Generate a slug from file path
 */
function getSlug(filePath: string): string {
  const parent = path.basename(path.dirname(filePath));
  const name = path.parse(filePath).name.replaceAll("_", "-");
  return `${parent}-${name}`;
}

/**
 * Write JSON file safely
 */
function writeJson(filePath: string, data: readonly RecipeMetadata[]): void {
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

/**
 * Main generator
 */
export async function generateIndex(): Promise<void> {
  const files = await scanFiles("src/content/*/**/*.md");
  const recipes = parseRecipes(files);
  writeJson("src/content/recipes-index.json", recipes);
  console.info(`[recipes] Index generated (${recipes.length} recipes)`);
}

/**
 * Execute if run directly
 */
const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  try {
    await generateIndex();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
