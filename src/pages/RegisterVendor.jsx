import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

export default function RegisterVendor() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "", category: "", description: "", phone: "", upi_id: "", city: ""
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from("vendors").insert([form])
    setLoading(false)
    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Shop registered successfully!")
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => navigate("/")} className="text-gray-400 hover:text-gray-600 text-sm">Back</button>
        <h1 className="text-xl font-bold text-orange-600">Register your shop</h1>
      </div>
      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Shop Name</label>
              <input name="name" value={form.name} onChange={handleChange} required
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="e.g. Ramu Chai Stall" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select name="category" value={form.category} onChange={handleChange} required
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white">
                <option value="">Select a category</option>
                <option value="Street Food">Street Food</option>
                <option value="Tailor">Tailor</option>
                <option value="Repair Shop">Repair Shop</option>
                <option value="Cobbler">Cobbler</option>
                <option value="Kirana">Kirana</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
                placeholder="What do you offer?" rows={3} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} required
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="e.g. 9876543210" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">UPI ID</label>
              <input name="upi_id" value={form.upi_id} onChange={handleChange}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="e.g. ramu@upi" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">City</label>
              <input name="city" value={form.city} onChange={handleChange} required
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="e.g. Bengaluru" />
            </div>
            <button type="submit" disabled={loading}
              className="bg-orange-500 text-white px-4 py-3 rounded-xl font-medium hover:bg-orange-600 transition disabled:opacity-50 mt-2">
              {loading ? "Registering..." : "Register Shop"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
