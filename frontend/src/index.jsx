import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './pages/Main'
import './index.css'
import { VoteProvider } from './context/voteContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VoteProvider>
      <Main />
    </VoteProvider>
  </React.StrictMode>
)
