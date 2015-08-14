import {MidiParser} from 'midi-help'
import Kefir from 'kefir'
import MidiController from '../models/midicontroller'

export default function MidiInfo () {
  return Kefir.stream(emitter => {
    const parser = new MidiParser()
    parser.emit = (type, id, value) => {
      emitter.emit({type, id, value})
    }

    MidiController()
    .onValue(msg => {
      parser.parseArray(msg.data)
    })
  })
}
