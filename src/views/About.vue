<template>
  <div class="about">
    <h1>{{ siteOption.title }}</h1>
    <ul>
      <li v-for="episode in siteOption.episodes" :key="episode.id">
        {{ episode.name }}
      </li>
    </ul>
  </div>
</template>





<script>
import gql from "graphql-tag"

export default {
  name: 'About',
  data() {
    return {
      siteOption: {
        title: '',       // Initialize title
        episodes: []     // Initialize episodes as an array
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  apollo: {
    siteOption: { // Querying siteOption
      query: gql`
        query GetSiteOption {
          siteOption(where: {id: "clotg8w8sse6x0b2ooiw1g2sh"}) {
            title
            id
            episodes {
              id
              name
            }        
          }
        }
      `,
      // No need for an update method if the structure matches directly
      error(error) {
        console.error('Error fetching site option:', error);
      },
    }
  }
}
</script>









