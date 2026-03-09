import { useState } from 'react';
import InputPanel from '../components/InputPanel';
import ResultPanel from '../components/ResultPanel';

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

const DUMMY_RESULT: AnalysisResult = {
  summary:
    'A社との提携プロジェクトに関するキックオフミーティング。進捗確認の定例会議を毎週火曜10時に設定することで合意。初期要件定義は11月末（来月末）までに完了させる方針で進めることが決定した。開発チームが要件定義書のドラフトを作成し、A社向けのヒアリングシートも準備する予定。',
  decisions: [
    '進捗確認の定例会議を毎週火曜日10:00に設定',
    '要件定義フェーズは11月30日までに完了させる',
    '要件定義書のドラフトは開発チームが作成（10/20目標）',
    'A社向けヒアリングシートを山田が準備',
  ],
  actions: [
    {
      id: '1',
      task: '定例会議の招待送付',
      assignee: '佐藤',
      deadline: '本日中',
      completed: false,
    },
    {
      id: '2',
      task: '要件定義書のドラフト作成',
      assignee: '開発チーム',
      deadline: '10/20',
      completed: false,
    },
    {
      id: '3',
      task: 'A社向けヒアリングシートの準備',
      assignee: '山田',
      deadline: '10/15',
      completed: false,
    },
    {
      id: '4',
      task: '本日の議事録を参加者へ共有',
      assignee: '佐藤',
      deadline: '本日中',
      completed: false,
    },
  ],
  emailDraft: `件名: 本日の打ち合わせのお礼

A社
高橋様、伊藤様

お世話になっております。
株式会社〇〇の佐藤でございます。

本日はお忙しい中、キックオフミーティングにご参加いただき、
誠にありがとうございました。

本日の打ち合わせにて決定した事項を改めてご連絡いたします。

【決定事項】
・定例会議: 毎週火曜日 10:00〜
・要件定義完了目標: 11月30日

定例会議の招待は本日中にお送りいたします。
また、要件定義書のドラフトは10月20日を目標に作成し、
共有させていただく予定です。

ご不明点やご要望がございましたら、
お気軽にご連絡くださいませ。

引き続きどうぞよろしくお願いいたします。

──────────────────
株式会社〇〇
プロジェクトマネージャー 佐藤
TEL: 03-XXXX-XXXX
Email: sato@example.co.jp
──────────────────`,
};

export default function MeetingMinutesDemo() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult(DUMMY_RESULT);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          <InputPanel
            inputText={inputText}
            setInputText={setInputText}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
          <ResultPanel result={result} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
