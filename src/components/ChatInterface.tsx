import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BarChart3, PieChart, Users, Package, TrendingUp } from 'lucide-react';
import SalesBarChart from './SalesBarChart';
import ProductPieChart from './ProductPieChart';
import CustomerAgeChart from './CustomerAgeChart';
import CustomerRegionChart from './CustomerRegionChart';
import InventoryChart from './InventoryChart';
import InventoryTrendChart from './InventoryTrendChart';
import MarketingROIChart from './MarketingROIChart';
import MarketingConversionChart from './MarketingConversionChart';

export type ChartType =
  | 'sales_bar'
  | 'sales_pie'
  | 'customer_age'
  | 'customer_region'
  | 'inventory_stock'
  | 'inventory_trend'
  | 'marketing_roi'
  | 'marketing_cvr'
  | null;

export type DataFileType = 'sales' | 'customer' | 'inventory' | 'marketing';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  chartType?: ChartType;
  timestamp: Date;
}

interface PresetQuestion {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  messages: Message[];
  isLoading: boolean;
  currentFile: DataFileType;
}

const PRESET_QUESTIONS: Record<DataFileType, PresetQuestion[]> = {
  sales: [
    { label: '売上推移をグラフにして', icon: BarChart3 },
    { label: '商品別の構成比は？', icon: PieChart },
  ],
  customer: [
    { label: '年代別の顧客分布は？', icon: Users },
    { label: '地域別の顧客割合を見せて', icon: PieChart },
  ],
  inventory: [
    { label: '現在の在庫状況は？', icon: Package },
    { label: '在庫の推移を見せて', icon: TrendingUp },
  ],
  marketing: [
    { label: 'チャネル別のROIは？', icon: BarChart3 },
    { label: 'コンバージョン率の推移は？', icon: TrendingUp },
  ],
};

const FILE_DESCRIPTIONS: Record<DataFileType, string> = {
  sales: '売上データに関する質問をしてください。グラフを使って分かりやすく分析結果をお見せします。',
  customer: '顧客データに関する質問をしてください。年代別・地域別の分析が可能です。',
  inventory: '在庫データに関する質問をしてください。在庫状況や推移を分析できます。',
  marketing: 'マーケティングデータに関する質問をしてください。ROIやCVRの分析が可能です。',
};

export default function ChatInterface({ onSendMessage, messages, isLoading, currentFile }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handlePresetClick = (question: string) => {
    if (isLoading) return;
    onSendMessage(question);
  };

  const renderChart = (chartType: ChartType) => {
    switch (chartType) {
      case 'sales_bar':
        return <SalesBarChart />;
      case 'sales_pie':
        return <ProductPieChart />;
      case 'customer_age':
        return <CustomerAgeChart />;
      case 'customer_region':
        return <CustomerRegionChart />;
      case 'inventory_stock':
        return <InventoryChart />;
      case 'inventory_trend':
        return <InventoryTrendChart />;
      case 'marketing_roi':
        return <MarketingROIChart />;
      case 'marketing_cvr':
        return <MarketingConversionChart />;
      default:
        return null;
    }
  };

  const currentPresets = PRESET_QUESTIONS[currentFile];

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              データ分析を始めましょう
            </h2>
            <p className="text-gray-500 max-w-md mb-8">
              {FILE_DESCRIPTIONS[currentFile]}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {currentPresets.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handlePresetClick(q.label)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 rounded-xl transition-all shadow-sm"
                >
                  <q.icon className="w-4 h-4 text-blue-500" />
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3'
                      : 'space-y-4'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p>{message.content}</p>
                  ) : (
                    <>
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{message.content}</p>
                      </div>
                      {message.chartType && (
                        <div className="animate-fadeIn">
                          {renderChart(message.chartType)}
                        </div>
                      )}
                    </>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-9 h-9 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading State */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-pulse text-blue-500" />
                      データを分析しています...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 px-4 py-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {/* Preset Buttons */}
          {messages.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {currentPresets.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handlePresetClick(q.label)}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm text-gray-600 rounded-lg transition-all"
                >
                  <q.icon className="w-3.5 h-3.5 text-blue-500" />
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="データについて質問してください..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center gap-2 font-medium"
            >
              <Send className="w-4 h-4" />
              送信
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
