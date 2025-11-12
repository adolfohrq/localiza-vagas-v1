export function ColorSwatch({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-20 h-20 rounded-full border border-gray-200 shadow-inner"
        style={{ backgroundColor: color }}
      ></div>
      <p className="mt-2 text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-500">{color}</p>
    </div>
  )
}

