import MidiInfo from '../models/midiinfo'

import React from 'react'
import * as UI from './ui'

const t = React.PropTypes

export default class MidiLog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {messages: []}
    this.midiInfo = MidiInfo()
  }

  componentWillMount() {
    this.midiInfo.onValue(info => {
      let {messages} = this.state
      messages = [info].concat(messages)
      .slice(0, this.props.maxLength)
      this.setState({messages})
    })
  }

  componentWillUnmount() {
    this.midiInfo.end()
  }

  render () {
    return (
      <table>
        {
          this.state.messages.map((msg, index) => {
            return (
              <tr>
                <td key={index}>{msg.type}</td>
                <td>{msg.id}</td>
                <td>{msg.value}</td>
              </tr>
            )
          })
        }
      </table>
    )
  }
}

MidiLog.propTypes = {
  maxLength: t.number.isRequired
}

MidiLog.defaultProps = {
  maxLength: 10
}
