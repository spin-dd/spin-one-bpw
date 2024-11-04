require('bootstrap/dist/css/bootstrap.min.css')

const React = require('react')

exports.wrapRootElement = ({ element, props }) => (
  <React.StrictMode {...props}>{element}</React.StrictMode>
)

// gatsby-react-router-scroll の機能を無効化する
exports.shouldUpdateScroll = () => false
