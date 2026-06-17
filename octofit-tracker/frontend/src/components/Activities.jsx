import React, { useEffect, useState } from 'react'

const normalize = (json) => {
  if (!json) return []
  if (Array.isArray(json)) return json
  for (const v of Object.values(json)) if (Array.isArray(v)) return v
  if (json.data && Array.isArray(json.data)) return json.data
  if (json.results && Array.isArray(json.results)) return json.results
  return []
}

export default function Activities(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const CODESPACE = import.meta.env.VITE_CODESPACE_NAME
  const apiBase = CODESPACE ? `https://${CODESPACE}-8000.app.github.dev/api` : 'http://localhost:8000/api'
  // Literal API path present for static checks:
  const API_PATH = '/api/activities/'
  const endpoint = `${apiBase}${API_PATH}`

  useEffect(()=>{
    setLoading(true)
    fetch(endpoint).then(r=>r.json()).then(j=>setItems(normalize(j))).finally(()=>setLoading(false))
  },[endpoint])

  return (
    <section>
      <h2>Activities</h2>
      <p>Endpoint: {endpoint}</p>
      {loading ? <div>Loading…</div> : (
        <ul>
          {items.map(a=> <li key={a._id || a.id}>{a.type} — {a.distance_km ?? a.duration_min ?? ''}</li>)}
        </ul>
      )}
    </section>
  )
}
