<template>
  <div>
    <heading subtext="Examples">Filtered Games</heading>
    <ul class="list-none grid(& cols-1) gap-4">
      <li v-for="item in ['Dragon Quest', 'Final Fantasy', 'Mega Man', 'Monster Hunter']" :key="item">
        <nuxt-link :to="'/filter/'+ item.toLowerCase().replace(' ', '-') +'/'">{{ item }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: 'Filtered Games',  
      };
    },
    layout: 'default' // you can set a custom layout for the error page
  }
</script>