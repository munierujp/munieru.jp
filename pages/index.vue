<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-heading-first>{{ $t('APP_NAME') }}</app-heading-first>
    </v-flex>
    <v-flex>
      <app-profile-icon url="profile.jpg" />
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
      <app-heading-second>{{ $t('HEADER_LINKS') }}</app-heading-second>
    </v-flex>
    <v-flex text-xs-center>
      <app-link-button
        v-for="link in links"
        :key="link.title"
        v-bind="link"
      />
    </v-flex>
    <v-flex>
      <app-heading-second>{{ $t('HEADER_SKILLS') }}</app-heading-second>
    </v-flex>
    <v-flex text-xs-center>
      <app-skill-button
        v-for="skill in skills"
        :key="skill.name"
        v-bind="skill"
      />
    </v-flex>
    <v-flex>
      <app-heading-second>{{ $t('HEADER_WORKS') }}</app-heading-second>
    </v-flex>
    <v-flex>
      <app-works />
    </v-flex>
    <v-flex>
      <app-heading-second>{{ $t('HEADER_BOOKS') }}</app-heading-second>
    </v-flex>
    <v-flex>
      <app-books />
    </v-flex>
    <v-flex>
      <app-heading-second>{{ $t('HEADER_DONATION') }}</app-heading-second>
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
import AppBooks from '~/components/AppBooks'
import AppGifteeButton from '~/components/AppGifteeButton'
import AppGitHubSponsorsButton from '~/components/AppGitHubSponsorsButton'
import AppHeadingFirst from '~/components/AppHeadingFirst'
import AppHeadingSecond from '~/components/AppHeadingSecond'
import AppLinkButton from '~/components/AppLinkButton'
import AppPayPalButton from '~/components/AppPayPalButton'
import AppProfileIcon from '~/components/AppProfileIcon'
import AppSkillButton from '~/components/AppSkillButton'
import AppText from '~/components/AppText'
import AppWishListButton from '~/components/AppWishListButton'
import AppWorks from '~/components/AppWorks'
import links from '~/modules/links.json'
import skills from '~/modules/skills.json'

export default {
  components: {
    AppBooks,
    AppGifteeButton,
    AppGitHubSponsorsButton,
    AppHeadingFirst,
    AppHeadingSecond,
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
