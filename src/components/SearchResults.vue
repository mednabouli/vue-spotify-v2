<template lang="pug">
  div.container
    ul.list-group
      li.list-group-item(v-for='result in searchResults')
        div.media
          div.media-left
            img.media-object(v-if='result.imageUrl', :src='result.imageUrl' height='64px' width='64px')
          div.media-body
            h4.media-heading {{ result.name }}
    button.btn.btn-default.center-block(v-if='hasMoreResults' @click='loadMoreResults()')
      span Show more results
</template>

<script>
import {fetchByType} from '../api'
const UP = 'UP'

export default {
  name: 'search-results',
  created () {
    this.routeChanged()
  },
  data () {
    return {
      hasMoreResults: true,
      searchResults: [],
      offset: 0
    }
  },
  methods: {
    routeChanged () {
      // clean up
      this.offset = 0
      this.hasMoreResults = true

      let type = this.$route.params.type
      let query = this.$route.params.query
      if (!query) {
        this.searchResults = []
        return
      }
      fetchByType(query, type)
        .then(res => {
          this.searchResults = res
          this.handleScroll(UP)
        })
    },
    loadMoreResults () {
      let type = this.$route.params.type
      let query = this.$route.params.query
      this.offset += 10
      fetchByType(query, type, this.offset).then(res => {
        if (res.length < 10) this.hasMoreResults = false
        this.searchResults = [
          ...this.searchResults,
          ...res
        ]
      })
    },
    handleScroll (direction) {
      this.$nextTick(() => {
        switch (direction) {
          case UP:
            window.scrollTo(0, 0)
            break
          default:
            window.scrollTo(0, document.body.scrollHeight)
        }
      })
    }
  },
  watch: {
    '$route': 'routeChanged'
  }
}
</script>
