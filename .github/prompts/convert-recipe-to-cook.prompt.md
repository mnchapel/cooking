---
name: "Convert recipe to cooklang"
description: "Convertie les recettes écrites en Markdown en Cooklang"
---

## Objectif

Pour chaque recette de cuisine au format markdown que je te donne, je vais te demander de la convertir au format Cooklang (fichier `.cook`).

## A propos de Cooklang

Cooklang is the markup language at the center of an open-source ecosystem for cooking and recipe management. In Cooklang, each text file is a recipe written as plain-english instructions with markup syntax to add machine-parsible information about required ingredients, cookware, time, and metadata.

### The .cook recipe specification

Below is the specification for defining a recipe in Cooklang.

#### Ingredients

To define an ingredient, use the `@` symbol. If the ingredient's name contains multiple words, indicate the end of the name with `{}`.

```
Then add @salt and @ground black pepper{} to taste.
```

To indicate the quantity of an item, place the quantity inside `{}` after the name.

```
Poke holes in @potato{2}.
```

To use a unit of an item, such as weight or volume, add a `%` between the quantity and unit.

```
Place @bacon strips{1%kg} on a baking sheet and glaze with @syrup{1/2%tbsp}.
```

Now you can try Cooklang and experiment with a few things in the [Cooklang Playground](https://cooklang.github.io/cooklang-rs/)!

#### Steps

Each paragraph in your recipe file is a cooking step. Separate steps with an empty line.

```
A step,
the same step.

A different step.
```

If you want to force a line break within a step, end the line with a backslash `\`. The backslash will be replaced with a newline character when rendered.

```
Lay out the @rice paper{1}.\
Top with @avocado{1/2}(sliced),\
@cucumber{1/2}(julienned),\
and @cooked shrimp{4}.
```

This will render as multiple lines within a single step.

#### Comments

You can add comments up to the end of the line to Cooklang text with `--`.
```
-- Don't burn the roux!

Mash @potato{2%kg} until smooth -- alternatively, boil 'em first, then mash 'em, then stick 'em in a stew.
```

Or block comments with `[- comment text -]`.
```
Slowly add @milk{4%cup} [- TODO change units to litres -], keep mixing
```

#### Metadata

Recipes are more than just steps and ingredients—they also include context, such as preparation times, authorship, and dietary relevance. You can add metadata to your recipe using YAML front matter, add `---` at the beginning of a file and `---` at the end of the front matter block.

```yaml
---
title: Spaghetti Carbonara
tags:
  - pasta
  - quick
  - comfort food
---
```

#### Cookware

You can define any necessary cookware with `#`. Like ingredients, you don't need to use braces if it's a single word.
```
Place the potatoes into a #pot.
Mash the potatoes with a #potato masher{}.
```

#### Timer

You can define a timer using `~`.
```
Lay the potatoes on a #baking sheet{} and place into the #oven{}. Bake for ~{25%minutes}.
```

Timers can have a name too:

```
Boil @eggs{2} for ~eggs{3%minutes}.
```

Applications can use this name in notifications.

### Conventions

Beyond the core language, the Cooklang ecosystem has common conventions for file types (`.cook` for recipes, `.menu` for meal plans), shopping list configuration, pantry inventory, recipe scaling, adding pictures, and canonical metadata keys.

### Advanced

#### Notes
To include relevant background, insights, or personal anecdotes that aren't part of the cooking steps, use notes. Start a new line with `>` and add your story.

```
> Don't burn the roux!

Mash @potato{2%kg} until smooth -- alternatively, boil 'em first, then mash 'em, then stick 'em in a stew.
```

#### Sections
Some recipes are more complex than others and may include components that need to be prepared separately. In such cases, you can use the section syntax, e.g., `==Dough==`. The section name and the `=` symbols after it are optional, and the number of `=` symbols does not matter.

```
= Dough

Mix @flour{200%g} and @water{100%ml} together until smooth.

== Filling ==

Combine @cheese{100%g} and @spinach{50%g}, then season to taste.
```

#### Short-hand preparations

Many recipes involve repetitive ingredient preparations, such as peeling or chopping. To simplify this, you can define these common preparations directly within the ingredient reference using shorthand syntax:

```
Mix @onion{1}(peeled and finely chopped) and @garlic{2%cloves}(peeled and minced) into paste.
```

#### Referencing other recipes

You can reference other recipes using the existing `@` ingredient syntax. The path is relative to the root of the recipes directory, without the `.cook` extension:

```
Pour over with @./sauces/Hollandaise{150%g}.
```

## Exemples de recettes cooklang

### A Simple Recipe

A recipe with ingredients, cookware, timers, and comments:

```cooklang
---
source: https://www.jamieoliver.com/recipes/eggs-recipes/easy-pancakes/
tags: fun, quick
---

Crack the @eggs{3} into a blender, then add the @flour{125%g},
@milk{250%ml} and @sea salt{1%pinch}, and blitz until smooth.

Pour into a #bowl and leave to stand for ~{15%minutes}.

Melt the @butter in a #large non-stick frying pan{} on
a medium heat, then tilt the pan so the butter coats the surface.

Pour in 1 ladle of batter and tilt again, so that the batter
spreads all over the base, then cook for 1 to 2 minutes,
or until it starts to come away from the sides.

Once golden underneath, flip the pancake over and cook for 1 further
minute, or until cooked through.

Serve straightaway with your favourite topping. -- Add your favorite
-- topping here to make sure it's included in your meal plan!
```

### Sections, Notes, and Recipe References

A more complex recipe using sections to organise components, notes for tips, and references to other recipes:

```cooklang
---
title: Stuffed Peppers
tags: [dinner, vegetarian]
servings: 4
prep time: 20 minutes
cook time: 35 minutes
---

> These freeze well. Double the batch and freeze half for a quick weeknight dinner.

= Filling

Cook @rice{200%g} according to package directions.

Sauté @onion{1}(diced) and @garlic{3%cloves}(minced) in @olive oil{2%tbsp}
in a #large skillet{} until softened, about ~{5%minutes}.

Add @canned tomatoes{400%g}, @black beans{240%g}(drained),
@cumin{1%tsp}, and @smoked paprika{1%tsp}. Stir in the cooked rice.

= Assembly

Cut the tops off @bell peppers{4} and remove seeds.
Stuff with the filling and place in a #baking dish{}.

Top each pepper with @cheddar{100%g}(grated).

Bake in a preheated #oven{} at 190°C for ~{30%minutes} until peppers
are tender and cheese is bubbling.

Serve with @./Sauces/Salsa Verde{}.
```

The `@./Sauces/Salsa Verde{}` line references another `.cook` file in your collection — its ingredients are included in shopping lists automatically.

## Ce que tu dois faire

- Le texte doit être entièrement en français.
- **Si tu as le moindre doute sur quelque chose, demande moi et j'affinerai les consignes. Ne prend pas d'initiative.**

### Le front-matter

Voici la structure du front-matter que tu devras ABSOLUMENT respecter :

```yaml
---
title: "<nom de la recette>"
description: "<courte description entre 5 et 20 mots maximum>"
image:
category: <l'une des catégories suivantes que je t'indiquerai dans le prompt "Accompagnement", "Amuse-bouche", "Archive", "Boisson", "Dessert", "Petit-déjeuner", "Plat", "Sauce">
tags:
  - <tag 1>
  - <tag 2>
  - ...
  - <régimes alimentaires>
diet:
  - <régime alimentaire 1>
  - <régime alimentaire 2>
  - ...
cuisine: <style gastronomique>
servings: <nombre de portions>
difficulty:
time: "<durée en minutes ou en heure et minutes à calculer à partir du contenu>"
time.prep:
time.cook:
source.name:
source.author: "<nom de la référence>"
source.url: <url de la référence>
locale: "fr_FR"
---
```

**Consignes complémentaires :**

- Complète uniquement les propriétés `title`, `description`, `category`, `tags`, `diet`, `cuisine`, `servings`, `time`, `source.author`, `source.url`, NE modifie PAS les autres propriétés.
- Les valeurs des propriétés `title`, `description`, `time`, `source.author`, `locale` doivent être encadrées par des guillemets `"`.
- Dans `title`, le nom qu'il faudra mettre sera fourni par la recette source.
- Dans `tags`, tu dois mettre uniquement des éléments issus des ingrédients et des étapes de préparation de la recette. Pour le ou les régimes alimentaires de `tags`, tu ne dois les mettre que si tu es certain et que tu as une confiance absolue dans ce que tu proposes, sinon tu ne mets rien. Cette liste d'un ou plusieurs régimes alimentaires doit être la même que dans le champ `diet`.
- Dans `tags`, les éléments sont en minuscule.
- Dans `diet`, tu ne dois mettre que des items dont tu es certain et que tu as une confiance absolue dans ce que tu proposes, sinon tu ne mets rien. La liste ne peut contenir qu'un seul élément. Le contenu de cette propriété doit être répercuté dans `tags`.
- Dans `diet`, les éléments commencent par une majuscule.
- Dans `cuisine`, tu ne dois mettre un style gastronomique que si tu es certain et que tu as une confiance absolue dans ce que tu proposes.
- Dans `servings`, le nombre de portions sera indiqué dans mon prompt.
- Dans `time`, la temps doit être indiqué dans l'un des formats suivants : `<durée en minutes> min` ou `<durée en heure> h <durée en minutes> min`. Utilise le second si la temps dépasse 1 heure.
- Dans `source.author`, si la recette a plusieurs référence, tu dois écrire chacun des noms dans cette propriété et les séparer par ` | `. Par exemple: `nom-1 | nom-2 | ...`.
- Dans `source.url`, si la recette a plusieurs référence, tu dois écrire chacune des url dans cette propriétés et les séparer par ` | `. Par exemple: `url-1 | url-2 | ...`.
- Le texte doit être en français.
- Si tu as le moindre doute sur le contenu à mettre, remplace le par `???`. Je préfère que tu fasses ça, plutôt que d'avoir des erreurs.
- Respecte la structure que je t'ai fournie !

### La structure du corps

**Consignes :**

- Tu NE dois PAS INVENTER, ni modifier le texte d'origine, à part pour les éléments que t'ai explicitement indiqué dans les consignes.
- Laisse 2 lignes blanches entre chaque étape.
- Tu dois laisser une ligne blanche après le front-matter.
- Tu dois laisser une ligne blanche à la fin du document.
- Pour les ustensiles de cuisine, utilise la syntaxe `#<nom de l'ustensile>{}`.
- Pour les ingrédients, utilise toujours la syntaxe `@<nom de l'ingrédient>{}`.
- Pour les ingrédients, "c.a.c" doit être "c.à.c" et "c.a.s" doit être "c.à.s".
- Pour le temps, utilise soit la syntaxe `~{<temps>%<unité>}`, par exemple `~{25%minutes}` lorsqu'il ne se rapporte pas à un ingrédient particulier. Soit la syntaxe `~<nom>{<temps>%<unité>}` lorsque le temps concerne un ingrédient particulier, par exemple `~oeufs{3%minutes}`. Si le temps est supérieur à 59 minutes, utilise la syntaxe `~{<temps>%heures}` ou `~{<temps> heures <temps>%minutes}`. Ajuste les singuliers et les pluriels.

### Format d'une recette source

Les recettes que je te fournirai auront la plupart du temps le format suivant :

<FORMAT_RECETTE_ORIGINE>
```markdown
# {Nom de la recette}

## Ingrédients pour {nombre de portions} {unité des portions}

- {ingrédient 1}
- {ingrédient 2}
- ...

## Préparation

### Etape 1

{ETAPE 1}

### Etape 2

{ETAPE 2}

## Références

- <{LIEN}>
```
</FORMAT_RECETTE_ORIGINE>

### Format attendu d'une recette générée

Voici le format global d'une recette que tu dois générer :

<FORMAT_RECETTE_ATTENDU>
```cook
---
...
---

<étape 1>


<étape 2>


<étape n>

```
</FORMAT_RECETTE_ATTENDU>

### Exemple

La recette du Mathlouh d'origine :

<EXEMPLE_RECETTE_ORIGINE>
```markdown
# Mathlouh

## Ingrédients pour 4 pains

- 300g de farine (T45 idéalement)
- 200g de semoule fine
- 30cl d'eau tiède (voire un peu plus, cf. préparation)
- 1c.a.c de miel
- 1c.a.c de sucre
- 2c.a.c de sel fin
- 1c.a.c d'huile
- 1 sachet de levure boulangère

## Préparation

### Etape 1

Activer la **levure de boulanger** avec 5cl d'**eau tiède** et le **miel**. Laisser reposer 10 minutes.

### Etape 2

Ajouter la **farine**, la **semoule**, le **sucre**, le **sel**, l'**huile**. Ajouter le reste d'**eau tiède** (les 25cl), progressivement. Mélanger jusqu'à obtenir une texture bien homogène.

### Etape 3

Transferer la pâte sur le plan de travail et pétrir pendant 10 minutes. Ne pas hésiter à ajouter de l'eau pendant le pétrissage pour avoir une pâte bien hydratée (cf. la vidéo de la recette d'origine).

### Etape 4

Laisser reposer la pâte 15 minutes à couvert.

### Etape 5

Faire un rabat, la bouler et la laisser reposer 1h30. Pour le rabat : etaler la boule de pâte en appuyant dessus avec les mains puis rabattre le bord inférieur vers le centre et faire pareil avec le bord supérieur. Tourner la pâte de 90° et rabattre les bords inférieurs et supérieurs comme précédemment.

### Etape 6

Diviser la pâte en 4 pâtons, les bouler et les étaler légèrement dans la semoule fine. Laisser reposer les pâtons à couvert pendant 30 minutes.

### Etape 7

Faire chauffer une poêle sur un feu moyen puis faire cuire les petits pains un à un. Mettre un pâton dans la poêle en l'applatissant légèrement. Lorsque des petites bulles apparaissent ou lorsque le dessous est un peu doré, le retourner. Le retourner environ toutes les 30 secondes jusqu'à ce qu'il soit bien gonflé et doré.

### Etape 8

Mettre les petits pains dans un torchon tout de suite après la cuisson pour qu'ils conservent leur moelleux.

## Références

[Recette d'origine](https://www.instagram.com/p/CxTUId8oNgi/)

```
</EXEMPLE_RECETTE_ORIGINE>

La recette du Mathlouh générée :

<EXEMPLE_RECETTE_ATTENDUE>
```cook
---
title: "Matlouh"
description: "Le Matlouh est un pain poêlé algérien, ultra-moelleux, alvéolé et traditionnellement préparé à base de semoule fine."
image:
category: Accompagnement
tags:
  - pain
  - végétarien
diet:
  - Végétarienne
cuisine: Algérienne
servings: 4
difficulty:
time: "2 h 45 min"
time.prep:
time.cook:
source.name:
source.author: "debo_gateaux"
source.url: https://www.instagram.com/p/CxTUId8oNgi/
locale: "fr_FR"
---

Activer la @levure de boulanger{1%sachet} avec 5 cl d'@eau tiède{5%cl}(voire un peu plus) et le @miel{1%c.à.c}. Laisser reposer ~{10%minutes}.


Ajouter la @farine{300%g}(T45 idéalement), la @semoule fine{200%g}, le @sucre{1%c.à.c}, le @sel fin{2%c.à.c} et l'@huile{1%c.à.c}. Ajouter le reste d'@eau tiède{25%cl} (les 25cl), progressivement. Mélanger jusqu'à obtenir une texture bien homogène.


Transferer la pâte sur le plan de travail et pétrir pendant ~{10%minutes}. Ne pas hésiter à ajouter de l'eau pendant le pétrissage pour avoir une pâte bien hydratée (cf. la vidéo de la recette d'origine).


Laisser reposer la pâte ~{15%minutes} à couvert.


Faire un rabat, la bouler et la laisser reposer ~{1 heure 30%minutes}. Pour le rabat : étaler la boule de pâte en appuyant dessus avec les mains puis rabattre le bord inférieur vers le centre et faire pareil avec le bord supérieur. Tourner la pâte de 90° et rabattre les bords inférieurs et supérieurs comme précédemment.


Diviser la pâte en 4 pâtons, les bouler et les étaler légèrement dans la semoule fine. Laisser reposer les pâtons à couvert pendant ~{30%minutes}.


Faire chauffer une #poêle{} sur un feu moyen puis faire cuire les petits pains un à un. Mettre un pâton dans la poêle en l'applatissant légèrement. Lorsque des petites bulles apparaissent ou lorsque le dessous est un peu doré, le retourner. Le retourner environ toutes les 30 secondes jusqu'à ce qu'il soit bien gonflé et doré.


Mettre les petits pains dans un torchon tout de suite après la cuisson pour qu'ils conservent leur moelleux.

```
</EXEMPLE_RECETTE_ATTENDUE>
