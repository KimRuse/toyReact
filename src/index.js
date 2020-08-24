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

function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(fiber.type)

    fiber.props.children.forEach(child => {
    render(child, dom)
  })

  const isProperty = key => key !== 'children'
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(
      name => dom[name] = fiber.props[name]
    )
  
  return dom
}

function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  }
}

let nextUnitOfWork = null

function workLoop(deadline) {
  let shouldYield = false

  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  if(fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }

  const elements = fiber.props.children
  let prevSibling
  elements.forEach((element, index) => {
    const newFiber = {
      dom: null,
      type: element.type,
      props: element.props,
      parent: fiber,
    }

    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
  })

  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
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