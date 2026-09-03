---
name: "Recipe Converter to Cooklang"
description: "Convert recipes from any supported format into Cooklang."
applyTo: '*'
source.author: 'Joseph Garnier'
source.url: ''
---

# Recipe Converter to Cooklang

## Purpose

Convert the provided recipe into valid Cooklang.

Preserve the recipe's content and meaning exactly. Do not translate, correct, normalize, complete, or reinterpret source information.

## Input

The user provides one recipe in any of these formats:

- HTML
- Plain text
- Markdown
- JSON
- YAML
- File content

The recipe language is French unless another language is explicitly used.

## Output

Return:

1. The recipe as Cooklang using the exact structure defined in [Output template](#output-template).
2. The report defined in [Report](#report).

Use the same language as the source recipe. Do not add explanations, summaries, or commentary.

### Output template

Use this exact structure:

```cooklang
---
title: "{{TITRE}}"
description: "{{DESCRIPTION}}."
image:
category: {{Accompagnement|Amuse-bouche|Archive|Boisson|Dessert|Petit-déjeuner|Plat|Sauce}}
tags:
  - {{TAG_1}}
  - {{TAG_N}}
  - {{TAG_REGIME_DIET_1|végétarienne}}
  - {{TAG_REGIME_DIET_N}}
diet:
  - {{REGIME_DIET_1|Végétarienne}}
  - {{REGIME_DIET_N}}
cuisine: {{Algérienne|Française|Méditerranéenne|...}}
servings: {{PORTIONS}}
difficulty:
time: "{{HEURES}} h {{MIN}} min|{{MIN}} min|{{HEURES}} h"
time.prep:
time.cook:
source.name:
source.author: "{{PRENOM}} {{NOM}}"
source.url: {{URL}}
locale: "fr_FR"
---

{{STEP_1}}


{{STEP_N}}
```

- Replace placeholders ``{{...}}`` with source information.
- Keep fields empty when the source does not provide the corresponding value.
- Preserve the template field order and names.
- Do not remove fields from the template.
- Do not add fields.
- For empty list fields such as `tags` or `diet`, omit list items rather than inventing values.

### Output Rules

The output must:

- preserve the source instruction order;
- preserve explicit recipe information;
- preserve recipe terminology;
- preserve explicit quantities, units, durations, temperatures, and conditions;
- preserve explicit notes and advice;
- use Cooklang syntax for ingredients, cookware, and timers;
- use one Markdown list item per logical instruction step;
- preserve paragraph separation between logical steps;
- use `>` for source notes or advice when applicable.

Do not:

- simplify;
- translate recipe content;
- correct spelling or grammar;
- normalize units;
- convert quantities;
- infer missing information;
- invent metadata;
- invent ingredients, cookware, temperatures, or timings;
- add explanations outside the recipe and the missing-information report.

## Core Rules

### Extract, do not infer

- Use only information explicitly present in the source.
- When information is missing, leave it empty.
- When information is ambiguous, preserve the source wording or ambiguity.
- Never infer or invent a field information.

## Workflow

1. Parse the source.
2. Extract all available recipe data.
3. Convert the extracted data to Cooklang.
4. Apply the [output template](#output-template).
5. Validate the result against [validation](#validation).
5. Generate a [report](#report).

Extract, when present:

- title
- description
- image
- category
- tags
- diet
- cuisine
- servings/yield
- difficulty
- total time
- preparation time
- cooking time
- ingredients
- ingredient quantities and units
- ingredient preparation
- instructions
- timings
- temperatures
- cookware
- source name
- author
- source URL
- locale

## Cooklang Rules

### Metadata

- Populate the metadata fields from explicit source information only.
- Preserve source values exactly, except where an explicit Exception: rule authorizes a specific transformation.
- Do not calculate values that are not explicitly provided.

For example, do not calculate:

- total time from preparation and cooking time;
- cooking time from individual timers;
- servings from ingredient quantities.

#### Title

- Use exactly the title explicitly provided by the source.
- Do not invent, translate, correct, shorten, or reformulate the title.

#### Category

- Use the source category when explicitly stated.
- Do not classify the recipe.

#### Tags

- Use explicitly provided or clearly labeled source tags.
- Do not invent tags from cuisine, diet, or recipe content.
- Exception: normalize all tag values to lowercase.

#### Diet

- Use explicitly stated dietary information.
- Do not infer dietary properties.
- When a dietary regime is present in `diet`, include the same regime in `tags`.
- Do not add any dietary regime to `tags` that is not present in `diet`.
- Exception: capitalize the first character of each diet value.

#### Cuisine

- Use explicitly stated cuisine information.
- Do not infer cuisine from ingredients or recipe name.

#### Difficulty

- Use explicitly stated difficulty.
- Do not infer difficulty.

#### Source

- Preserve source information exactly.
- `source.author` may contain a person, organization, brand, or publisher name as provided by the source.
- When multiple source references are provided, preserve all corresponding author names and URLs in their respective properties, separating multiple values with ` | `.

#### Locale

- Use the recipe's source locale when explicitly determinable.
- For a French recipe from a French source, use `fr_FR`.

### Ingredients

Mark ingredients with `@`.

Syntax:

```text
@ingredient{}
@ingredient{quantity}
@ingredient{quantity%unit}
@ingredient{quantity}(preparation)
```

Examples:

```text
@salt{}
@eggs{3}
@flour{500%g}
@olive oil{2%tbsp}
@onion{1}(finely diced)
```

Rules:

- Preserve ingredient names.
- Preserve quantities exactly as stated.
- Preserve units exactly as stated.
- Preserve ranges and fractions.
- Preserve qualitative quantities without converting them.
- Preserve the ingredient's wording, accents, spelling, quantity, unit, ranges, fractions, and preparation exactly as provided, except for converting the ingredient name to lowercase.
- Do not infer missing quantities.
- Declare each ingredient only once with Cooklang syntax.
- When the same ingredient is used in multiple steps, reuse its existing declaration instead of declaring it again.
- Use `{}` for explicit quantities.
- Use `%` between quantity and unit.
- Use `(preparation)` for explicit preparation instructions associated with an ingredient.
- Keep `{}` when an ingredient is explicitly present but has no quantity.
- Always use `{}` after an ingredient name, including when no quantity is provided.
- Exception: normalize `c.a.c` to `c.à.c` and `c.a.s` to `c.à.s`.
- Exception: always convert ingredient names to lowercase when writing them in Cooklang syntax. This applies only to the ingredient name itself.

Examples:

```text
"3 large eggs" -> @large eggs{3}
"1 cup flour" -> @flour{1%cup}
"2-3 cloves garlic" -> @garlic{2-3%cloves}
"1/2 tsp vanilla" -> @vanilla{1/2%tsp}
"salt to taste" -> @salt{}
```

### Cookware

Mark explicitly mentioned cookware with `#`.

Syntax:

```text
#cookware{}
```

Examples:

```text
#pot
#pan
#large mixing bowl{}
```

Rules:

- Preserve source terminology.
- Preserve the cookware's wording, accents, spelling, dimensions, and other explicit details exactly as provided, except for converting the cookware name to lowercase.
- Mark equipment used in the instructions when explicitly mentioned.
- Do not invent cookware.
- Declare each cookware item only once with Cooklang syntax `#...{}`.
- Always use `{}` after cookware names.
- When the same cookware is used in multiple steps, reuse its existing declaration instead of declaring it again.
- Exception: always convert cookware names to lowercase when writing them in Cooklang syntax. This applies only to the cookware name itself.

Examples:

```text
"large bowl" -> #large mixing bowl{}
"9x13 pan" -> #9x13 baking pan{}
"in a skillet" ->`#skillet{}
```

### Timers

Mark explicit durations with `~`.

Syntax:

```text
~{duration%unit}
~name{duration%unit}
```

Examples:

```text
~{15%minutes}
~{1%hour}
~{1 hour 30%minutes}
~oven{30%minutes}
~{10-15%minutes}
```

Rules:

- Preserve durations exactly as stated.
- Preserve units exactly as stated.
- Preserve ranges.
- Use named timers only when the duration is explicitly associated with a process or equipment.
- Do not invent durations.
- Do not convert vague conditions such as "until done" into durations.
- Exception: normalize `min` to `minute` or `minutes` and `h` to `hour` or `hours`.

Examples:

```text
"bake for 30 minutes" -> ~oven{30%minutes}
"simmer 1 hour" -> ~{1%hour}
"rest 10-15 min" -> ~{10-15%minutes}
```

### Temperatures

- Preserve temperatures exactly as stated.
- Do not convert temperature units.

### Sections

- Convert explicitly identified sections or separately prepared components in the source into Cooklang sections using `==...==`.
- Preserve the section name exactly as provided by the source.
- Preserve the section order.
- Keep each logical instruction step within its original section.
- Do not create sections that are not explicitly identifiable in the source.
- Use one Markdown list item per logical instruction step within each section.
- Do not add transitional, explanatory, or redundant text.

### Steps

- Preserve instruction order.
- Convert each logical cooking step into one Markdown list item.
- Separate logical steps with two blank lines.
- Do not merge distinct steps.
- Do not split a step unless the source structure clearly requires it.
- Leave one blank line between the closing `---` of the front matter and the first section or step.

### Notes

Preserve explicit source notes, tips, warnings, and advice.

Represent them as Cooklang notes:

```text
> Note text
```

Do not create new notes.

## Validation

Before returning the result, verify:

- The YAML frontmatter uses the exact template structure.
- All template fields are present.
- Empty fields remain empty.
- No metadata was invented.
- All available source metadata is preserved.
- Ingredients use valid `@` syntax.
- Explicit quantities use `{}`.
- Explicit units use `%`.
- Cookware uses `#`.
- Timers use `~`.
- Explicit temperatures are preserved.
- Instruction order is preserved.
- Each logical step is a separate Markdown list item.
- Steps are separated by blank lines.
- Explicit notes are preserved.
- No content was translated.
- No content was corrected or normalized.
- No recipe information was invented or omitted.

## Report

After the Cooklang recipe, output exactly:

```markdown
- Missing information: [item 1, item 2, ...]
```

- List only expected template fields that are missing from the source.
- Do not list Cooklang fields that are intentionally empty because they are not applicable.

When no expected information is missing, use:

```markdown
- Missing information: None
```
