<template>
    <nav class="flex justify-center">
        <ul class="flex pl-0 list-none rounded bg-white">
            <li class="ml-0 rounded-l block py-2 px-3">
                <span v-if="selectedPage===1" aria-hidden="true" v-html="<<"/>
                <a :aria-label="First Page"
                   class="link"
                   href="#"
                   @click.prevent="emitChangePageEvent(1)"
                   v-html="<<" v-else/>
            </li>

            <li class="block py-2 px-3">
                <span v-if="selectedPage===1" aria-hidden="true" v-html="<"/>
                <a class="link" href="#"
                   @click.prevent="emitChangePageEvent(meta.current_page - 1)"
                   :aria-label="Previous Page"
                   v-html="<"
                   v-else/>
            </li>

            <li v-for="(page, index) in pages" :key="index">
                <a class="block py-2 px-3" href="#"
                   :class="activeClasses(page)"
                   @click.prevent="emitChangePageEvent(page)"
                   v-html="page"/>
            </li>

            <li class="block py-2 px-3">
                <span v-if="meta.last_page === selectedPage" aria-hidden="true" v-html=">"/>
                <a class="link" href="#"
                   @click.prevent="emitChangePageEvent(meta.current_page + 1)"
                   :aria-label="Next Page"
                   v-html=">"
                   v-else/>
            </li>

            <li class="ml-0 rounded-r block py-2 px-3">
                <span v-if="meta.last_page === selectedPage" aria-hidden="true" v-html=">>"/>
                <a class="link" href="#"
                   @click.prevent="emitChangePageEvent(meta.last_page)"
                   :aria-label="Last Page"
                   v-html=">>"
                   v-else/>
            </li>
        </ul>
    </nav>
</template>

<script>
  export default {
    name: 'pagination',

    props: {
      meta: {
        required: true,
        type: Object,
      },
    },

    data: () => ({
      selectedPage: 1,
    }),

    methods: {
      emitChangePageEvent(page) {
        if(page > this.meta.last_page || page < 1) {
          return;
        }

        if(this.isActive(page)) {
          return;
        }

        this.selectedPage = page;

        this.$emit('page:changed', page);
      },

      isActive(page) {
        return page === this.meta.current_page;
      },

      activeClasses(page) {
        return this.isActive(page)
          ? ['bg-blue-500', 'text-white', 'cursor-not-allowed']
          : ['bg-white', 'border-gray-400'];
      },
    },

    computed: {
      pages() {
        let result = Math.ceil(this.meta.total / this.meta.per_page);

        return result < 1
          ? 1
          : result;
      },
    },
  };
</script>
