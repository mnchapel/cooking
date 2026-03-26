<script setup lang="ts">
// @ts-check
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const recipeId = ref(route.params?.['id']);
console.log('recipeId :>>', recipeId);

// recipes.find(r => r.slug === "pasta")
// recipes
//   .filter(r => r.slug.includes("pa"))
//   .sort((a, b) => a.title.localeCompare(b.title))
// const recipesMap = new Map(
//   recipes.map(r => [r.slug, r])
// );
// const recipesMap = Object.fromEntries(
//   recipes.map(r => [r.slug, r])
// );

const recipe = ref({
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
const servings = ref(recipe.value.servings);

const emits = defineEmits({
  addToCart: null,
});

function goBack() {
  router.back();
}

function increaseServings() {
  servings.value++;
}

function decreaseServings() {
  if (servings.value > 1) servings.value--;
}

const adjustedIngredients = computed(() => {
  const ratio = servings.value / recipe.value.servings;
  return recipe.value.ingredients.map((ingredient) => ({
    ...ingredient,
    quantity: Math.round(ingredient.quantity * ratio),
  }));
});
</script>

<template>
  <div>
    <!-- The current route is accessible as $route in the template -->
    User {{ $route.params?.['id'] }}
  </div>
  <div class="recipe-page">
    <div class="recipe-top-bar">
      <button class="back-button" @click="goBack">◀️</button>
      <button class="cart-button" @click="emits('addToCart')">🛒</button>
    </div>

    <article class="recipe">
      <header class="recipe-header">
        <div class="recipe-main-line">
          <h1 class="recipe-title">
            {{ recipe.title }}
          </h1>
          <span class="recipe-time">⏱️ {{ recipe.time }} min</span>
        </div>
        <ul class="recipe-tags">
          <li v-for="tag in recipe.tags" :key="tag">#{{ tag }}</li>
        </ul>
        <div class="recipe-serving">
          <button @click="decreaseServings">-</button>
          <span class="recipe-servings-count">{{ servings }} personnes</span>
          <button @click="increaseServings">+</button>
        </div>
      </header>
      <section class="recipe-ingredients">
        <h2>Ingrédients</h2>
        <ul>
          <li v-for="ingredient in adjustedIngredients" :key="ingredient.name">
            {{ ingredient.name }}: {{ ingredient.quantity }}{{ ingredient.unit }}
          </li>
        </ul>
      </section>
      <section class="recipe-preparation">
        <h2>Préparation</h2>
        <div class="recipe-preparation-step" v-for="(step, index) in recipe.steps" :key="index">
          <h3>Etape {{ index + 1 }}</h3>
          <p>{{ step }}</p>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
.recipe-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: stretch;
  row-gap: var(--space-7px);
  flex: 1;
  padding-inline: 31px;
  padding-block: 75px;
}

.recipe-top-bar {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: stretch;

  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
    flex-shrink: 0;
    min-width: 24px;
    min-height: 24px;
  }
}

.recipe {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: stretch;
  row-gap: var(--space-7px);
  flex: 1;
}

.recipe-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: stretch;
  row-gap: var(--space-7px);
  flex: 1;
}

.recipe-main-line {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: stretch;
  padding-block-start: 32px;
}

.recipe-tags {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  align-content: start;
  column-gap: 12px;
  list-style: none;

  > li {
    list-style: none;
  }
}

.recipe-serving {
  width: auto;
  height: auto;
  border: 1px solid #c6c8c9ff;
  border-start-start-radius: 16px;
  border-start-end-radius: 16px;
  border-end-start-radius: 16px;
  border-end-end-radius: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  column-gap: 18px;
  align-self: center;
  padding-inline: 12px;
  padding-block: 8px;
}

.recipe-ingredients {
  > ul {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    align-content: start;
    column-gap: 24px;
    list-style: none;

    > li {
      list-style: none;
    }
  }
}
</style>
