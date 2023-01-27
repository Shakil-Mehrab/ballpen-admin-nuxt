<template>
  <modal name="app-article-delete-modal">
    <div class="p-4">
      <h1 class="text-base font-normal">Are you sure to delete?</h1>
      <!-- <div>{{ selectedSlugFromArticlePage }}</div> -->
      <div class="flex justify-end mt-3 space-x-3">
        <a
          href="#"
          @click.prevent="deleteArticle"
          class="px-4 py-1 text-base font-normal text-white transition duration-300 bg-red-600 border rounded-md hover:bg-red-500"
          >Delete</a
        >
        <a
          href="#"
          @click.prevent="hideArticleDeleteModal"
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
    selectedSlugFromArticlePage: {
      required: true,
      type: String | null,
    },
  },

  methods: {
    hideArticleDeleteModal() {
      this.$modal.hide('app-article-delete-modal')
    },

    showCatDeleteModal() {
      this.$modal.show('app-article-delete-modal')
    },

    deleteArticle() {
      this.$emit(
        'deleteActionFromArticleModal',
        this.selectedSlugFromArticlePage
      )
    },
  },
}
</script>

<style>
.delete-modal .vm--container .vm--modal {
  width: 35% !important;
  height: 100px !important;
  overflow: hidden !important;
  top: 50px !important;
  bottom: 0 !important;
  margin: auto !important;
  left: 0 !important;
  right: 0 !important;
}

@media only screen and (max-width: 768px) {
  .delete-modal .vm--container .vm--modal {
    width: 80% !important;
  }
}
</style>
