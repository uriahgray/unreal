<template>
  <div class="home">
    <div v-if="studio">
      <div class="title">{{ studio.title }}</div>
      <div class="summary">{{ studio.summary }}</div>
      <!-- Display Broadcasts -->
      <div v-for="broadcast in studio.broadcasts" :key="broadcast.title" class="broadcast">
        <div class="broadcast-title">{{ broadcast.title }}</div>
        <div class="broadcast-length">{{ broadcast.length }}</div>
      </div>
      <!-- Display Content -->
      <Content :content="studio.content" />
    </div>
  </div>
</template>






<script>
import gql from "graphql-tag"
import Content from "../components/Content.vue";

export default {
  name: 'Home',
  components: {
    Content
  },
  data() {
    return {
      studio: null // studio will now include content
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  apollo: {
    siteOption: {
      query: gql`
        query GetSiteOption {
          siteOption(where: {id: "clotg8w8sse6x0b2ooiw1g2sh"}) {
            studio {
              id
              summary
              title
              broadcasts {
                title
                length
              }
              content {
                ... on Header {
                  header
                }
                ... on Text {
                  text {
                    html
                  }
                  small
                }                
                ... on Media {
                  id
                  name
                  media {
                    mimeType
                    url(transformation: {image: {resize: {width: 1380}}})
                  }
                }
              }
            }
          }
        }     
      `,
      result({ data }) {
        if (data && data.siteOption && data.siteOption.studio) {
          this.studio = data.siteOption.studio;
        } else {
          console.error('Studio data missing in the result');
        }
      },
      error(error) {
        console.error('Error fetching studio data:', error);
      },
    }
  }
}
</script>






