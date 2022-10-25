import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import './index.scss'
import { PersistSelectedStates } from './supports/Persistence'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <PersistSelectedStates>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </PersistSelectedStates>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
