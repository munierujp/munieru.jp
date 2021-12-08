<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-header-1>{{ $t('APP_NAME') }}</app-header-1>
    </v-flex>
    <v-flex>
      <app-profile-icon url="icon.png" />
    </v-flex>
    <v-flex text-xs-center>
      <app-text
        font-size="24px"
        font-weight="bold"
      >
        {{ $t('NAME') }}
      </app-text>
    </v-flex>
    <v-flex text-xs-center>
      <app-text
        font-size="16px"
        v-html="$t('BIO')"
      />
    </v-flex>
    <v-flex>
      <app-header-2>{{ $t('HEADER_LINKS') }}</app-header-2>
    </v-flex>
    <v-flex text-xs-center>
      <app-link-button
        v-for="link in links"
        :key="link.title"
        v-bind="link"
      />
    </v-flex>
    <v-flex>
      <app-header-2>{{ $t('HEADER_SKILLS') }}</app-header-2>
    </v-flex>
    <v-flex text-xs-center>
      <app-skill-button
        v-for="skill in skills"
        :key="skill.name"
        v-bind="skill"
      />
    </v-flex>
    <v-flex>
      <app-header-2>{{ $t('HEADER_WORKS') }}</app-header-2>
    </v-flex>
    <v-flex>
      <app-works />
    </v-flex>
    <v-flex>
      <app-header-2>{{ $t('HEADER_BOOKS') }}</app-header-2>
    </v-flex>
    <v-flex>
      <app-books />
    </v-flex>
    <v-flex>
      <app-header-2>{{ $t('HEADER_DONATE') }}</app-header-2>
    </v-flex>
    <v-flex text-xs-center>
      <v-layout
        justify-space-around
        wrap
      >
        <v-flex>
          <app-git-hub-sponsors-button />
        </v-flex>
        <v-flex>
          <app-pay-pal-button />
        </v-flex>
        <v-flex>
          <app-wish-list-button />
        </v-flex>
        <v-flex>
          <app-giftee-button />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import links from '~/modules/links.json'
import skills from '~/modules/skills.json'
import AppBooks from '~/components/matters/AppBooks'
import AppGifteeButton from '~/components/matters/AppGifteeButton'
import AppGitHubSponsorsButton from '~/components/matters/AppGitHubSponsorsButton'
import AppHeader1 from '~/components/elements/AppHeader1'
import AppHeader2 from '~/components/elements/AppHeader2'
import AppLinkButton from '~/components/elements/AppLinkButton'
import AppPayPalButton from '~/components/matters/AppPayPalButton'
import AppProfileIcon from '~/components/matters/AppProfileIcon'
import AppSkillButton from '~/components/matters/AppSkillButton'
import AppText from '~/components/elements/AppText'
import AppWishListButton from '~/components/matters/AppWishListButton'
import AppWorks from '~/components/matters/AppWorks'

export default {
  components: {
    AppBooks,
    AppGifteeButton,
    AppGitHubSponsorsButton,
    AppHeader1,
    AppHeader2,
    AppLinkButton,
    AppPayPalButton,
    AppProfileIcon,
    AppSkillButton,
    AppText,
    AppWishListButton,
    AppWorks
  },
  data: () => ({
    links,
    skills
  })
}
</script>
