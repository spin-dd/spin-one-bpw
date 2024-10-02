import "@fontsource/dm-sans"
import "@fontsource/dm-sans/500.css"
import "@fontsource/dm-sans/700.css"
import "@fontsource/dm-mono"
import "@fontsource/dm-mono/500.css"
require("swiper/css/bundle")
const React = require("react")

export const wrapRootElement = ({ element, props }) => (
  <React.StrictMode {...props}>{element}</React.StrictMode>
)
