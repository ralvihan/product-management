export default function StatusBadge({ isActive }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      isActive
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-600'
    }`}>
      {isActive ? 'Active' : 'Inactive'}
    </span>
  )
}