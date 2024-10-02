import { Parser } from "html-to-react"

const isValidNode = () => true

export const parseHtmlToReact = (html, data) => {
  // https://github.com/aknuds1/html-to-react
  const htmlToReactParser = new Parser()
  return htmlToReactParser.parseWithInstructions(html, isValidNode)
}
