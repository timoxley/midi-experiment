import 'babel-core/polyfill'

import './index.html'
import './styles/index.css'

import React from 'react'
import Router, { Route } from 'react-router'

import BrowserHistory from 'react-router/lib/BrowserHistory'

import MainView from './views/index.js'
import MidiLog from './views/midilog.js'
import Styleguide from './views/styleguide.js'

const t = React.PropTypes

class Root extends React.Component {
  render () {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    )
  }
}

React.render(
  <Router history={new BrowserHistory()}>
    <Route component={Root}>
      <Route path='/' component={MainView} />
      <Route path='/log' component={MidiLog} />
      <Route path='/styleguide' component={Styleguide} />
    </Route>
  </Router>
, document.getElementById('root'))
