import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

function VendorCard({ vendor, onClick }) {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)
  const images = vendor.photo_url ? [vendor.photo_url] : []

  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent(c => (c + 1) % images.length)
      }, 3000)
    }
    return () => clearInterval(intervalRef.current)
  }, [images.length])

  function prev(e) {
    e.stopPropagation()
    setCurrent(c => (c - 1 + images.length) % images.length)
    clearInterval(intervalRef.current)
  }

  function next(e) {
    e.stopPropagation()
    setCurrent(c => (c + 1) % images.length)
    clearInterval(intervalRef.current)
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition overflow-hidden">
      <div style={{height: "280px", position: "relative"}} className="w-full overflow-hidden bg-orange-50">
        {images.length > 0 ? (
          <>
            <img
              src={images[current]}
              alt={vendor.name}
              style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "opacity 0.4s"}}
            />
            {images.length > 1 && (
              <>
                <button onClick={prev}
                  style={{position:"absolute", left:6, top:"50%", transform:"translateY(-50%)", background:"rgba(0,0,0,0.35)", border:"none", borderRadius:"50%", width:28, height:28, color:"white", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  ‹
                </button>
                <button onClick={next}
                  style={{position:"absolute", right:6, top:"50%", transform:"translateY(-50%)", background:"rgba(0,0,0,0.35)", border:"none", borderRadius:"50%", width:28, height:28, color:"white", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  ›
                </button>
                <div style={{position:"absolute", bottom:6, left:"50%", transform:"translateX(-50%)", display:"flex", gap:4}}>
                  {images.map((_, i) => (
                    <div key={i} style={{width:6, height:6, borderRadius:"50%", background: i === current ? "white" : "rgba(255,255,255,0.5)"}} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span style={{fontSize: "48px"}}>🏪</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h2 className="font-semibold text-gray-800 text-sm">{vendor.name}</h2>
        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full mt-1 inline-block">{vendor.category}</span>
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{vendor.description}</p>
        <span className="text-xs text-gray-400 mt-1 block">{vendor.city}</span>
      </div>
    </div>
  )
}

export default function Home() {
  const [vendors, setVendors] = useState([])
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchVendors()
  }, [])

  async function fetchVendors() {
    const { data } = await supabase.from("vendors").select("*")
    setVendors(data || [])
  }

  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-600">LocalConnect</h1>
        <button
          onClick={() => navigate("/register")}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600">
          Register Shop
        </button>
      </div>
      <div className="px-6 py-4">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>
      <div className="px-6 grid grid-cols-2 gap-4 pb-8">
        {filtered.length === 0 && (
          <p className="text-gray-400 text-center mt-10 col-span-2">No vendors found. Be the first to register!</p>
        )}
        {filtered.map(vendor => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onClick={() => navigate("/shop/" + vendor.id)}
          />
        ))}
      </div>
    </div>
  )
}
