import React from "react"

import { parseHtmlToReact, prepareForParse } from "../utils"
import { Layout } from "./layout"

export const Template = ({ data, pageContext }) => {
  const { htmlBody, htmlScript, componentData } = prepareForParse({
    template: data?.contentfulTemplate,
    data,
    pageContext,
  })
  return (
    <Layout
      body={parseHtmlToReact(htmlBody, componentData)}
      script={parseHtmlToReact(htmlScript, componentData)}
    />
  )
}
