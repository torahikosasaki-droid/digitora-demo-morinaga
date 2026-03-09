import { useState } from 'react';
import { Search, BarChart3, Sparkles } from 'lucide-react';
import KnowledgeSearchDemo from './demos/KnowledgeSearchDemo';
import DataAnalystDemo from './demos/DataAnalystDemo';
import MeetingMinutesDemo from './demos/MeetingMinutesDemo';

type DemoType = 'knowledge' | 'analyst' | 'minutes';

const DEMOS = [
  {
    id: 'knowledge' as DemoType,
    name: 'AI ナレッジ検索',
    subtitle: 'RAG Demo',
    icon: Search,
  },
  {
    id: 'analyst' as DemoType,
    name: 'AI Data Analyst',
    subtitle: 'Data Analysis Demo',
    icon: BarChart3,
  },
  {
    id: 'minutes' as DemoType,
    name: '議事録AI解析',
    subtitle: 'Meeting Minutes Demo',
    icon: Sparkles,
  },
];

function App() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('knowledge');

  const activeDemoInfo = DEMOS.find((d) => d.id === activeDemo)!;

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <activeDemoInfo.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">{activeDemoInfo.name}</h1>
              <p className="text-xs text-gray-500">{activeDemoInfo.subtitle}</p>
            </div>
          </div>

          {/* Demo Tabs */}
          <nav className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {DEMOS.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDemo === demo.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <demo.icon className="w-4 h-4" />
                {demo.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Demo Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeDemo === 'knowledge' && <KnowledgeSearchDemo />}
        {activeDemo === 'analyst' && <DataAnalystDemo />}
        {activeDemo === 'minutes' && <MeetingMinutesDemo />}
      </div>
    </div>
  );
}

export default App;
