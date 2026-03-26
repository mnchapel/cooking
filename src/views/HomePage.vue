<script setup lang="ts">
import type { Recipe } from "@/types";

defineProps<{
  recipes: Recipe[];
}>();
</script>

<template>
  <div class="recipe-grid">
    <a v-for="recipe in recipes" :key="recipe.id" :href="'#/recipe/' + recipe.id">{{ recipe.title }}</a>
  </div>
</template>

<style scoped></style>
