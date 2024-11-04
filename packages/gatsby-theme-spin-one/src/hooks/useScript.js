import { useEffect } from 'react'

const createScriptElement = (node) => {
  if (node.type !== 'script') {
    return null
  }
  const { src, children, async } = node.props || {}
  if (!src && !children) {
    return null
  }

  const element = document.createElement('script')
  element.setAttribute('type', 'text/javascript')
  if (children) {
    element.innerHTML = children
  }
  if (src) {
    element.src = src
  }
  if (async) {
    element.async = async
  }

  return element
}

const flattenNodes = (nodes) => {
  if (!Array.isArray(nodes)) {
    return [nodes]
  }
  return nodes.reduce((acc, node) => {
    if (Array.isArray(node)) {
      return [...acc, ...flattenNodes(node)]
    }
    return [...acc, node]
  }, [])
}

export const useScript = (nodes = []) => {
  useEffect(() => {
    const elements = flattenNodes(nodes)
      .map((node) => createScriptElement(node))
      .filter((node) => node !== null)
    elements.map((element) => document.head.appendChild(element))

    return () => {
      elements.map((element) => document.head.removeChild(element))
    }
  }, [nodes])
}
