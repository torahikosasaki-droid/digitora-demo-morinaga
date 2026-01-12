import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { month: '1月', A製品: 500, B製品: 300, C製品: 400 },
  { month: '2月', A製品: 450, B製品: 250, C製品: 380 },
  { month: '3月', A製品: 380, B製品: 180, C製品: 350 },
  { month: '4月', A製品: 420, B製品: 150, C製品: 320 },
  { month: '5月', A製品: 480, B製品: 120, C製品: 400 },
  { month: '6月', A製品: 450, B製品: 200, C製品: 380 },
];

export default function InventoryTrendChart() {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-4">在庫推移（過去6ヶ月）</h4>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [`${value}個`, '']}
          />
          <Legend verticalAlign="bottom" height={36} iconType="line" />
          <Line type="monotone" dataKey="A製品" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="B製品" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="C製品" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
