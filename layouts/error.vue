<template>
  <div class="h-screen px-4 mx-auto sm:px-6 lg:px-8">
    <div class="flex items-center justify-center h-full">
      <div class="">
        <h1 class="text-3xl font-bold text-center text-red-600">
          {{ error.statusCode }}
        </h1>
        <h2 class="text-3xl font-bold text-center text-red-600">
          Something is wrong!
        </h2>
        <p class="mt-4 text-base font-medium text-center text-gray-500">
          The page you are looking for was moved, removed, renamed or might
          never.
        </p>

        <nuxt-link
          to="/"
          class="block mt-4 text-base font-medium text-center text-blue-500 underline"
        >
          Back to Homepage
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'guest',
  data() {
    return {
      keywords: '',
    }
  },
  head: {
    title: 'Error',
  },
  methods: {
    async searchResults() {
      if (!this.keywords) {
        return
      }
      // this.showSearch = false
      this.$router.push({
        name: 'news',
        query: { keywords: this.keywords },
      })
    },
  },
}
</script>

<style>
.error-content {
  text-align: center !important;
}
.error-content .status-code {
  font-size: 90px !important;
  color: #de1f26;
}
.error-content .status-message {
  font-size: 40px !important;
}
.error-content p {
  font-size: 20px !important;
}
</style>
