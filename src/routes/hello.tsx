import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'

export const helloRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hello',
  component: Hello,
})

function Hello() {
  return (
    <div>
      <h1>world</h1>
    </div>
  )
}
