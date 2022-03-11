<template>
  <nuxt-link :to="url || '#'" :class="['group container mx-auto px-4 flex items-center relative', url ? '' : 'pointer-events-none']">
    <div :class="['py-1 pr-4 text-7xl leading-none tracking-tight flex-1', { 'flex items-center space-x-5': ico}]">
      <span class="flex items-center">
        <svg v-if="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" role="img" class="w-auto h-16 fill-current">
          <title>{{ title }}</title>
          <g v-html="logo"></g>
        </svg>
        <b class="text-gray-200 font-normal transition group-hover:(text-white) group-focus:(text-white)"><slot /></b>
        <i v-if="ico" :class="['fa-thin fa-fw text-5xl', 'fa-'+ ico]" :title="label"></i>
      </span>
      <b v-if="label" :class="[
        'py-1 tracking-normal uppercase opacity-75',
        home ? 'text-sm block md:(text-xl)' : 'text-xl hidden sm:(block)'
      ]">
        {{ label }}
      </b>
    </div>
    <ul class="ml-auto py-1 text(right xs) leading-tight font-bold uppercase">
      <li v-for="i in 3" v-if="(i === 1 && data_1) || (i === 2 && data_2) || (i === 3 && data_3)" class="py-2">
        <b class="block text(sm gray-200) leading-none" v-text="i === 1 ? data_1 : (i === 2) ? data_2 : data_3"></b>
        <small class="opacity-75" v-text="i === 1 ? data_1_label : (i === 2) ? data_2_label : data_3_label"></small>
      </li>
    </ul>
    <b v-if="hr" class="h-px bg-current text-gray-500 opacity-30 absolute bottom-0 inset-x-0 transition-all group-hover:(h-[2px] text-blue-400 opacity-100) group-focus:(h-[2px] text-blue-400 opacity-100)" aria-hidden="true"></b>
  </nuxt-link>
</template>

<script>
  export default {
    props: [
      'url',
      'title',
      'label',
      'logo',
      'ico',
      'url',
      'data_1',
      'data_1_label',
      'data_2',
      'data_2_label',
      'data_3',
      'data_3_label',
      'hr',
      'home',
    ]
  }
</script>