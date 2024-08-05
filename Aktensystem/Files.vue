<template>
    <div class="p-m-4">
      <h2>Dokumente</h2>
      <button @click="loadFiles">Dokument laden</button>
      <div v-if="files.length">
        <div v-for="file in files" :key="file._id" class="p-card p-mb-2">
          <div class="p-card-body">
            <h3>{{ file.name }}</h3>
            <p>{{ file.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'Files',
    setup() {
      const files = ref([]);
  
      const loadFiles = async () => {
        const response = await axios.get('http://localhost:3000/files');
        files.value = response.data;
      };
  
      return { files, loadFiles };
    },
  };
  </script>
  
  <style scoped>
  </style>
  