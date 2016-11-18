<template lang="pug">
  div.container
    ul.list-group
      li.list-group-item(v-for='result in searchResults' @click='goToDetail(result)')
        div.media
          div.media-left
            img.media-object(v-if='result.imageUrl', :src='result.imageUrl' height='64px' width='64px')
          div.media-body
            h4.media-heading {{ result.name }}
            p {{ resultInfo(result) }}
    button.btn.btn-default.center-block(v-if='hasMoreResults' @click='loadMoreResults()')
      span Show more results
</template>

<script>
import {fetchByType} from '../api'

const UP = 'UP'

// TODO: Add busy status and indicator.
export default {
  name: 'search-results',
  created () {
    this.routeChanged()
  },
  data () {
    return {
      hasMoreResults: false,
      searchResults: [],
      type: null,
      query: null,
      offset: 0
    }
  },
  methods: {
    routeChanged () {
      // reset query params
      this.type = this.$route.params.type
      this.query = this.$route.params.query
      this.offset = 0
      if (!this.query) {
        this.searchResults = []
        return
      }
      fetchByType(this.query, this.type)
        .then(res => {
          this.hasMoreResults = res.length >= 10
          this.searchResults = res
          this.handleScroll(UP)
        })
    },
    loadMoreResults () {
      this.offset += 10
      fetchByType(this.query, this.type, this.offset)
        .then(res => {
          this.hasMoreResults = res.length >= 10
          this.searchResults = [
            ...this.searchResults,
            ...res
          ]
        })
    },
    goToDetail (result) {
      switch (this.type) {
        case 'Artist':
        case 'Album':
          this.$router.push('/' + this.type + '/detail/' + result.id)
          break
        case 'Track':
          this.$router.push('/' + this.type + '/detail/' + result.album.id)
          break
        default:
          return
      }
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
    },
    resultInfo (result) {
      switch (this.type) {
        case 'Artist':
          return result.genres ? result.genres.join(', ') : null
        case 'Album':
          return result.artists ? result.artists[0].name : null
        case 'Track':
          return result.album && result.artists
            ? result.album.name + ' by ' + result.artists[0].name
            : null
        default: null
      }
    }
  },
  watch: {
    '$route': 'routeChanged'
  }
}
</script>

<style scoped>
li {
  cursor: pointer;
}
</style>
