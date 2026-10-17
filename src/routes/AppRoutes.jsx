import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/sesion/Login'
import Register from '../pages/sesion/Register'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      {/* Cualquier ruta desconocida va al login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}