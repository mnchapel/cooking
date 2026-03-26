<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import recipesIndex from "./content/recipes-index.json";
import RecipePage from "./views/RecipePage.vue";
import HomePage from "./views/HomePage.vue";
import type { Recipe, RecipeMetadata } from "./types";

const recipePreviews = ref<RecipeMetadata[]>(recipesIndex);

const recipes = ref<Recipe[]>([]);
recipes.value.push({
  id: crypto.randomUUID(),
  title: "Tartiflette",
  time: 30,
  servings: 4,
  tags: ["fromage", "viande", "plat"],
  ingredients: [
    { name: "Tomates", quantity: 500, unit: "g" },
    { name: "Poulet", quantity: 500, unit: "g" },
  ],
  steps: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus sapien a erat malesuada sagittis. Nam rhoncus risus dolor, nec dignissim nulla hendrerit eu. Cras felis erat, varius id neque ut, consectetur consectetur turpis. Suspendisse finibus pharetra convallis. Integer gravida mi sed metus vulputate, in facilisis ipsum tempor.",
    "Nulla laoreet vestibulum tempus. Etiam nunc eros, mollis in quam porta, congue dapibus metus. Nunc egestas ante sit amet sagittis suscipit. Etiam vitae odio et neque euismod egestas nec eu odio. Nam sed turpis quis mi lacinia porta. Nullam blandit enim quis arcu faucibus tincidunt. Donec et augue nulla. Pellentesque quis sem mollis, iaculis lacus a, suscipit felis. In vulputate libero ac orci consectetur, sit amet pulvinar dui gravida. Maecenas sagittis libero in dolor dictum viverra. Sed ultricies nibh ut tellus tincidunt ultricies.",
  ],
});

// const recipeById = computed(() => {
//   /** @type {{ [key: string]: Recipe}} */
//   const map = {};
//   recipes.value.forEach((recipe) => {
//     map[recipe.id] = recipe;
//   });
//   return map;
// });

// const currentRecipeId = computed(() => {
//   const hash = currentPath.value.slice(1); // remove # character
//   // get the ID if hash start with '/recipe/'
//   if (hash.startsWith("/recipe/")) {
//     return hash.replace("/recipe/", "");
//   }
//   return null;
// });

// const currentRecipe = computed(() => {
//   if (!currentRecipeId.value) return null;
//   return recipeById.value[currentRecipeId.value] || null;
// });

// const currentView = computed(() => {
//   const hash = currentPath.value.slice(1); // remove # character
//   if (hash.startsWith("/recipe/")) {
//     return RecipePage;
//   }
//   return routes[hash || "/"] || HomePage;
// });
</script>

<template>
  <header>Header</header>
  <nav>
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'about' }">About</RouterLink>
    <RouterLink :to="{ name: 'recipe', params: { id: '1' } }">Recipe</RouterLink>
    <RouterLink
      v-for="recipe in recipePreviews"
      :key="recipe.slug"
      :to="{ name: 'recipe', params: { id: recipe.slug } }"
    >
      {{ recipe.title }}
    </RouterLink>
  </nav>
  <main class="container">
    <RouterView />
  </main>
  <footer>Footer</footer>
</template>

<style scoped></style>
