<template lang="pug">
  div.container.fixed-top
    div.input-group
      input.form-control(type='text' v-model='query')
      div.input-group-btn(:class='isDropDownOpen()')
        button.btn.btn-success(@click='searchByType()') {{ activeType }}
        button.btn.btn-success.dropdown-toggle(@click='toggleDropdown()')
          span.caret
        ul.dropdown-menu.dropdown-menu-right
          li(v-for='type in searchTypes')
            router-link(:to="'/' + type + '/' + query") {{ type }}
</template>

<script>
export default {
  name: 'search-box',
  computed: {
    activeType () {
      return this.$route.params.type
    }
  },
  created () {
    this.onRouteChanged()
  },
  methods: {
    searchByType () {
      this.$router.push('/' + this.activeType + '/' + encodeURI(this.query) || '')
    },
    toggleDropdown (forceClose = false) {
      if (forceClose) this.displaySearchTypes = false
      else this.displaySearchTypes = !this.displaySearchTypes
    },
    isDropDownOpen () {
      return {
        open: this.displaySearchTypes
      }
    },
    onRouteChanged () {
      this.toggleDropdown(true)
      let query = this.$route.params.query
      if (query && this.query !== query) {
        this.query = query
      }
    }
  },
  data () {
    return {
      displaySearchTypes: false,
      query: '',
      searchTypes: [
        'Artist',
        'Album',
        'Track'
      ]
    }
  },
  watch: {
    '$route': 'onRouteChanged'
  }
}
</script>

<style scoped>
button {
  height: 34px;
}
.fixed-top {
  background-color: #FFF;
  left: 0;
  padding-bottom: 0.75em;
  padding-top: 0.75em;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
}
</style>
