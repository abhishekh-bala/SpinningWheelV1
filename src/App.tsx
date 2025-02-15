import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Wheel } from './components/Wheel'
import { AdminPanel } from './components/AdminPanel'
import { Login } from './components/Login'
import { useWheelStore } from './store/wheel'
import { Gift } from 'lucide-react'

function App() {
  const { fetchNames, winner } = useWheelStore()

  useEffect(() => {
    fetchNames()
  }, [fetchNames])

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
        <Routes>
          <Route path="/" element={
            <div className="container mx-auto px-4 py-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <Gift className="text-purple-600" />
                  Fortune Wheel
                </h1>
                {winner && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-lg inline-block">
                    <h2 className="text-2xl font-bold text-purple-600">
                      Winner: {winner}! 🎉
                    </h2>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center mb-8">
                <Wheel />
              </div>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <div className="container mx-auto px-4 py-8">
              <AdminPanel />
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App