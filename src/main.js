import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import VueApollo from 'vue-apollo'
import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../src/fragmentTypes.json';
import './assets/tailwind.css'
import store from './store'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});


const cache = new InMemoryCache({ fragmentMatcher });

const apolloClient = new ApolloClient({
	cache,
	link: createHttpLink({ uri: 'https://api-ap-southeast-2.hygraph.com/v2/clotcrrejx17101uq61q6420n/master' }),
});

Vue.use(VueApollo)
Vue.config.productionTip = false

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
})

new Vue({
  router,
  apolloProvider,
  store,
  render: h => h(App)
}).$mount('#app')

