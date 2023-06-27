import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

import { Provider } from 'react-redux'
import { setupStore } from './state/store'
const store = setupStore()

const container = document.querySelector('#root')
if (container != null) {
  const root = createRoot(container)
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  )
}
