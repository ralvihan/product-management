import { useState, useEffect, useCallback } from 'react'
import ProductTable from './components/ProductTable'
import ProductForm from './components/ProductForm'
import DeleteModal from './components/DeleteModal'
import { getProducts, createProduct, updateProduct, deleteProduct } from './services/api'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // null = tutup, 'add' = form tambah, 'edit' = form edit
  const [modalMode, setModalMode] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving, setSaving] = useState(false)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getProducts()
      setProducts(res.data)
    } catch {
      setError('Failed to load products. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  async function handleSubmit(data) {
    setSaving(true)
    try {
      if (modalMode === 'edit') {
        await updateProduct(selectedProduct.id, data)
      } else {
        await createProduct(data)
      }
      setModalMode(null)
      setSelectedProduct(null)
      fetchProducts()
    } catch {
      alert('Failed to save product. Please check the form and try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    try {
      await deleteProduct(deleteTarget.id)
      setDeleteTarget(null)
      fetchProducts()
    } catch {
      alert('Failed to delete product.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-500 text-sm mt-1">{products.length} products total</p>
          </div>
          <button
            onClick={() => { setSelectedProduct(null); setModalMode('add') }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            + Add Product
          </button>
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading products...</div>
        ) : (
          <ProductTable
            products={products}
            onEdit={(p) => { setSelectedProduct(p); setModalMode('edit') }}
            onDelete={(p) => setDeleteTarget(p)}
          />
        )}
      </div>

      {/* Modal Add/Edit */}
      {modalMode && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              {modalMode === 'edit' ? 'Edit Product' : 'Add Product'}
            </h2>
            <ProductForm
              initial={modalMode === 'edit' ? selectedProduct : null}
              onSubmit={handleSubmit}
              onCancel={() => { setModalMode(null); setSelectedProduct(null) }}
              loading={saving}
            />
          </div>
        </div>
      )}

      {/* Modal Delete */}
      {deleteTarget && (
        <DeleteModal
          product={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}