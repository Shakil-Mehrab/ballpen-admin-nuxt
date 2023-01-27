<template>
  <modal name="app-category-delete-modal">
    <div class="p-4">
      <h1 class="text-base font-normal">Are you sure to delete?</h1>
      <!-- <div>{{ selectedSlugFromCatPage }}</div> -->
      <div class="flex justify-end mt-3 space-x-3">
        <a
          href="#"
          @click.prevent="deleteCat"
          class="px-4 py-1 text-base font-normal text-white transition duration-300 bg-red-600 border rounded-md hover:bg-red-500"
          >Delete</a
        >
        <a
          href="#"
          @click.prevent="hideCatDeleteModal"
          class="px-4 py-1 text-base font-normal text-gray-700 transition duration-300 bg-gray-100 border rounded-md hover:bg-blue-500 hover:text-white"
          >Cancel</a
        >
      </div>
    </div>
  </modal>
</template>

<script>
import { XIcon } from '@vue-hero-icons/outline'
export default {
  components: {
    XIcon,
  },

  props: {
    selectedSlugFromCatPage: {
      required: true,
      type: String | null,
    },
  },

  methods: {
    hideCatDeleteModal() {
      this.$modal.hide('app-category-delete-modal')
    },

    showCatDeleteModal() {
      this.$modal.show('app-category-delete-modal')
    },

    deleteCat() {
      this.$emit('deleteActionFromCatModal', this.selectedSlugFromCatPage)
    },
  },
}
</script>
