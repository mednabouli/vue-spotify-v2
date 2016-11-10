<template lang="pug">
  div#app
    search-box
    router-view
</template>

<script>
import SearchBox from './components/SearchBox'
import SearchResults from './components/SearchResults'

export default {
  name: 'app',
  components: {
    SearchBox,
    SearchResults
  }
}
</script>

<style>
body {
  padding-top: 4em;
  padding-bottom: 2em;
  scroll-behavior: smooth;
}
</style>
