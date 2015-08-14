import React from 'react'
import MidiInfo from '../models/midiinfo'

import MidiLog from './midilog'
import * as UI from './ui'

import Perf from 'react/lib/ReactDefaultPerf'

window.Perf = Perf

Perf.start()

const t = React.PropTypes

export default class Seq extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cc: {},
      note: {},
    }
    this.info = MidiInfo()
  }
  componentWillMount() {
    this.info
    .onValue(({type, id, value}) => {
      if (type === 'noteOn' || type === 'noteOff') {
        type = 'note'
      }
      this.setState({
        [type]: Object.assign(this.state[type], {
          [id]: value
        })
      })
    })
  }
  render () {
    return (
      <main>
        <div className='knobs'>
          <UI.Knob value={this.state.cc[13]} />
          <UI.Knob value={this.state.cc[14]} />
          <UI.Knob value={this.state.cc[15]} />
          <UI.Knob value={this.state.cc[16]} />
          <UI.Knob value={this.state.cc[17]} />
          <UI.Knob value={this.state.cc[18]} />
          <UI.Knob value={this.state.cc[19]} />
          <UI.Knob value={this.state.cc[20]} />
        </div>
        <div className='knobs'>
          <UI.Knob value={this.state.cc[29]} />
          <UI.Knob value={this.state.cc[30]} />
          <UI.Knob value={this.state.cc[31]} />
          <UI.Knob value={this.state.cc[32]} />
          <UI.Knob value={this.state.cc[33]} />
          <UI.Knob value={this.state.cc[34]} />
          <UI.Knob value={this.state.cc[35]} />
          <UI.Knob value={this.state.cc[36]} />
        </div>
        <div className='knobs'>
          <UI.Knob value={this.state.cc[49]} />
          <UI.Knob value={this.state.cc[50]} />
          <UI.Knob value={this.state.cc[51]} />
          <UI.Knob value={this.state.cc[52]} />
          <UI.Knob value={this.state.cc[53]} />
          <UI.Knob value={this.state.cc[54]} />
          <UI.Knob value={this.state.cc[55]} />
          <UI.Knob value={this.state.cc[56]} />
        </div>
        <div className='sliders'>
          <UI.Slider value={this.state.cc[77]} />
          <UI.Slider value={this.state.cc[78]} />
          <UI.Slider value={this.state.cc[79]} />
          <UI.Slider value={this.state.cc[80]} />

          <UI.Slider value={this.state.cc[81]} />
          <UI.Slider value={this.state.cc[82]} />
          <UI.Slider value={this.state.cc[83]} />
          <UI.Slider value={this.state.cc[84]} />
        </div>
        <div className='buttons'>
          <UI.Button value={this.state.note[41]} />
          <UI.Button value={this.state.note[42]} />
          <UI.Button value={this.state.note[43]} />
          <UI.Button value={this.state.note[44]} />

          <UI.Button value={this.state.note[57]} />
          <UI.Button value={this.state.note[58]} />
          <UI.Button value={this.state.note[59]} />
          <UI.Button value={this.state.note[60]} />
        </div>
        <div className='buttons'>
          <UI.Button value={this.state.note[73]} />
          <UI.Button value={this.state.note[74]} />
          <UI.Button value={this.state.note[75]} />
          <UI.Button value={this.state.note[76]} />

          <UI.Button value={this.state.note[89]} />
          <UI.Button value={this.state.note[90]} />
          <UI.Button value={this.state.note[91]} />
          <UI.Button value={this.state.note[92]} />
        </div>
      </main>
    )
  }
}
