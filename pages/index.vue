<template>
  <v-container grid-list-xl>
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
        <app-header-2>{{ $t('HEADER_DONATE') }}</app-header-2>
      </v-flex>
      <v-flex text-xs-center>
        <v-layout
          justify-space-around
          wrap
        >
          <v-flex>
            <app-pay-pay-button />
          </v-flex>
          <v-flex>
            <app-wish-list-button />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import links from '~/modules/links.json'
import skills from '~/modules/skills.json'
import AppHeader1 from '~/components/AppHeader1'
import AppHeader2 from '~/components/AppHeader2'
import AppLinkButton from '~/components/AppLinkButton'
import AppPayPayButton from '~/components/AppPayPayButton'
import AppProfileIcon from '~/components/AppProfileIcon'
import AppSkillButton from '~/components/AppSkillButton'
import AppText from '~/components/AppText'
import AppWishListButton from '~/components/AppWishListButton'
import AppWorks from '~/components/AppWorks'

export default {
  components: {
    AppHeader1,
    AppHeader2,
    AppLinkButton,
    AppPayPayButton,
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
