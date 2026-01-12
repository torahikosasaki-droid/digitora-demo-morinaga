import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Search, Sparkles, FileText, ExternalLink } from 'lucide-react';

interface SourceReference {
  document: string;
  page: number;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceReference[];
  timestamp: Date;
}

type LoadingState = 'idle' | 'searching' | 'generating';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingState]);

  const generateResponse = (question: string): { content: string; sources: SourceReference[] } => {
    const q = question.toLowerCase();

    // 忌引休暇
    if (q.includes('忌引') || q.includes('弔事') || q.includes('葬儀') || q.includes('亡くな')) {
      return {
        content: `就業規則に基づき、親等に応じて以下の通り定められています。

**忌引休暇の日数**

| 親等 | 対象者 | 日数 |
|------|--------|------|
| 1親等 | 配偶者、子、父母 | 5日間 |
| 2親等 | 兄弟姉妹、祖父母 | 2日間 |

**申請方法**
1. 勤怠システムにログイン
2. 「休暇申請」から「特別休暇」を選択
3. 種別で「忌引休暇」を選択
4. 必要事項を入力して申請

※ 申請の際は、可能な限り事前に上長へご連絡ください。`,
        sources: [
          { document: '就業規則.pdf', page: 12 },
          { document: '就業規則.pdf', page: 13 },
        ],
      };
    }

    // 経費精算
    if (q.includes('経費') || q.includes('精算') || q.includes('立替') || q.includes('領収書')) {
      return {
        content: `経費精算の申請方法についてご説明します。

**対象となる経費**
- 交通費（電車、バス、タクシー等）
- 出張時の宿泊費・日当
- 業務上必要な消耗品購入費
- 接待交際費（事前承認が必要）

**申請手順**
1. 経費精算システムにログイン
2. 「新規申請」をクリック
3. 経費の種類を選択
4. 金額・日付・内容を入力
5. 領収書の画像をアップロード
6. 上長へ承認依頼を送信

**注意事項**
- 申請期限は支払日から1ヶ月以内です
- 5,000円以上の経費は領収書原本の提出が必要です
- 振込は毎月25日締め、翌月10日払いです

※ 不明点は経理部（内線: 1234）までお問い合わせください。`,
        sources: [
          { document: '経費精算マニュアル.pdf', page: 3 },
          { document: '経費精算マニュアル.pdf', page: 5 },
        ],
      };
    }

    // リモートワーク・テレワーク・在宅勤務
    if (q.includes('リモート') || q.includes('テレワーク') || q.includes('在宅') || q.includes('自宅')) {
      return {
        content: `リモートワーク（在宅勤務）の申請手順をご案内します。

**申請条件**
- 入社6ヶ月以上経過していること
- 直属の上長の承認があること
- 業務内容がリモートワークに適していること

**申請手順**
1. 勤怠システムにログイン
2. 「勤務形態申請」を選択
3. 「リモートワーク」を選択
4. 希望日と業務予定を入力
5. 上長へ承認依頼

**ルール**
- 勤務開始・終了時にチャットで報告
- コアタイム（10:00〜15:00）は連絡可能な状態を維持
- 週2日以上の出社が推奨されています

**必要な環境**
- 安定したインターネット接続
- セキュリティソフト導入済みのPC
- VPN接続の設定完了

※ 機密情報を扱う業務は原則出社となります。`,
        sources: [
          { document: '就業規則.pdf', page: 28 },
          { document: '社内システム利用ガイド.pdf', page: 15 },
        ],
      };
    }

    // 有給休暇
    if (q.includes('有給') || q.includes('年休') || q.includes('休暇') || q.includes('休み')) {
      return {
        content: `有給休暇の取得についてご説明します。

**付与日数（勤続年数別）**

| 勤続年数 | 付与日数 |
|----------|----------|
| 6ヶ月 | 10日 |
| 1年6ヶ月 | 11日 |
| 2年6ヶ月 | 12日 |
| 3年6ヶ月 | 14日 |
| 4年6ヶ月 | 16日 |
| 5年6ヶ月 | 18日 |
| 6年6ヶ月以上 | 20日 |

**申請方法**
1. 勤怠システムにログイン
2. 「休暇申請」→「有給休暇」を選択
3. 取得希望日を選択
4. 理由を入力（任意）
5. 申請を送信

**注意事項**
- 原則として3営業日前までに申請
- 繁忙期は調整をお願いする場合があります
- 未消化分は翌年度まで繰り越し可能（最大40日）

※ 残日数は勤怠システムで確認できます。`,
        sources: [
          { document: '就業規則.pdf', page: 8 },
          { document: '就業規則.pdf', page: 9 },
        ],
      };
    }

    // セキュリティ・パスワード
    if (q.includes('セキュリティ') || q.includes('パスワード') || q.includes('ログイン') || q.includes('アカウント')) {
      return {
        content: `情報セキュリティに関するルールをご説明します。

**パスワードポリシー**
- 最低12文字以上
- 大文字・小文字・数字・記号を含む
- 90日ごとに変更が必要
- 過去5回分のパスワードは再利用不可

**アカウント管理**
- 共有アカウントの使用は禁止
- 離席時は必ず画面ロック（Win+L）
- 5回連続でログイン失敗するとロック

**パスワードを忘れた場合**
1. ログイン画面の「パスワードを忘れた方」をクリック
2. 登録メールアドレスにリセットリンクが届きます
3. リンクから新しいパスワードを設定

**不審なメール・アクセスを発見したら**
- 情報システム部へ即時報告（内線: 5555）
- 不審なリンクはクリックしない
- 添付ファイルは開かない

※ セキュリティ研修は年1回必須です。`,
        sources: [
          { document: '情報セキュリティポリシー.pdf', page: 4 },
          { document: '情報セキュリティポリシー.pdf', page: 7 },
          { document: '社内システム利用ガイド.pdf', page: 3 },
        ],
      };
    }

    // 入社・オンボーディング
    if (q.includes('入社') || q.includes('オンボーディング') || q.includes('新入') || q.includes('研修')) {
      return {
        content: `新入社員オンボーディングについてご案内します。

**入社初日の流れ**
1. 9:00 人事部にて受付
2. 9:30 オリエンテーション開始
3. 12:00 ランチ（先輩社員と）
4. 13:00 部署への配属・挨拶
5. 14:00 PC・アカウント設定
6. 16:00 業務説明

**入社時に必要な書類**
- 年金手帳（またはマイナンバー）
- 給与振込口座届
- 扶養控除申告書
- 身元保証書
- 健康診断書

**初月の研修スケジュール**
- 1週目: 会社概要・ビジョン研修
- 2週目: コンプライアンス・セキュリティ研修
- 3週目: 部署別専門研修
- 4週目: OJT開始

※ 不明点はメンターまたは人事部にお気軽にご相談ください。`,
        sources: [
          { document: '新入社員オンボーディング.pdf', page: 2 },
          { document: '新入社員オンボーディング.pdf', page: 8 },
        ],
      };
    }

    // デフォルト（どのキーワードにもマッチしない場合）
    return {
      content: `ご質問ありがとうございます。

「${question}」についてお調べしました。

申し訳ございませんが、現在登録されているドキュメントから該当する情報を見つけることができませんでした。

**以下をお試しください：**
- より具体的なキーワードで再度検索
- 関連する部署へ直接お問い合わせ

**よくある質問カテゴリ：**
- 休暇制度（有給、忌引、特別休暇など）
- 経費精算の申請方法
- リモートワークの申請
- セキュリティ・パスワード関連
- 入社手続き・研修

※ ドキュメントの追加をご希望の場合は、管理者にご連絡ください。`,
      sources: [],
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loadingState !== 'idle') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoadingState('searching');

    // Simulate searching delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoadingState('generating');

    // Simulate generating delay
    await new Promise((resolve) => setTimeout(resolve, 700));

    const response = generateResponse(userMessage.content);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      sources: response.sources,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setLoadingState('idle');
  };

  const renderMarkdown = (content: string) => {
    // Simple markdown parsing for tables and bold text
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let isHeader = true;

    lines.forEach((line, index) => {
      // Check if line is a table row
      if (line.startsWith('|') && line.endsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
          isHeader = true;
        }

        // Skip separator line
        if (line.includes('---')) {
          isHeader = false;
          return;
        }

        const cells = line
          .split('|')
          .slice(1, -1)
          .map((cell) => cell.trim());
        tableRows.push(cells);
      } else {
        // If we were in a table, render it
        if (inTable && tableRows.length > 0) {
          elements.push(
            <div key={`table-${index}`} className="my-3 overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    {tableRows[0]?.map((cell, cellIndex) => (
                      <th
                        key={cellIndex}
                        className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableRows.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-4 py-2 text-sm text-gray-700"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          inTable = false;
          tableRows = [];
        }

        // Handle regular text
        if (line.trim()) {
          // Bold text
          if (line.startsWith('**') && line.endsWith('**')) {
            elements.push(
              <p key={index} className="font-semibold text-gray-800 mt-3 mb-1">
                {line.replace(/\*\*/g, '')}
              </p>
            );
          }
          // Numbered list
          else if (/^\d+\.\s/.test(line)) {
            elements.push(
              <p key={index} className="text-gray-700 ml-4 my-0.5">
                {line}
              </p>
            );
          }
          // Note with ※
          else if (line.startsWith('※')) {
            elements.push(
              <p key={index} className="text-gray-500 text-sm mt-3 italic">
                {line}
              </p>
            );
          }
          // Regular paragraph
          else {
            elements.push(
              <p key={index} className="text-gray-700 my-1">
                {line}
              </p>
            );
          }
        }
      }
    });

    // Handle table at the end
    if (inTable && tableRows.length > 0) {
      elements.push(
        <div key="table-end" className="my-3 overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                {tableRows[0]?.map((cell, cellIndex) => (
                  <th
                    key={cellIndex}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableRows.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-2 text-sm text-gray-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return elements;
  };

  return (
    <main className="flex-1 flex flex-col h-full bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              AI ナレッジ検索
            </h1>
            <p className="text-sm text-gray-500">
              社内ドキュメントから最適な回答を検索します
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              何でも質問してください
            </h2>
            <p className="text-gray-500 max-w-md">
              アップロードされたドキュメントから関連情報を検索し、AIが回答を生成します。
            </p>
            <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-lg">
              {[
                '忌引休暇は何日取れますか？',
                '経費精算の申請方法は？',
                'リモートワークの申請手順',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3'
                      : 'bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-sm px-5 py-4'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p>{message.content}</p>
                  ) : (
                    <>
                      <div className="prose prose-sm max-w-none">
                        {renderMarkdown(message.content)}
                      </div>
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            参照ソース
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {message.sources.map((source, index) => (
                              <button
                                key={index}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-full transition-colors"
                              >
                                <FileText className="w-3 h-3" />
                                {source.document} (p.{source.page})
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading State */}
            {loadingState !== 'idle' && (
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-sm px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm text-gray-600">
                      {loadingState === 'searching' && (
                        <span className="flex items-center gap-2">
                          <Search className="w-4 h-4 animate-pulse" />
                          ドキュメントを検索中...
                        </span>
                      )}
                      {loadingState === 'generating' && (
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 animate-pulse" />
                          回答を生成中...
                        </span>
                      )}
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
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="質問を入力してください..."
              disabled={loadingState !== 'idle'}
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow"
            />
            <button
              type="submit"
              disabled={!input.trim() || loadingState !== 'idle'}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center gap-2 font-medium"
            >
              <Send className="w-4 h-4" />
              送信
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            AIが生成した回答です。重要な判断の前には、原本をご確認ください。
          </p>
        </form>
      </div>
    </main>
  );
}
