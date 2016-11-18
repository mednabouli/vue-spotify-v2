<template lang="pug">
  div.container
    div.row(v-if="type !== 'Artist' && album")
      div.col-md-6
        h2 {{ album.name }}
        img.img-responsive(:src='imageSrc')
        h4 Artist: {{ artist.name }}
        h4 Release Date: {{ album.release_date }}
        h4 Popularity: {{ album.popularity }}
        a(:href='album.external_urls.spotify' target='_blank')
          h4 Spotify Link
      div.col-md-6
        h2 Tracks
        div.panel.panel-default(v-for='track in album.tracks.items')
          div.panel-body
            h4 {{ track.track_number }}. {{ track.name }}
            audio(:src='track.preview_url' controls)
    div.row(v-if="type === 'Artist' && artist")
      div.col-md-6
        h2 {{ artist.name }}
        img.img-responsive(:src='imageSrc')
        h4 Followers: {{ artist.followers.total }}
        h4 Popularity: {{ artist.popularity }}
        a(:href='artist.external_urls.spotify' target='_blank')
          h4 Spotify Link
        p(v-if='artist.genres') {{ artist.genres.join(', ') }}
      div.col-md-6
        h2 Top 10 Tracks
        div.panel.panel-default(v-for='track in topTracks')
          div.panel-body
            h4 {{ track.name }} - {{ track.album.name }}
            audio(:src='track.preview_url' controls)
</template>

<script>
import { fetchAlbumById, fetchArtistById, fetchArtistTopTracks } from '../api'

export default {
  name: 'result-detail',
  data () {
    return {
      album: null,
      artist: null,
      topTracks: []
    }
  },
  created () {
    this.type = this.$route.params.type
    switch (this.type) {
      case 'Artist':
        fetchArtistById(this.$route.params.id)
          .then(artist => {
            this.artist = artist
            this.imageSrc = artist.images ? artist.images[0].url : null
          })
        fetchArtistTopTracks(this.$route.params.id)
          .then(result => {
            this.topTracks = result.tracks
          })
        break
      case 'Album':
      case 'Track':
        fetchAlbumById(this.$route.params.id)
          .then(album => {
            this.album = album
            this.artist = album.artists ? album.artists[0] : null
            this.imageSrc = album.images ? album.images[0].url : null
          })
        break
      default:
        return
    }
  }
}
</script>
