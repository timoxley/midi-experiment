import React from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'
const t = React.PropTypes

export const RangeInput = {}

RangeInput.propTypes = {
  value: t.number.isRequired,
  onChange: t.func
}

RangeInput.defaultProps = {
  value: 0,
  onChange: Function.prototype,
  className: ''
}

export class Knob extends React.Component {
  constructor(props) {
    super(props)
  }
  shouldComponentUpdate(props, state) {
    return PureRenderMixin.shouldComponentUpdate.call(this, props, state)
  }
  render () {
    const className = this.props.className + ' RangeInput Knob'
    const deg = (this.props.movementDegrees/127 * this.props.value) + 360 - this.props.movementDegrees / 2
    return (
      <div className={className}>
          <svg className='knob' viewBox='0 0 100 100' preserveAspectRatio='xMidYMax meet' style={{transform: `rotate(${deg}deg)`}}>
            <ellipse className='background' cx='50' cy='50' rx='50' ry='50' />
            <rect className='indicator' x='45' y='0' width='10' height='50' />
          </svg>
        <div className='currentValue'>{this.props.value}</div>
      </div>
    )
  }
}

Knob.propTypes = Object.assign({
  movementDegrees: t.number.isRequired,
}, RangeInput.propTypes)

Knob.defaultProps = Object.assign({
  movementDegrees: 300,
}, RangeInput.defaultProps)

export class Slider extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(props, state) {
    return PureRenderMixin.shouldComponentUpdate.call(this, props, state)
  }
  render () {
    const className = this.props.className + ' RangeInput Slider'
    const indicatorHeight = 10
    const range = 100 - indicatorHeight
    const offset = range - range / 127 * this.props.value
    return (
      <div className={className}>
          <svg viewBox='0 0 30 100' preserveAspectRatio='xMidYMax meet' >
            <rect className='background' x='0' y='0' width='30' height='100' />
            <rect className='indicator' x='0' y='0' width='30' height='10' style={{transform: `translate3d(0, ${offset}px, 0)`}} />
          </svg>
        <div className='currentValue'>{this.props.value}</div>
      </div>
    )
  }
}

Slider.propTypes = Object.assign({}, RangeInput.propTypes)
Slider.defaultProps = Object.assign({}, RangeInput.defaultProps)

export class Button extends React.Component {
  constructor(props) {
    super(props)
  }
  shouldComponentUpdate(props, state) {
    return PureRenderMixin.shouldComponentUpdate.call(this, props, state)
  }
  render () {
    const className = [
      this.props.className,
      'Button',
      this.props.value === 0 ? 'off' : 'on'
    ].join(' ')

    return (
      <div className={className}>
          <svg viewBox='0 0 100 100' preserveAspectRatio='xMidYMax meet'>
            <rect className='background' x='0' y='0' width='100' height='100' />
          </svg>
      </div>
    )
  }
}

Button.propTypes = {
  onPress: t.func,
  onRelease: t.func,
  value: t.number.isRequired
}

Button.defaultProps = {
  onPress: Function.prototype,
  onRelease: Function.prototype,
  value: 0
}

