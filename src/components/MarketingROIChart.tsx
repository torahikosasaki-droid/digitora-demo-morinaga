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
  { channel: 'SNS広告', roi: 320, color: '#3B82F6' },
  { channel: 'リスティング', roi: 280, color: '#10B981' },
  { channel: 'メルマガ', roi: 450, color: '#F59E0B' },
  { channel: 'アフィリエイト', roi: 180, color: '#8B5CF6' },
  { channel: 'ディスプレイ', roi: 120, color: '#EC4899' },
];

export default function MarketingROIChart() {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-4">チャネル別ROI（%）</h4>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            type="category"
            dataKey="channel"
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            width={90}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [`${value}%`, 'ROI']}
          />
          <Bar dataKey="roi" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
