// import { render } from 'preact'
// import { App } from './app.jsx'
// import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// render(<App />, document.getElementById('app'))

ReactDOM.render( 
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
)
