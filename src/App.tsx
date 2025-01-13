import routerConfig from './router'
import { useRoutes } from 'react-router-dom'

const App = () => {
  const routes = useRoutes(routerConfig)

  return routes
}

export default App