import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function VendorShop() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [vendor, setVendor] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ customer_name: '', customer_phone: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    fetchVendor()
  }, [])

  async function fetchVendor() {
    const { data } = await supabase.from('vendors').select('*').eq('id', id).single()
    setVendor(data)
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleInquiry(e) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('inquiries').insert([{ ...form, vendor_id: id }])
    setLoading(false)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      setSent(true)
    }
  }

  if (!vendor) return <div className='p-6 text-gray-400'>Loading...</div>

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white shadow-sm px-6 py-4 flex items-center gap-3'>
        <button onClick={() => navigate('/')} className='text-gray-400 hover:text-gray-600'>Back</button>
        <h1 className='text-xl font-bold text-orange-600'>LocalConnect</h1>
      </div>

      <div className='px-6 py-4 max-w-lg mx-auto'>
        <div className='bg-white rounded-xl p-5 shadow-sm border border-gray-100'>
          <div className='flex justify-between items-start'>
            <div>
              <h2 className='text-xl font-bold text-gray-800'>{vendor.name}</h2>
              <span className='text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full'>{vendor.category}</span>
            </div>
            <span className='text-sm text-gray-400'>{vendor.city}</span>
          </div>
          <p className='text-sm text-gray-500 mt-3'>{vendor.description}</p>
          <div className='mt-4 flex flex-col gap-2'>
            <a href={'tel:' + vendor.phone}
              className='bg-orange-500 text-white px-4 py-3 rounded-lg text-sm font-medium text-center hover:bg-orange-600'>
              Call {vendor.phone}
            </a>
            {vendor.upi_id && (
              <a href={`upi://pay?pa=${vendor.upi_id}&pn=${vendor.name}`}
                className='border border-orange-400 text-orange-500 px-4 py-3 rounded-lg text-sm font-medium text-center hover:bg-orange-50'>
                Pay via UPI
              </a>
            )}
          </div>
        </div>

        <div className='mt-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100'>
          <h3 className='font-semibold text-gray-800 mb-4'>Send an inquiry</h3>
          {sent ? (
            <div className='text-center py-4'>
              <p className='text-green-600 font-medium'>Inquiry sent successfully!</p>
              <p className='text-sm text-gray-400 mt-1'>The vendor will contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className='flex flex-col gap-3'>
              <input name='customer_name' value={form.customer_name} onChange={handleChange} required
                className='w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300'
                placeholder='Your name' />
              <input name='customer_phone' value={form.customer_phone} onChange={handleChange} required
                className='w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300'
                placeholder='Your phone number' />
              <textarea name='message' value={form.message} onChange={handleChange}
                className='w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300'
                placeholder='What do you need?' rows={3} />
              <button type='submit' disabled={loading}
                className='bg-orange-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50'>
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}