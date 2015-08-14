import React from 'react'

export default class Seq extends React.Component {
  render () {
    return (
      <main>
        <div>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 2</h3>
          <h4>Heading 2</h4>
          <h5>Heading 2</h5>
          <h6>Heading 2</h6>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, <a href='#'>consectetur adipiscing elit</a>. Nullam
            scelerisque arcu lacus, sed congue odio ultricies ut. Ut in turpis
            eget est pretium vulputate. Vestibulum gravida tincidunt mi sit amet
            mattis. Praesent eros dolor, sollicitudin et tellus id, ornare
            egestas tellus.
          </p>
          <p>
            Curabitur dictum tellus vitae arcu placerat tristique. Maecenas
            suscipit, augue vehicula convallis commodo, eros dui lacinia dolor,
            vitae sollicitudin tellus mi posuere neque. Mauris aliquam nunc a
            turpis auctor ultrices. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Proin vitae quam
            sollicitudin erat dapibus posuere sed a sapien.
          </p>
        </div>
        <div>
          <button>Button Tag</button>
          <span className='button'>Button Class</span>
        </div>
      </main>
    )
  }
}
