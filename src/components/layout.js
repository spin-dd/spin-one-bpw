import React, { useEffect } from 'react'
import { useLocation } from '@reach/router'
import { useScript } from '../hooks/useScript'

export function Layout({ body, script }) {
  // https://paulie.dev/posts/2022/10/react-hydration-error-425-text-content-does-not-match-server-rendered-html/
  const [isHydrated, setIsHydrated] = React.useState(false)
  React.useEffect(() => setIsHydrated(true), [])
  useScript(isHydrated ? script : [])

  const { hash } = useLocation()

  useEffect(() => {
    if (isHydrated && hash) {
      const id = decodeURI(hash.slice(1))
      if (id) {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView()
        }
      }
    }
  }, [isHydrated, hash])

  return isHydrated && <>{body}</>
}
