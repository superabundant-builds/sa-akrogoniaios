import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <div style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: '#646cff' }}>
          Home
        </Link>
        <Link to="/hello" style={{ color: '#646cff' }}>
          Hello
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})
