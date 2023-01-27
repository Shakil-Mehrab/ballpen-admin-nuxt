<template>
  <aside class="px-1 mt-3 sm:px-0 sm:mt-0">
    <div
      class="w-full mx-auto overflow-y-auto bg-white border-l border-gray-200 rounded-md sm:rounded-none sm:w-68 md:w-72"
    >
      <div
        class="h-full sm:min-h-[850px] p-2 pb-16 space-y-6 sm:p-3"
        v-if="image && aside"
      >
        <form @submit.prevent="updateThumbnail(image.id)">
          <div>
            <div class="block w-full overflow-hidden aspect-w-10 aspect-h-7">
              <a v-if="image.original" :href="image.original">
                <img
                  v-if="image.original"
                  v-lazy="image.original"
                  :alt="image.name"
                  class="object-cover"
                />
              </a>
            </div>
            <div class="flex w-full mt-4">
              <AppInput
                placeholder="Url"
                type="text"
                id="copy_url"
                name="copy_url"
                class="h-8"
                :value="image.original"
              />
              <div
                class="w-8 h-8 ml-1 cursor-pointer"
                title="click to copy url"
                @click.prevent="copyUrl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-full h-full p-1 text-green-600 border rounded"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                  />
                </svg>
              </div>
            </div>
            <div class="w-full mt-4">
              <AppInput
                placeholder="name"
                type="text"
                id="name"
                name="name"
                class="h-8"
                v-model="form.name"
              />
              <AppInputError v-if="errors.name">
                {{ errors.name[0] }}
              </AppInputError>
            </div>
          </div>
          <div class="mt-5">
            <h3 class="font-medium text-gray-900">Information</h3>
            <dl
              class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Uploaded by :</dt>
                <dd class="text-gray-900" v-if="image.user">
                  {{ image.user.name }}
                </dd>
              </div>

              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Created At :</dt>
                <dd class="text-sm text-gray-900">
                  {{ image.formatted_date_time }}
                </dd>
              </div>

              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Dimensions :</dt>
                <dd class="text-gray-900">4032 x 3024</dd>
              </div>

              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Size :</dt>
                <dd class="text-gray-900">{{ image.size }}</dd>
              </div>
            </dl>
          </div>

          <div class="flex mt-5">
            <AppButton
              class="px-4 text-white vertical-gradient hover:bg-red-700 focus:ring-red-500"
              type="submit"
            >
              Update
            </AppButton>
            <button
              type="button"
              class="flex-1 px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="deleteImage(image.id)"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <div class="inset-y-0 w-full sm:fixed" v-else>
        <div class="relative flex flex-col flex-grow h-full bg-white">
          <div
            class="w-full border-2 border-gray-200 border-dashed sm:mb-4 sm:absolute top-16"
          >
            <div
              class="flex items-center px-4 m-auto text-base font-semibold text-green-500 sm:h-[850px] h-20"
            >
              <div class="sm:-mt-60">Select an image to view and edit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      errors: '',
      aside: true,
      form: {
        name: this.image ? this.image.name : null,
      },
    }
  },
  watch: {
    image: function (val) {
      this.form.name = val.name
      this.aside = true
    },
  },
  props: {
    image: {
      required: false,
      type: Object,
      default: null,
    },
  },
  methods: {
    statusMessage(type, message) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      })
      Toast.fire({
        icon: type,
        title: message,
      })
    },

    async updateThumbnail(thumbnailId) {
      try {
        await this.$axios
          .patch(`v2/admin/images/${thumbnailId}`, this.form)
          .then(({ data }) => {
            this.$emit('reloadPage')
            this.statusMessage('success', 'Thumbnail updated successfully')
            this.errors = ''
          })
      } catch (e) {
        ;(this.errors = e.response.errors),
          this.statusMessage('error', 'Something went wrong')
      }
    },

    async deleteImage(thumbnailId) {
      try {
        await this.$axios
          .delete(`v2/admin/images/${thumbnailId}`)
          .then(({ data }) => {
            this.$emit('reloadPage')
            this.statusMessage('success', 'Thumbnail deleted successfully')
            this.aside = false
            this.errors = ''
          })
      } catch (error) {
        if (error.response.status === 500) {
          this.statusMessage('error', 'Server Error')
        } else {
          this.statusMessage('error', 'Something went wrong')
        }
      }
    },

    copyUrl() {
      document.getElementById('copy_url').select()
      if (document.execCommand('copy')) {
        this.statusMessage('success', 'Copied successfully')
      }
    },
  },
}
</script>
