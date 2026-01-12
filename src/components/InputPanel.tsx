import { FileText, Sparkles, Loader2, ClipboardPaste } from 'lucide-react';

interface InputPanelProps {
  inputText: string;
  setInputText: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const SAMPLE_MEETING_LOG = `【会議名】A社提携プロジェクト キックオフミーティング
【日時】2024年10月10日（木）14:00〜15:30
【場所】本社会議室B / オンライン併用
【参加者】
  - 当社: 田中部長、佐藤（PM）、鈴木、山田
  - A社: 高橋様、伊藤様

---

田中部長：
本日はお忙しい中お集まりいただきありがとうございます。本日はA社様との提携プロジェクトのキックオフということで、まずは全体のスケジュール感と役割分担について確認させていただければと思います。

高橋様：
ありがとうございます。弊社としても本プロジェクトには大きな期待を寄せております。まずは初期の要件定義をしっかり行い、認識齟齬がないようにしたいと考えています。

佐藤：
承知しました。要件定義のフェーズですが、来月末、つまり11月30日を目標に完了させたいと考えています。週次で進捗確認の定例会議を設けてはいかがでしょうか。

伊藤様：
定例会議、賛成です。曜日はいつがよろしいですか？

佐藤：
火曜日の10時はいかがでしょうか？

高橋様：
火曜10時で問題ありません。

田中部長：
では、毎週火曜10時に定例を設定しましょう。佐藤さん、本日中に参加者への招待をお願いできますか？

佐藤：
承知しました。本日中に送付いたします。

鈴木：
要件定義書のドラフトは開発チームで作成します。10月20日までに初稿を共有できるよう進めます。

山田：
私の方でA社様向けのヒアリングシートも準備しておきます。

高橋様：
助かります。何かあればいつでもご連絡ください。

田中部長：
ありがとうございます。それでは本日の内容をまとめますと、定例は毎週火曜10時、要件定義は11月末完了目標、ということで進めてまいります。引き続きよろしくお願いいたします。

【終了】15:25`;

export default function InputPanel({ inputText, setInputText, onAnalyze, isLoading }: InputPanelProps) {
  const handleLoadSample = () => {
    setInputText(SAMPLE_MEETING_LOG);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">議事録入力</h2>
              <p className="text-sm text-gray-500">会議の内容を入力またはペースト</p>
            </div>
          </div>
          <button
            onClick={handleLoadSample}
            className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <ClipboardPaste className="w-4 h-4" />
            サンプル入力
          </button>
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 p-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="ここに議事録をペーストしてください...

例:
【会議名】〇〇プロジェクト定例
【日時】2024年10月10日 14:00〜
【参加者】田中、佐藤、鈴木

田中：本日の議題は..."
          className="w-full h-full resize-none border border-gray-200 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
        <button
          onClick={onAnalyze}
          disabled={!inputText.trim() || isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              AI解析中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              AI解析実行
            </>
          )}
        </button>
        <p className="text-xs text-gray-400 text-center mt-2">
          {inputText.length > 0 ? `${inputText.length}文字` : '議事録を入力してください'}
        </p>
      </div>
    </div>
  );
}
