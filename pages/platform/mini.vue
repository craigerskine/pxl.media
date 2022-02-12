<template>
  <div>
    <mast
      title="Mini"
      label="Mini / Classic"
      ico="compress-arrows-alt"
      :data_1="systemsMinisPage.length"
      data_1_label="Systems"
    />
    <heading>Systems owned</heading>
    <ul class="container mx-auto flex flex-wrap">
      <category v-for="system of systemsMinisPage"
        :key="system.slug"
        :bg_img="'/assets/img/systems/mini-'+ system.slug +'.png'"
        :title="system.title"
        :subtext="system.variation + system.accessories"
      />
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content }) {
      const systemsMinisPage = await $content("systems").where({ system_type: { $eq: 'mini' } }).fetch();
      return {
        systemsMinisPage
      };
    },
    head() {
      return {
        title: 'Mini',
      };
    },
  }
</script>