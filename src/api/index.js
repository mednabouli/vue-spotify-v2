const base = 'https://api.spotify.com/v1/search?q='

/* eslint-disable no-undef */
export const fetchByType = (query, type, offset = 0, limit = 10) => {
  return fetch(base + query + '&type=' + type + '&offset=' + offset + '&limit=' + limit)
    .then(obj => {
      return obj.json()
    }).then(res => {
      switch (type) {
        case 'Artist':
          return res.artists.items.map(item => {
            return {
              ...item,
              imageUrl: item.images && item.images.length > 0
                ? item.images.slice(-1)[0].url
                : null
            }
          })
        case 'Album':
          return res.albums.items.map(item => {
            return {
              ...item,
              imageUrl: item.images && item.images.length > 0
                ? item.images.slice(-1)[0].url
                : null
            }
          })
        case 'Track':
          return res.tracks.items.map(item => {
            return {
              ...item,
              imageUrl: item.album.images && item.album.images.length > 0
                ? item.album.images.slice(-1)[0].url
                : null
            }
          })
        default:
          return []
      }
    })
}
