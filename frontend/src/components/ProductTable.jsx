import StatusBadge from './StatusBadge'

export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        No products yet. Add your first product!
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            {['Name', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-800">{p.name}</div>
                <div className="text-gray-400 text-xs truncate max-w-xs">{p.description}</div>
              </td>
              <td className="px-4 py-3 text-gray-600">{p.category}</td>
              <td className="px-4 py-3 text-gray-700">
                Rp {p.price.toLocaleString('id-ID')}
              </td>
              <td className="px-4 py-3 text-gray-600">{p.stock}</td>
              <td className="px-4 py-3">
                <StatusBadge isActive={p.isActive} />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="px-3 py-1 text-xs rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="px-3 py-1 text-xs rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}