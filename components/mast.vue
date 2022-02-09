<template>
  <a :href="url" :class="['container mx-auto flex items-center', url ? 'transition hover:(text-white) focus:(text-white)' : 'pointer-events-none']">
    <div class="py-1 pr-4 text-7xl leading-none tracking-tight flex-1">
      <span class="flex items-center"><slot /></span>
      <b v-if="label" :class="[
        'py-1 tracking-normal uppercase opacity-75',
        home ? 'text-sm block md:text-xl' : 'text-xl hidden sm:block'
      ]">
        {{ label }}
      </b>
    </div>
    <ul class="ml-auto py-1 text(right xs) leading-tight font-bold uppercase">
      <li v-for="i in 3" v-if="(i === 1 && data_1) || (i === 2 && data_2) || (i === 3 && data_3)" class="py-1">
        <b class="block text-sm" v-text="i === 1 ? data_1 : (i === 2) ? data_2 : data_3"></b>
        <small class="opacity-75" v-text="i === 1 ? data_1_label : (i === 2) ? data_2_label : data_3_label"></small>
      </li>
    </ul>
  </a>
</template>

<script>
  export default {
    props: [
      'label',
      'url',
      'data_1',
      'data_1_label',
      'data_2',
      'data_2_label',
      'data_3',
      'data_3_label',
      'home',
    ]
  }
</script>