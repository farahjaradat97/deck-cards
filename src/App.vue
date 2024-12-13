<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";

interface Card {
  value: number;
  set: string;
}
//Data
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
const icons: Ref<{ [key: string]: string }> = ref({
  heart: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
});
//Functions
const generateCard = (set: string, numbers?: number[]) => {
  const numberSet = numbers ? numbers : numberValue.value;
  deck.value[set] = numberSet.map((value) => ({ value, set }));
};
const draw = (set: string) => {
  const deckSuit = deck.value[set];
  if (deckSuit.length === 0) {
    return null;
  }
  deckSuit.pop();
  deck.value[set] = deckSuit;
};
const addDeck = () => {
  const newDeck: { [key: string]: Card[] } = {};
  setArray.value.forEach((set) => {
    newDeck[set] = [...deck.value[set], ...deck.value[set]];
  });
  deck.value = newDeck;
};
const initiCard = () => {
  setArray.value.forEach((set) => {
    generateCard(set);
  });
};

onMounted(() => {
  initiCard();
});
const iconClasses = (set: string) => {
  return set === "heart" || set === "diamonds" ? "text-red-500" : "text-black";
};
</script>

<template>
  <div class="container mx-auto p-4 w-full">
    <div class="flex flex-col gap-6 w-full">
      <div class="flex gap-2 justify-center">
        <button
          @click="addDeck"
          class="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mx-1"
          style="height: 36px"
        >
          Add Deck
        </button>
        <button
          @click="initiCard"
          class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mx-1"
          style="height: 36px"
        >
          Refresh
        </button>
      </div>
      <div
        v-for="set in setArray"
        :key="set"
        class="border-dashed border-2 border-gray-400 p-4 min-h-42"
      >
        <div
          v-if="deck[set].length"
          class="flex flex-wrap gap-2 justify-center items-center"
        >
          <div
            v-for="card in deck[set]"
            :key="card.value + card.set"
            class="border rounded shadow-md flex flex-col justify-between items-start p-1 w-16 h-24 bg-white text-black"
          >
            <div class="flex items-center">
              <span class="font-bold text-sm sm:text-base">
                {{ card.value }}
              </span>
              <span
                :class="iconClasses(card.set)"
                class="ml-1 text-sm sm:text-lg"
              >
                {{ icons[card.set] }}
              </span>
            </div>
            <div
              class="flex-grow flex w-full justify-center items-center text-lg sm:text-2xl"
            >
              <span :class="iconClasses(card.set)">{{ icons[card.set] }}</span>
            </div>
            <div class="flex items-center self-end transform rotate-180">
              <span class="font-bold text-sm sm:text-base">
                {{ card.value }}
              </span>
              <span
                :class="iconClasses(card.set)"
                class="ml-1 text-sm sm:text-lg"
              >
                {{ icons[card.set] }}
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-green-500 font-bold mt-4">
          All cards have been drawn!
        </div>

        <div class="flex justify-center mt-2">
          <button
            :disabled="!deck[set].length"
            @click="draw(set)"
            class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mx-1 disabled:bg-gray-300 disabled:cursor-not-allowed"
            style="height: 36px"
          >
            Draw
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
