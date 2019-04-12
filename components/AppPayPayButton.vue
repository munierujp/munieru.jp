<template>
  <div>
    <app-button
      v-bind="link"
      @click.stop="open" />
    <v-dialog
      v-model="showDialog"
      width="320px">
      <v-card>
        <v-card-title class="headline">
          {{ $t('DONATE_WITH_PAYPAY_TITLE') }}
        </v-card-title>
        <v-card-text>
          <v-img src="paypay.png" />
        </v-card-text>
        <v-card-text>
          {{ $t('DONATE_WITH_PAYPAY_DESCRIPTION') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            flat
            @click="close">
            {{ $t('CLOSE') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton'

export default {
  components: {
    AppButton
  },
  data: () => ({
    showDialog: false
  }),
  computed: {
    link () {
      return {
        title: this.$t('PAYPAY'),
        label: this.$t('PAYPAY'),
        image: 'https://image.paypay.ne.jp/favicon.ico',
        color: '#ff0033',
        dark: true
      }
    }
  },
  methods: {
    open () {
      this.showDialog = true
    },
    close () {
      this.showDialog = false
    }
  }
}
</script>
