import { useState } from 'react'
import { useWheelStore } from '../store/wheel'
import { Trash2, Plus, RotateCcw, LogOut } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export function AdminPanel() {
  const [newName, setNewName] = useState('')
  const { names, selectedNames, addName, removeName, reset } = useWheelStore()
  const navigate = useNavigate()

  const handleAddName = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newName.trim() && names.length < 50) {
      await addName(newName.trim())
      setNewName('')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <button
          onClick={handleSignOut}
          className="text-gray-600 hover:text-gray-800"
        >
          <LogOut size={20} />
        </button>
      </div>

      <form onSubmit={handleAddName} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter name"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={30}
          />
          <button
            type="submit"
            disabled={names.length >= 50}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Plus size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {names.length}/50 names added
        </p>
      </form>

      <div className="space-y-2 mb-6">
        {names.map((name) => (
          <div
            key={name}
            className="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <span>{name}</span>
            <button
              onClick={() => removeName(name)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {selectedNames.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold mb-2">Selected Names:</h3>
          <div className="bg-gray-100 p-2 rounded">
            {selectedNames.join(', ')}
          </div>
        </div>
      )}

      <button
        onClick={reset}
        className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"
      >
        <RotateCcw size={18} />
        Reset Wheel
      </button>
    </div>
  )
}