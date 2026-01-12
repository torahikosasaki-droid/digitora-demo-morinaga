import { useState } from 'react';
import {
  FileText,
  CheckCircle,
  ListTodo,
  Mail,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';

interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  deadline: string;
  completed: boolean;
}

interface AnalysisResult {
  summary: string;
  decisions: string[];
  actions: ActionItem[];
  emailDraft: string;
}

interface ResultPanelProps {
  result: AnalysisResult | null;
  isLoading: boolean;
}

type TabType = 'summary' | 'decisions' | 'actions' | 'email';

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'summary', label: '要約', icon: <FileText className="w-4 h-4" /> },
  { id: 'decisions', label: '決定事項', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 'actions', label: 'ネクストアクション', icon: <ListTodo className="w-4 h-4" /> },
  { id: 'email', label: 'メール下書き', icon: <Mail className="w-4 h-4" /> },
];

export default function ResultPanel({ result, isLoading }: ResultPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);

  // Update action items when result changes
  if (result && actionItems.length === 0 && result.actions.length > 0) {
    setActionItems(result.actions);
  }

  const handleToggleAction = (id: string) => {
    setActionItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleCopyEmail = () => {
    if (result?.emailDraft) {
      navigator.clipboard.writeText(result.emailDraft);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const renderEmptyState = () => (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <Sparkles className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">解析結果がここに表示されます</h3>
      <p className="text-gray-500 max-w-sm">
        左側に議事録を入力し、「AI解析実行」ボタンをクリックしてください。
      </p>
    </div>
  );

  const renderLoadingState = () => (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 animate-pulse">
        <Sparkles className="w-8 h-8 text-blue-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">AI解析中...</h3>
      <p className="text-gray-500">議事録を分析しています。しばらくお待ちください。</p>
      <div className="mt-6 flex gap-1">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="p-6">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
        <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          会議の要約
        </h4>
        <p className="text-gray-700 leading-relaxed">{result?.summary}</p>
      </div>
    </div>
  );

  const renderDecisions = () => (
    <div className="p-6">
      <div className="space-y-3">
        {result?.decisions.map((decision, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-green-50 border border-green-100 rounded-lg"
          >
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">{decision}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActions = () => (
    <div className="p-6">
      <div className="space-y-3">
        {(actionItems.length > 0 ? actionItems : result?.actions || []).map((action) => (
          <div
            key={action.id}
            className={`flex items-start gap-3 p-4 border rounded-lg transition-colors ${
              action.completed
                ? 'bg-gray-50 border-gray-200'
                : 'bg-white border-gray-200 hover:border-blue-300'
            }`}
          >
            <button
              onClick={() => handleToggleAction(action.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                action.completed
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
            >
              {action.completed && <Check className="w-3 h-3 text-white" />}
            </button>
            <div className="flex-1">
              <p
                className={`font-medium ${
                  action.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                }`}
              >
                {action.task}
              </p>
              <div className="flex gap-4 mt-1 text-sm">
                <span className="text-gray-500">
                  担当: <span className="text-gray-700">{action.assignee}</span>
                </span>
                <span className="text-gray-500">
                  期限: <span className="text-orange-600 font-medium">{action.deadline}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmail = () => (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">メール下書き</span>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            {copiedEmail ? (
              <>
                <Check className="w-4 h-4" />
                コピー完了
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                コピー
              </>
            )}
          </button>
        </div>
        <div className="p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
            {result?.emailDraft}
          </pre>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (isLoading) return renderLoadingState();
    if (!result) return renderEmptyState();

    switch (activeTab) {
      case 'summary':
        return renderSummary();
      case 'decisions':
        return renderDecisions();
      case 'actions':
        return renderActions();
      case 'email':
        return renderEmail();
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">解析結果</h2>
            <p className="text-sm text-gray-500">AIによる議事録の自動解析</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {result && !isLoading && (
        <div className="px-4 border-b border-gray-200">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
}
