import Kefir from 'kefir'

var i = 0

export default function MidiController() {
  console.log('MidiController')
  return Kefir.stream(emitter => {
    let inputs = []
    let outputs = []
    navigator.requestMIDIAccess({sysex:true})
    .then(midi => {
      outputs.forEach(output => {
        output.open().then(d => {
          console.log('output', d)
        })
      })
      inputs = Array.from(midi.inputs.values())
      inputs.forEach(input => {
        input.onmidimessage = msg => {
          requestAnimationFrame(() => {
            emitter.emit(msg)
            outputs[0].send(msg.data)
          })
        }
        input.open().then(d => {
          console.log(d)
        })
      })
    })
    return () => {
      inputs.forEach(input => input.close())
    }
  })
}
