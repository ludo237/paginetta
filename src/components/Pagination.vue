<template>
    <nav class="flex justify-center">
        <ul class="flex pl-0 list-none rounded">
            <li>
                <a class="ml-0 rounded-l relative block bg-white border-gray-400 py-2 px-3 cursor-pointer" href="#"
                   @click.prevent="emitChangePageEvent(1)"
                   :disable="selectedPage===1"
                   :aria-label="$trans.get('pagination.first.text')">
                    <span aria-hidden="true">first</span>
                </a>
            </li>

            <li>
                <a class="relative block bg-white border-gray-400 py-2 px-3 cursor-pointer" href="#"
                   @click.prevent="emitChangePageEvent(meta.current_page - 1)"
                   :disable="selectedPage===1"
                   :aria-label="$trans.get('pagination.previous.text')">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li v-for="(page, index) in pages" :key="index">
                <a class="relative block py-2 px-3 cursor-pointer"
                   :disable="isActive(page)" :class="activeClasses(page)"
                   href="#" @click.prevent="emitChangePageEvent(page)">
                    <span>{{ page }}</span>
                </a>
            </li>

            <li>
                <a class="relative block bg-white border-gray-400 py-2 px-3 cursor-pointer" href="#"
                   @click.prevent="emitChangePageEvent(meta.current_page + 1)"
                   :disable="meta.last_page === selectedPage"
                   :aria-label="$trans.get('pagination.next.text')">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>

            <li>
                <a class="ml-0 rounded-r relative block bg-white border-gray-400 py-2 px-3 cursor-pointer" href="#"
                   @click.prevent="emitChangePageEvent(meta.last_page)"
                   :disable="meta.last_page === selectedPage"
                   :aria-label="$trans.get('pagination.last.text')">
                    <span aria-hidden="true">last</span>
                </a>
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

        this.selectedPage = page;

        this.$emit('page:changed', page);
      },

      isActive(page) {
        return page === this.meta.current_page;
      },

      activeClasses(page) {
        return this.isActive(page)
          ? ['bg-blue-400', 'border-blue-400', 'text-white']
          : ['bg-white', 'border-gray-400'];
      },
    },

    computed: {
      pages() {
        return Math.round(this.meta.total / this.meta.per_page);
      },
    },
  };
</script>

<style lang="sass">
  @import "../assets/pagination.scss";
</style>

