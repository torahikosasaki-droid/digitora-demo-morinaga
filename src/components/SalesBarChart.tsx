import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { month: '1月', sales: 4200 },
  { month: '2月', sales: 3800 },
  { month: '3月', sales: 7500 },
  { month: '4月', sales: 5100 },
  { month: '5月', sales: 4800 },
  { month: '6月', sales: 5200 },
];

const COLORS = ['#3B82F6', '#3B82F6', '#10B981', '#3B82F6', '#3B82F6', '#3B82F6'];

export default function SalesBarChart() {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-4">月別売上推移（万円）</h4>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [`${value.toLocaleString()}万円`, '売上']}
          />
          <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span>通常月</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span>ピーク月</span>
        </div>
      </div>
    </div>
  );
}
