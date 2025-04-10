import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/templates');
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setTemplates(data)
      setLoading(false)
    } catch (error) {
      setError('Error fetching templates: ' + error.message)
      setLoading(false)
    }
}

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="container">
      <h1>Templates List</h1>
      <div className="templates-grid">
        {templates.map((template) => (
          <div key={template._id} className="template-card">
            <h2>{template.name}</h2>
            <p>{template.description}</p>
            <div className="template-details">
              <span>Status: {template.status}</span>
              <span>Created: {new Date(template.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App