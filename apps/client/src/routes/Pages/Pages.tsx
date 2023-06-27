import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '..'
export function Pages() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/videos' replace />} />
      {Object.values(routes).map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  )
}
