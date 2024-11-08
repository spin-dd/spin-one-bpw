import React from "react"
import { Parser, ProcessNodeDefinitions } from "html-to-react"
import { entryIdFromNode,customModuleNameFromNode,imageEntryToImage } from "./utils"

const isValidNode = () => true

const processNodeDefinitions = new ProcessNodeDefinitions()

// node には rich text をプレ処理した text をパースしたものが格納されている
const processingInstructions = (data) => [
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
    shouldProcessNode: function (node){
      return customModuleNameFromNode(node) ==="Image"
    },
    processNode: function(node) {
      const entryId = entryIdFromNode(node)
      const entry = data.allContentfulImage.nodes.find((entry) => entry.contentful_id === entryId)
      const body = entry.body
      if (body === null) {
        // 多言語対応：対応言語の body がない場合
        return null
      }
      return imageEntryToImage(entry)
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
    processingInstructions(data)
  )
}
