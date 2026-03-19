import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Home() {
  const [vendors, setVendors] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchVendors()
  }, [])

  async function fetchVendors() {
    const { data } = await supabase.from('vendors').select('*')
    setVendors(data || [])
  }

  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white shadow-sm px-6 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold text-orange-600'>LocalConnect</h1>
        <button
          onClick={() => navigate('/register')}
          className='bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600'>
          Register Shop
        </button>
      </div>
      <div className='px-6 py-4'>
        <input
          type='text'
          placeholder='Search by name or category...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300'
        />
      </div>
      <div className='px-6 grid grid-cols-1 gap-4'>
        {filtered.length === 0 && (
          <p className='text-gray-400 text-center mt-10'>No vendors found. Be the first to register!</p>
        )}
        {filtered.map(vendor => (
          <div
            key={vendor.id}
            onClick={() => navigate('/shop/' + vendor.id)}
            className='bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition'>
            <div className='flex justify-between items-start'>
              <div>
                <h2 className='font-semibold text-gray-800'>{vendor.name}</h2>
                <span className='text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full'>{vendor.category}</span>
              </div>
              <span className='text-xs text-gray-400'>{vendor.city}</span>
            </div>
            <p className='text-sm text-gray-500 mt-2'>{vendor.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
