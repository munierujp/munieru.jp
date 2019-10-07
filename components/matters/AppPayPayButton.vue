<template>
  <div>
    <app-button
      v-bind="link"
      @click.stop="open"
    />
    <v-dialog
      v-model="showDialog"
      width="320px"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $t('DONATE_WITH_PAYPAY_TITLE') }}
        </v-card-title>
        <v-layout justify-center>
          <v-flex xs6>
            <v-img src="paypay.png" />
          </v-flex>
        </v-layout>
        <v-card-text>
          <i18n
            tag="span"
            path="DONATE_WITH_PAYPAY_MESSAGE"
          >
            <span place="id">{{ paypayId }}</span>
          </i18n>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <app-dialog-button
            :label="$t('COPY_PAYPAY_ID')"
            @click="copy"
          />
          <app-dialog-button
            :label="$t('CLOSE')"
            @click="close"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AppButton from '~/components/elements/AppButton'
import AppDialogButton from '~/components/elements/AppDialogButton'
import copyToClipboard from '~/modules/copyToClipboard'

const { PAYPAY_ID } = process.env.config

export default {
  components: {
    AppButton,
    AppDialogButton
  },
  data: () => ({
    paypayId: PAYPAY_ID,
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
    },
    copy () {
      const copied = copyToClipboard(PAYPAY_ID)
      this.showDialog = !copied
    }
  }
}
</script>
