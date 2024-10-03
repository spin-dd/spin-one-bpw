import React from "react"
import { Parser, ProcessNodeDefinitions } from "html-to-react"

const isValidNode = () => true

const processNodeDefinitions = new ProcessNodeDefinitions()

// node には rich text をプレ処理した text をパースしたものが格納されている
const processingInstructions = [
  {
    shouldProcessNode: function (node) {
      return node.attribs && node.attribs.id === "preprocessed-first"
    },
    processNode: function (node, children, index) {
      return React.createElement(
        "h1",
        { key: index, id: node.attribs.id },
        "First"
      )
    },
  },
  {
    shouldProcessNode: function (node) {
      return node.attribs && node.attribs.id === "preprocessed-second"
    },
    processNode: function (node, children, index) {
      return React.createElement(
        "h2",
        { key: index, id: node.attribs.id },
        "Second"
      )
    },
  },
  {
    shouldProcessNode: function (node) {
      return true
    },
    processNode: processNodeDefinitions.processDefaultNode,
  },
]

export const parseHtmlToReact = (html, data) => {
  // https://github.com/aknuds1/html-to-react
  const htmlToReactParser = new Parser()
  return htmlToReactParser.parseWithInstructions(
    html,
    isValidNode,
    processingInstructions
  )
}
