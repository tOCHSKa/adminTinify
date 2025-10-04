<template>
    <!-- FAQ -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-4xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">Questions fréquentes</h2>
          <p class="text-xl text-gray-600">Trouvez rapidement les réponses à vos questions.</p>
        </div>
  
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white p-6 rounded-lg shadow-sm"
          >
            <button
              @click="toggle(index)"
              class="flex justify-between items-center w-full text-left"
            >
              <h3 class="font-semibold text-lg">{{ faq.question }}</h3>
  
              <!-- chevron Feather avec rotation -->
              <span
                class="flex items-center"
                v-html="iconSvg(index)"
              />
            </button>
  
            <!-- Transition fluide -->
            <transition
              @before-enter="beforeEnter"
              @enter="enter"
              @after-enter="afterEnter"
              @before-leave="beforeLeave"
              @leave="leave"
            >
              <div v-show="openIndex === index" class="mt-4 text-gray-600 overflow-hidden">
                <p>{{ faq.answer }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import feather from "feather-icons";
  
  const openIndex = ref(null);
  
  const faqs = [
    {
      question: "Est-ce que la compression affecte la qualité de mes fichiers ?",
      answer: "Nos algorithmes réduisent la taille tout en préservant une qualité optimale. La différence est imperceptible à l'œil nu."
    },
    {
      question: "Quels formats de fichiers sont supportés ?",
      answer: "Nous supportons JPEG, PNG, GIF, WEBP pour les images, et MP4, MOV, AVI pour les vidéos."
    },
    {
      question: "Combien de temps mes fichiers restent-ils sur vos serveurs ?",
      answer: "Tous les fichiers sont supprimés automatiquement après 24h. Vous pouvez aussi les effacer manuellement."
    }
  ];
  
  const toggle = (i) => {
    openIndex.value = openIndex.value === i ? null : i;
  };
  
  // icône Feather dynamique
  const iconSvg = (index) => {
    const classes =
      "w-5 h-5 text-gray-500 transform transition-transform duration-300 ease-in-out " +
      (openIndex.value === index ? "rotate-180" : "");
    return feather.icons["chevron-down"].toSvg({ class: classes });
  };
  
  // Transition hooks pour height + opacity
  const beforeEnter = (el) => {
    el.style.height = "0";
    el.style.opacity = "0";
  };
  const enter = (el) => {
    el.style.transition = "height 0.3s ease, opacity 0.3s ease";
    el.style.height = el.scrollHeight + "px";
    el.style.opacity = "1";
  };
  const afterEnter = (el) => {
    el.style.height = "auto";
  };
  const beforeLeave = (el) => {
    el.style.height = el.scrollHeight + "px";
    el.style.opacity = "1";
  };
  const leave = (el) => {
    el.style.transition = "height 0.3s ease, opacity 0.3s ease";
    void el.offsetHeight; // forcer recalcul pour la transition
    el.style.height = "0";
    el.style.opacity = "0";
  };
  </script>
  
  <style scoped>
  /* tout est géré via JS hooks, pas besoin de styles transition ici */
  </style>
  