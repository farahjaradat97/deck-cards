<script setup lang="ts">
import { ref, type Ref } from "vue";

interface Card {
  value: number;
  set: string;
}

const setArray: Ref<string[]> = ref(["heart", "diamonds", "clubs", "spades"]);
const numberValue: Ref<number[]> = ref([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
]);

const deck: Ref<{ [key: string]: Card[] }> = ref({
  heart: [],
  diamonds: [],
  clubs: [],
  spades: [],
});

const generateCard = (set: string, numbers?: number[]) => {
  const numberSet = numbers ? numbers : numberValue.value;
  deck.value[set] = numberSet.map((value) => ({ value, set }));
};

const draw = (set: string, index: number) => {
  const deckSuit = deck.value[set];
  if (deckSuit.length === 0) {
    console.log(`No more cards left`);
    return null;
  }
  deckSuit.pop();
  deck.value[set] = deckSuit;
};
</script>

<template>
  <div>
    <div
      v-for="set in setArray"
      :key="set"
      class="flex flex-col border text-blue-400"
    >
      <h3>{{ generateCard(set) }} Cards:</h3>
      <div
        v-for="card in deck[set]"
        :key="card.value + card.set"
        class="border flex"
      >
        <div class="flex">
          <div>{{ card.value }}</div>
          <div>{{ card.set }}</div>
        </div>
      </div>

      <button @click="draw(set, set.length - 1)">Draw from {{ set }}</button>
    </div>
  </div>
</template>
