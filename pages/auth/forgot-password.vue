<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-t from-red-400 to-red-200"
  >
    <div class="flex-1 px-2 py-4 sm:p-8">
      <div
        class="relative w-full mx-auto shadow-xl sm:w-[24rem] overflow-hidden rounded-3xl"
      >
        <div
          class="relative z-50 overflow-hidden bg-opacity-0 bg-gradient-to-br from-red-400 to-red-700"
        >
          <div class="flex justify-center py-5">
            <nuxt-link to="/">
              <img
                src="@/assets/images/dbc-white-logo.svg"
                class="h-auto w-28"
                alt="logo"
              />
            </nuxt-link>
          </div>
        </div>

        <div
          class="relative z-50 px-4 pb-8 bg-opacity-0 bg-gradient-to-br from-gray-300 to-transparent sm:px-10"
        >
          <p class="pt-3 text-sm font-normal text-gray-600">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
          </p>

          <AppInputError class="!text-green-600 text-base pt-3" v-if="message">
            {{ message }}
          </AppInputError>

          <form @submit.prevent="sendResetLink" class="pt-5">
            <div>
              <input
                v-model="form.email"
                name="email"
                type="email"
                placeholder="Email"
                class="flex-grow w-full px-0 bg-transparent border-0 border-b border-gray-400 focus:border-red-300 focus:ring-0 focus:ring-b focus:ring-red-200 focus:ring-opacity-50 focus:outline-none"
              />
              <AppInputError v-if="errors.email">
                {{ errors.email[0] }}
              </AppInputError>
            </div>

            <div class="flex items-center justify-end mt-8">
              <button
                type="submit"
                class="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-gray-200 uppercase transition bg-red-400 border-2 border-transparent border-red-500 rounded-md hover:bg-red-500 hover:text-gray-300 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring focus:ring-red-300 disabled:opacity-25"
              >
                Email Password Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'guest',
  middleware: 'guest',
  data() {
    return {
      errors: [],
      message: null,
      form: {
        email: null,
      },
    }
  },
  methods: {
    async sendResetLink() {
      try {
        await this.$axios
          .post('auth/forgot-password', this.form)
          .then((data) => {
            this.message = data.data.message
            this.errors = []
            this.form.email = ''
          })
      } catch (e) {
        this.errors = e.response.data.errors
      }
    },
  },
}
</script>
