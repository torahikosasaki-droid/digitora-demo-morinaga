import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

const data = [
  { product: 'A製品', stock: 450, threshold: 200 },
  { product: 'B製品', stock: 120, threshold: 200 },
  { product: 'C製品', stock: 380, threshold: 200 },
  { product: 'D製品', stock: 85, threshold: 200 },
  { product: 'E製品', stock: 520, threshold: 200 },
];

export default function InventoryChart() {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-4">商品別在庫数</h4>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="product"
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [`${value}個`, '在庫数']}
          />
          <ReferenceLine y={200} stroke="#EF4444" strokeDasharray="5 5" label={{ value: '発注点', fill: '#EF4444', fontSize: 11 }} />
          <Bar dataKey="stock" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.stock < entry.threshold ? '#EF4444' : '#10B981'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span>在庫充足</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span>要発注</span>
        </div>
      </div>
    </div>
  );
}
