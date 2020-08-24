function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(item =>
        typeof item === 'object'
          ? item
          : createTextElement(item)    
      )
    }
  }
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function render(element, container) {
  const dom =
    element.type === 'TEXT_ELEMENT'
    ? document.createTextElement('')
    : document.createElement(element.type)

  element.props.children.forEach(child => {
    render(child, dom)
  })

  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(
      name => dom[name] = element.props[name]
    )

  container.appendChild(dom)
}

const React = {
  render,
  createElement
}

const element = React.createElement(
  'h1',
  { id: 'container' },
  React.createElement('div', null, 'hello'),
  'word'
)

const container = document.querySelector('#root')

React.render(element, container)