<template>
  <div>
    <div>Celonis 列表</div>
    <div
      v-for="(workspace, index) in workspaceList"
      :key="index"
    >{{ workspace }}</div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import Workspace from '@/modules/Workspace/store'

export default {
  name: 'workspacesList',
  computed: {
    ...mapGetters({
      workspaceList: 'Workspace/workspaceList',
    })
  },
  async created () {
    await this.$store.dispatch(Workspace.getAction('GetWorkspaceList'))
  }
}

</script>
