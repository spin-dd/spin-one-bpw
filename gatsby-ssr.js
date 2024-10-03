const React = require("react")

exports.wrapRootElement = ({ element, props }) => (
  <React.StrictMode {...props}>
    <SSRProvider>{element}</SSRProvider>
  </React.StrictMode>
)
