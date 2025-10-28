import { createRoute } from '@tanstack/react-router'
import { setupCounter } from '../counter'
import { useEffect, useRef } from 'react'
import { rootRoute } from './__root'

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

function Index() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      setupCounter(buttonRef.current)
    }
  }, [])

  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src="/typescript.svg" className="logo vanilla" alt="TypeScript logo" />
        </a>
      </div>
      <h1>Vite + TypeScript</h1>
      <div className="card">
        <button ref={buttonRef} id="counter" type="button"></button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and TypeScript logos to learn more
      </p>
    </div>
  )
}
