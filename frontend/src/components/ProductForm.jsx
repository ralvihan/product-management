import { useState, useEffect } from 'react'

const emptyForm = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  isActive: true,
}

export default function ProductForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(emptyForm)

  // isi form kalau mode edit
  useEffect(() => {
    if (initial) setForm(initial)
    else setForm(emptyForm)
  }, [initial])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    })
  }

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Nama</label>
        <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Deskripsi</label>
        <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Price (Rp)</label>
          <input name="price" type="number" min="0" step="any" value={form.price} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Stok</label>
          <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Category</label>
        <input name="category" value={form.category} onChange={handleChange} required className={inputClass} />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          checked={form.isActive}
          onChange={handleChange}
          className="w-4 h-4 accent-blue-500"
        />
        <label htmlFor="isActive" className="text-sm text-gray-700">Aktif</label>
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition">
          Batal
        </button>
        <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  )
}