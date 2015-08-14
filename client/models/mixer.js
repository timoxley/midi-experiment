export class MixerChannel {

}

export class Mixer {
  constructor(opts = {channels: 8}) {
    this.master = new MixerChannel()
    for (let i = 0; i < opts.channels; i++) {
      this.addChannel()
    }
  }
  addChannel() {
    this.channels.push(new MixerChannel())
  }
}

