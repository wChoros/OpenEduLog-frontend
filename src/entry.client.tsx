import React from 'react'
import ReactDOM from 'react-dom/client'
import { HydratedRouter } from 'react-router/dom'
// @ts-ignore
import '../styles/global-big.sass'

ReactDOM.hydrateRoot(
   document,
   <React.StrictMode>
      <HydratedRouter />
   </React.StrictMode>
)
