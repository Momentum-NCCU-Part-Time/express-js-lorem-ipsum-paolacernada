<template>
  <div id="app">
    <h1>Lorem Ipsum Generator</h1>
    <button @click="generateLoremIpsum" type="submit">Generate</button>
    <div class="text-container" v-if="generatedText">
      <h2>Generated Lorem Ipsum Text:</h2>
      <p v-for="(paragraph, index) in generatedText" :key="index">{{ paragraph }}</p>
    </div>
    <div v-if="errorMsg" class="error">
      <p>{{ errorMsg }}. Please try again.</p>
    </div> 
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const generatedText = ref(null);
    const errorMsg = ref(null);
    
    const generateLoremIpsum = () => {
      errorMsg.value = null;
      fetch('http://localhost:3000/lorem')
        .then(response => response.json())
        .then(data => {
          generatedText.value = data.lorem.split('\n');
        })
        .catch(error => {
          errorMsg.value = error.message;
          console.error(error);
        });
    };

    return {
      generatedText,
      generateLoremIpsum,
      errorMsg
    };
  }
};
</script>

<style scoped>
  
  #app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: auto;
}
.text-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 1rem;
}
.error {
  background-color: #FBACBE;
  padding: 0.5rem;
  margin-top: 1rem;
}
</style>
