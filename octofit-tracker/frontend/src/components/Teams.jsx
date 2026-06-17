import React, { useEffect, useState } from 'react'

const normalize = (json) => {
  if (!json) return []
  if (Array.isArray(json)) return json
  for (const v of Object.values(json)) if (Array.isArray(v)) return v
  if (json.data && Array.isArray(json.data)) return json.data
  if (json.results && Array.isArray(json.results)) return json.results
  return []
}

export default function Teams(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const CODESPACE = import.meta.env.VITE_CODESPACE_NAME
  const apiBase = CODESPACE ? `https://${CODESPACE}-8000.app.github.dev/api` : 'http://localhost:8000/api'
  const endpoint = `${apiBase}/teams/`

  useEffect(()=>{
    setLoading(true)
    fetch(endpoint).then(r=>r.json()).then(j=>setItems(normalize(j))).finally(()=>setLoading(false))
  },[endpoint])

  return (
    <section>
      <h2>Teams</h2>
      <p>Endpoint: {endpoint}</p>
      {loading ? <div>Loading…</div> : (
        <ul>
          {items.map(t=> <li key={t._id || t.id}>{t.name}</li>)}
        </ul>
      )}
    </section>
  )
}
