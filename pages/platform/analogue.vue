<template>
  <div>
    <mast v-for="platform of platformAnalogueMast"
      :key="platform.slug"
      :title="platform.title"
      :logo="platform.logo"
      :data_1="systemsAnaloguePage.length"
      data_1_label="Systems"
    />
    <heading>Systems owned</heading>
    <ul class="container mx-auto flex flex-wrap">
      <category v-for="system of systemsAnaloguePage"
        :key="system.slug"
        :bg_img="'/assets/img/systems/analogue-'+ system.slug +'.png'"
        :title="system.title"
        :subtext="system.variation + system.accessories"
      />
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content }) {
      const platformAnalogueMast = await $content("_platform").where({ slug: { $eq: 'analogue' } }).fetch();
      const systemsAnaloguePage = await $content("systems").where({ platform: { $eq: 'analogue' } }).fetch();
      return {
        platformAnalogueMast,
        systemsAnaloguePage
      };
    },
    head() {
      return {
        title: 'Analogue',
      };
    },
  }
</script>