import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

// layouts and pages
import Dashboard from './pages/Dashboard'
// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Dashboard />}>      
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App