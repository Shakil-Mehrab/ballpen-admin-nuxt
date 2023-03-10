<template>
  <modal class="relative" name="app-image-index-modal">
    <div class="absolute top-2 right-2">
      <XIcon
        class="w-5 h-5 text-red-600 border border-red-500 rounded-full cursor-pointer p-0.5"
        @click="hideAppImageIndexModal"
      />
    </div>

    <div class="px-2 pt-8 sm:gap-2 sm:px-4">
      <div class="flex">
        <div
          class="p-3 bg-white border-b-0 border-gray-300 border-dashed cursor-pointer rounded-t-md"
          :class="tab === 'thumbnail' ? '-mb-0.5  border-2' : ''"
          @click.prevent="showThumbnails('thumbnail')"
        >
          Thumbnails
        </div>
        <div
          class="p-3 bg-white border-b-0 border-gray-300 border-dashed cursor-pointer rounded-t-md"
          :class="tab === 'upload' ? '-mb-0.5  border-2' : ''"
          @click.prevent="showThumbnails('upload')"
        >
          Upload
        </div>
        <div class="flex-grow p-2 pr-0 sm:gap-2 sm:pl-4">
          <input
            type="search"
            placeholder="Searh"
            @keyup="search"
            v-model="searching"
            class="flex-grow w-full h-8 px-2 border border-gray-300 rounded-md shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 focus:outline-none"
          />
        </div>
      </div>

      <div
        class="grid grid-cols-12 gap-3 p-3 border-2 border-gray-300 border-dashed rounded-md rounded-tl-none"
        v-show="tab === 'thumbnail'"
      >
        <template v-if="images.length">
          <div
            class="relative col-span-6 border border-gray-100 sm:col-span-4 md:col-span-3 lg:col-span-2 bg-gray-50"
            v-for="image in images"
            :key="image.id"
          >
            <input
              type="checkbox"
              :id="image.id"
              :name="image.id"
              :value="image.id"
              :checked="image.id == (selectedImg ? selectedImg.id : null)"
              class="absolute top-0 right-0"
              :class="{
                hidden: image.id != (selectedImg ? selectedImg.id : null),
              }"
            />
            <div @click.prevent="selectingImage(image)">
              <AppLabel :for="image.id">
                <img
                  v-if="image.original"
                  v-lazy="image.original"
                  :alt="image.name"
                  class="w-full h-auto"
                />
                <div class="px-1 py-2">
                  <p class="text-sm tracking-wider truncate">
                    {{ image.name }}
                  </p>
                  <p class="py-1">
                    <AppInput
                      type="text"
                      class="py-1 text-xs h-7"
                      :value="image.original"
                    />
                  </p>
                  <p class="text-xs tracking-wider truncate">
                    {{ image.formatted_date_time }}
                  </p>
                </div>
              </AppLabel>
            </div>
          </div>
        </template>
        <div v-else class="col-span-12">
          <div class="flex justify-center">
            <div class="text-center">
              <p class="text-sm text-gray-600">No images found.</p>
            </div>
          </div>
        </div>
      </div>
      <AppPagination
        :meta="meta"
        v-if="meta.last_page > 1 && tab === 'thumbnail'"
      />
      <div
        class="p-3 border-2 border-gray-300 border-dashed rounded-md rounded-tl-none"
        v-show="tab === 'upload'"
      >
        <div class="flex flex-wrap">
          <div class="w-full">
            <div class="mt-1">
              <label
                for="file-upload"
                class="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                v-if="!temporaryThumb"
              >
                <div class="flex justify-center px-6 pt-5 pb-6 cursor-pointer">
                  <div class="space-y-1 text-center">
                    <ImagePlus for="file-upload" />
                    <div class="flex text-sm text-gray-600">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        id="file-upload"
                        name="file-upload"
                        placeholder="Choose a file..."
                        drop-placeholder="Drop file here..."
                        @change="selectingThumbnail"
                        class="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                      />

                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </label>

              <div class="p-2 sm:p-4 lg:p-8" v-if="temporaryThumb">
                <form @submit.prevent="uploadThumbnail">
                  <div>
                    <AppLabel class="text-base font-semibold text-green-700"
                      >Image Preview :</AppLabel
                    >

                    <div class="relative flex justify-center">
                      <transition name="fade">
                        <vue-cropper
                          v-if="temporaryThumb"
                          ref="cropper"
                          :aspect-ratio="600 / 358"
                          :autoCropArea="1"
                          :src="temporaryThumb"
                          @crop="cropThumb"
                          style="
                            width: 100%;
                            max-width: 100%;
                            height: auto;
                            max-height: 560px;
                          "
                        >
                        </vue-cropper>
                      </transition>
                      <div class="z-50 p-1 -ml-10">
                        <XIcon
                          class="w-6 h-6 text-gray-700 border border-gray-700 rounded-full cursor-pointer p-0.5 bg-gray-200"
                          @click.prevent="removeThumbnail"
                        />
                      </div>
                    </div>
                    <AppInputError v-if="errors.thumbnail">
                      {{ errors.thumbnail[0] }}
                    </AppInputError>
                  </div>

                  <div class="my-5">
                    <div sm="2">
                      <AppLabel for="name">Name:</AppLabel>
                    </div>
                    <div sm="10">
                      <AppInput
                        id="name"
                        placeholder="Name"
                        type="text"
                        v-model="form.name"
                      />
                      <AppInputError v-if="errors.name">
                        {{ errors.name[0] }}
                      </AppInputError>
                    </div>
                  </div>

                  <div class="mt-5">
                    <AppButton
                      type="submit"
                      class="w-full text-white vertical-gradient hover:bg-red-700 focus:ring-red-500"
                      >Upload</AppButton
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { XIcon } from '@vue-hero-icons/outline'
import AppPagination from '../AppPagination.vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  data() {
    return {
      errors: [],
      images: [],
      meta: {},
      tab: 'thumbnail',
      searching: '',
      selectedImg: null,

      uploading: false,
      isLoading: false,
      temporaryThumb: null,
      thumbnail: null,
      viewSelectedImage: null,

      form: {
        photo: null,
        name: '',
        path: '',
        location: '',
        source: '',
        comment: '',
        caption: '',
        acceptSize: 1,
        cropX: 0,
        cropY: 0,
        cropWidth: null,
        cropHeight: null,
      },
    }
  },
  props: {
    selectedThumb: {
      required: false,
      type: Object,
      default: null,
    },
  },
  components: {
    XIcon,
    AppPagination,
    VueCropper,
  },
  watch: {
    selectedImg(image) {
      this.$emit('selectedImageFromModal', image)
    },

    '$route.query'(query) {
      this.getImages(query)
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

    async uploadThumbnail() {
      try {
        let formData = new FormData()
        formData.append('thumbnail', this.thumbnail)
        formData.append('name', this.form.name)
        formData.append('path', this.form.path)
        formData.append('location', this.form.location)
        formData.append('source', this.form.source)
        formData.append('comment', this.form.comment)
        formData.append('caption', this.form.caption)
        formData.append('acceptSize', this.form.acceptSize)
        formData.append('cropX', this.form.cropX)
        formData.append('cropY', this.form.cropY)
        formData.append('cropWidth', this.form.cropWidth)
        formData.append('cropHeight', this.form.cropHeight)

        await this.$axios.post(`v2/admin/images`, formData).then(({ data }) => {
          this.statusMessage('success', 'Thumbnail uploaded successfully')
          this.getImages()
          this.temporaryThumb = null
          this.tab = 'thumbnail'
          this.hideAppImageCropingModal()
        })
      } catch (e) {
        this.errors = e.response.data.errors
        this.statusMessage('error', 'Something wrong')
      }
    },

    async search(e) {
      await this.$router
        .replace({
          query: Object.assign({}, this.$route.query, {
            search: e.target.value,
          }),
        })
        .catch(() => {})
    },

    hideAppImageCropingModal() {
      this.$modal.hide('app-image-croping-modal')
    },

    selectingImage(arg) {
      this.selectedImg = arg
    },

    hideAppImageIndexModal() {
      this.$modal.hide('app-image-index-modal')
    },

    showAppImageIndexModal() {
      this.$modal.show('app-image-index-modal')
    },

    showThumbnails(option) {
      this.tab = option
    },

    removeThumbnail() {
      this.temporaryThumb = null
    },

    cropThumb(event) {
      this.form.cropX = event.detail.x
      this.form.cropY = event.detail.y
      this.form.cropWidth = event.detail.width
      this.form.cropHeight = event.detail.height
    },

    async selectingThumbnail(e) {
      if ((this.uploading = true)) {
        this.$modal.show('app-image-croping-modal')

        if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
          return
        }
        this.thumbnail = e.target.files[0]
        const file = e.target.files[0]

        this.temporaryThumb = URL.createObjectURL(file)

        const name = file.name
        const lastDot = name.lastIndexOf('.')

        this.form.name = name.substring(0, lastDot)
      }
    },

    async getImages(query = this.$route.query) {
      try {
        await this.$axios
          .$get('v2/admin/images?per-page=6', {
            params: {
              page: query.page,
              ...query,
            },
          })
          .then((response) => {
            this.images = response.data
            this.meta = response.meta
          })
      } catch (e) {}
    },
  },

  mounted() {
    this.getImages()
  },
}
</script>
<style>
.image-index .vm--modal {
  width: 80% !important;
  height: 90% !important;
  top: 50px !important;
  bottom: 0 !important;
  margin: auto !important;
  left: 0 !important;
  right: 0 !important;
  overflow: scroll;
}

@media only screen and (max-width: 768px) {
  .image-index .vm--modal {
    width: 100% !important;
  }
}
</style>
