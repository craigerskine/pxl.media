<template>
  <div>
    <mast v-for="platform of platformPolymegaMast"
      :key="platform.slug"
      :title="platform.title"
      :logo="platform.logo"
      :data_1="systemsPolymegaPage.length"
      data_1_label="Systems"
    />
    <heading>Systems owned</heading>
    <ul class="container mx-auto flex flex-wrap">
      <category v-for="system of systemsPolymegaPage"
        :key="system.slug"
        :bg_img="'/assets/img/systems/polymega-'+ system.slug +'.png'"
        :title="system.title"
        :subtext="system.variation + system.accessories"
      />
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content }) {
      const platformPolymegaMast = await $content("_platform").where({ slug: { $eq: 'polymega' } }).fetch();
      const systemsPolymegaPage = await $content("systems").where({ platform: { $eq: 'polymega' } }).fetch();
      return {
        platformPolymegaMast,
        systemsPolymegaPage,
      };
    },
    head() {
      return {
        title: 'Polymega',
      };
    },
  }
</script>