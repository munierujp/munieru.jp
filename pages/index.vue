<template>
  <v-container grid-list-xl>
    <v-layout
      column
      align-center>
      <v-flex>
        <app-header-1>{{ $t('NAME') }}</app-header-1>
      </v-flex>
      <v-flex>
        <app-profile-icon url="icon.png" />
      </v-flex>
      <v-flex>
        <app-header-2>{{ $t('HEADER_PROFILE') }}</app-header-2>
      </v-flex>
      <v-flex text-xs-center>
        <span v-html="$t('BIO')"/>
      </v-flex>
      <v-flex>
        <app-header-2>{{ $t('HEADER_LINKS') }}</app-header-2>
      </v-flex>
      <v-flex text-xs-center>
        <app-link-button
          v-for="link in links"
          :key="link.title"
          v-bind="link" />
      </v-flex>
      <v-flex>
        <app-header-2>{{ $t('HEADER_SKILLS') }}</app-header-2>
      </v-flex>
      <v-flex text-xs-center>
        <app-skill-button
          v-for="skill in skills"
          :key="skill.title"
          v-bind="skill" />
      </v-flex>
      <v-flex>
        <app-header-2>{{ $t('HEADER_WORKS') }}</app-header-2>
      </v-flex>
      <v-flex>
        <v-layout
          justify-space-around
          wrap>
          <v-flex
            v-for="work in works"
            :key="work.title"
            xs12
            sm6>
            <app-work-card v-bind="work" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import links from '~/modules/links.json'
import skills from '~/modules/skills.json'
import works from '~/modules/works.json'
import AppHeader1 from '~/components/AppHeader1'
import AppHeader2 from '~/components/AppHeader2'
import AppLinkButton from '~/components/AppLinkButton'
import AppProfileIcon from '~/components/AppProfileIcon'
import AppSkillButton from '~/components/AppSkillButton'
import AppWorkCard from '~/components/AppWorkCard'

export default {
  components: {
    AppHeader1,
    AppHeader2,
    AppLinkButton,
    AppProfileIcon,
    AppSkillButton,
    AppWorkCard
  },
  data: () => ({
    links,
    skills,
    works
  })
}
</script>
