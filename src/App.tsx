import { useState } from 'react';
import { BarChart3, FileSpreadsheet, ChevronDown, Users, Package, TrendingUp } from 'lucide-react';
import ChatInterface, { ChartType, DataFileType } from './components/ChatInterface';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  chartType?: ChartType;
  timestamp: Date;
}

interface DataFile {
  id: DataFileType;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DATA_FILES: DataFile[] = [
  { id: 'sales', name: 'sales_data_2025.csv', icon: BarChart3 },
  { id: 'customer', name: 'customer_data_2025.csv', icon: Users },
  { id: 'inventory', name: 'inventory_data_2025.csv', icon: Package },
  { id: 'marketing', name: 'marketing_data_2025.csv', icon: TrendingUp },
];

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<DataFileType>('sales');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentFileInfo = DATA_FILES.find((f) => f.id === currentFile)!;

  const handleFileChange = (fileId: DataFileType) => {
    setCurrentFile(fileId);
    setMessages([]);
    setIsDropdownOpen(false);
  };

  const generateResponse = (question: string): { content: string; chartType: ChartType } => {
    const q = question.toLowerCase();

    // Sales data responses
    if (currentFile === 'sales') {
      if (q.includes('売上') && (q.includes('推移') || q.includes('グラフ') || q.includes('棒'))) {
        return {
          content:
            '売上データを分析しました。\n\n3月に急激な上昇が見られます（前月比 +97%）。これは期末キャンペーンの影響と推測されます。4月以降は通常水準に戻っていますが、全体的に安定した推移となっています。',
          chartType: 'sales_bar',
        };
      }
      if (q.includes('構成') || q.includes('比') || q.includes('割合') || q.includes('円')) {
        return {
          content:
            '商品別の売上構成比を分析しました。\n\nA製品が全体の45%を占めており、主力商品となっています。B製品（25%）と合わせると70%を占め、この2製品が売上の大部分を支えています。',
          chartType: 'sales_pie',
        };
      }
      // 追加：ピーク・最高
      if (q.includes('ピーク') || q.includes('最高') || q.includes('一番売れ')) {
        return {
          content:
            '売上のピーク分析を行いました。\n\n【最高売上月】3月：7,500万円\n【要因分析】\n・期末決算キャンペーン実施\n・新規顧客獲得施策の効果\n・季節要因（年度末需要）\n\n3月の成功要因を他月にも展開することで、さらなる売上向上が期待できます。',
          chartType: 'sales_bar',
        };
      }
      // 追加：前年比・比較・昨年
      if (q.includes('前年') || q.includes('昨年') || q.includes('去年') || q.includes('yoy')) {
        return {
          content:
            '前年同期比の分析を行いました。\n\n【2025年上半期 vs 2024年上半期】\n・総売上：+18.5%（30,600万円 → 36,250万円）\n・平均月商：+18.5%（5,100万円 → 6,042万円）\n\n特にA製品が前年比+25%と大きく成長しており、市場シェア拡大に貢献しています。B製品も堅調に推移しています。',
          chartType: 'sales_pie',
        };
      }
    }

    // Customer data responses
    if (currentFile === 'customer') {
      if (q.includes('年代') || q.includes('年齢') || q.includes('分布')) {
        return {
          content:
            '年代別の顧客分布を分析しました。\n\n30代が最も多く2,800人（32%）を占めています。次いで40代（24%）、50代（18%）と続きます。20代・60代以上は比較的少なく、30〜40代をメインターゲットとした施策が効果的と考えられます。',
          chartType: 'customer_age',
        };
      }
      if (q.includes('地域') || q.includes('エリア')) {
        return {
          content:
            '地域別の顧客分布を分析しました。\n\n関東が42%と最大シェアを占め、次いで関西（28%）、中部（15%）と続きます。関東・関西で全体の70%を占めており、この2地域での販促強化が売上向上の鍵となります。',
          chartType: 'customer_region',
        };
      }
      // 追加：リピート・継続・ロイヤル
      if (q.includes('リピート') || q.includes('継続') || q.includes('ロイヤル') || q.includes('優良')) {
        return {
          content:
            'リピート顧客の分析を行いました。\n\n【リピート率】全体：68.5%\n\n【年代別リピート率】\n・30代：72.3%（最高）\n・40代：70.1%\n・50代：65.8%\n・20代：58.2%\n・60代+：62.4%\n\n30代の顧客ロイヤルティが最も高く、LTV（顧客生涯価値）向上のコアターゲットとして重点施策を推奨します。',
          chartType: 'customer_age',
        };
      }
      // 追加：新規・獲得
      if (q.includes('新規') || q.includes('獲得') || q.includes('増加')) {
        return {
          content:
            '新規顧客の獲得状況を分析しました。\n\n【2025年上半期 新規顧客】\n・総数：1,850人（前年比 +23%）\n\n【地域別新規獲得】\n・関東：820人（44%）\n・関西：480人（26%）\n・中部：290人（16%）\n・その他：260人（14%）\n\n関東での新規獲得が好調です。九州エリアは伸びしろがあり、重点開拓地域として検討をお勧めします。',
          chartType: 'customer_region',
        };
      }
    }

    // Inventory data responses
    if (currentFile === 'inventory') {
      if (q.includes('在庫') && (q.includes('状況') || q.includes('現在') || q.includes('数'))) {
        return {
          content:
            '現在の在庫状況を分析しました。\n\n⚠️ B製品・D製品が発注点（200個）を下回っており、早急な発注が必要です。\n\n特にD製品は85個と危険水域にあります。E製品・A製品は十分な在庫があり、当面は安心です。',
          chartType: 'inventory_stock',
        };
      }
      if (q.includes('推移') || q.includes('トレンド') || q.includes('変化')) {
        return {
          content:
            '過去6ヶ月の在庫推移を分析しました。\n\nB製品の在庫が継続的に減少しており（1月: 300個 → 6月: 200個）、需要増加または発注不足の可能性があります。A製品・C製品は安定した推移ですが、B製品の在庫管理を重点的に見直すことをお勧めします。',
          chartType: 'inventory_trend',
        };
      }
      // 追加：発注・補充・仕入れ
      if (q.includes('発注') || q.includes('補充') || q.includes('仕入')) {
        return {
          content:
            '発注が必要な商品を分析しました。\n\n【要発注リスト】\n🔴 D製品：現在85個（発注点200個）→ 推奨発注数：300個\n🟡 B製品：現在120個（発注点200個）→ 推奨発注数：250個\n\n【発注優先度】\n1. D製品（緊急）- 残り約2週間分\n2. B製品（高）- 残り約3週間分\n\n平均リードタイムを考慮すると、D製品は本日中の発注を強く推奨します。',
          chartType: 'inventory_stock',
        };
      }
      // 追加：回転率・効率
      if (q.includes('回転') || q.includes('効率') || q.includes('滞留')) {
        return {
          content:
            '在庫回転率を分析しました。\n\n【商品別在庫回転率（年間）】\n・A製品：8.2回（優良）\n・B製品：12.5回（非常に高い）\n・C製品：6.8回（標準）\n・D製品：15.2回（非常に高い）\n・E製品：4.2回（やや低い）\n\nB製品・D製品は回転率が高く、在庫切れリスクに注意が必要です。E製品は回転率が低く、プロモーション強化または発注量見直しを検討してください。',
          chartType: 'inventory_trend',
        };
      }
    }

    // Marketing data responses
    if (currentFile === 'marketing') {
      if (q.includes('roi') || q.includes('効果') || q.includes('チャネル')) {
        return {
          content:
            'チャネル別のROI（投資対効果）を分析しました。\n\nメルマガが最も高いROI（450%）を記録しており、費用対効果が非常に優れています。次いでSNS広告（320%）、リスティング広告（280%）と続きます。ディスプレイ広告は120%と最も低く、予算配分の見直しを検討すべきです。',
          chartType: 'marketing_roi',
        };
      }
      if (q.includes('コンバージョン') || q.includes('cvr') || q.includes('cv')) {
        return {
          content:
            'コンバージョン率（CVR）の推移を分析しました。\n\n1月の2.1%から6月の4.1%まで、約95%の改善を達成しています。特に4月以降の上昇が顕著で、これはランディングページ改善とA/Bテストの成果と考えられます。現在の施策を継続することで、さらなる改善が期待できます。',
          chartType: 'marketing_cvr',
        };
      }
      // 追加：予算・コスト・費用
      if (q.includes('予算') || q.includes('コスト') || q.includes('費用') || q.includes('投資')) {
        return {
          content:
            'マーケティング予算の配分状況を分析しました。\n\n【現在の予算配分】\n・SNS広告：35%（350万円/月）\n・リスティング：30%（300万円/月）\n・ディスプレイ：20%（200万円/月）\n・メルマガ：10%（100万円/月）\n・アフィリエイト：5%（50万円/月）\n\n【最適化提案】\nROIの高いメルマガへの予算増額（10%→20%）と、ディスプレイ広告の削減（20%→10%）を推奨します。これにより全体ROIが約25%向上する見込みです。',
          chartType: 'marketing_roi',
        };
      }
      // 追加：広告・キャンペーン・施策
      if (q.includes('広告') || q.includes('キャンペーン') || q.includes('施策')) {
        return {
          content:
            '直近のキャンペーン効果を分析しました。\n\n【2025年上半期 主要キャンペーン結果】\n\n1. 春の新規顧客キャンペーン（3月）\n   ・CVR：5.2%（通常比+85%）\n   ・新規獲得：420人\n   ・CPA：2,380円\n\n2. GW限定セール（5月）\n   ・CVR：4.8%（通常比+65%）\n   ・売上：前年比+32%\n\n春キャンペーンの成功要因（SNS×メルマガ連携）を今後の施策に活用することを推奨します。',
          chartType: 'marketing_cvr',
        };
      }
    }

    // Default response
    return {
      content:
        'ご質問ありがとうございます。現在選択されているデータに関連する質問をお試しください。\n\nプリセットボタンをクリックすると、代表的な分析を実行できます。',
      chartType: null,
    };
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = generateResponse(content);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      chartType: response.chartType,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">AI Data Analyst</h1>
              <p className="text-xs text-gray-500">データ分析アシスタント</p>
            </div>
          </div>

          {/* File Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="text-sm font-medium">{currentFileInfo.name}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  {DATA_FILES.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => handleFileChange(file.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                        currentFile === file.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <file.icon className={`w-4 h-4 ${currentFile === file.id ? 'text-blue-500' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full bg-white border-x border-gray-200">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          currentFile={currentFile}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-2">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-gray-400 text-center">
            AI Data Analyst - データ分析結果は参考情報です。重要な意思決定には原データをご確認ください。
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
