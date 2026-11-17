import { Navigate, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute.jsx'
import { Layout } from './components/Layout.jsx'
import { Login } from './pages/Login.jsx'
import { MealsList } from './pages/MealsList.jsx'
import { MealNew } from './pages/MealNew.jsx'
import { MealEdit } from './pages/MealEdit.jsx'
import { MealDetail } from './pages/MealDetail.jsx'
import { Metrics } from './pages/Metrics.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<MealsList />} />
          <Route path="/meals/new" element={<MealNew />} />
          <Route path="/meals/:id" element={<MealDetail />} />
          <Route path="/meals/:id/edit" element={<MealEdit />} />
          <Route path="/metrics" element={<Metrics />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
