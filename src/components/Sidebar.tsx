import { FileText, Upload, FolderOpen } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  pages: number;
  uploadedAt: string;
}

const mockDocuments: Document[] = [
  { id: '1', name: '就業規則.pdf', pages: 45, uploadedAt: '2024/01/15' },
  { id: '2', name: '経費精算マニュアル.pdf', pages: 12, uploadedAt: '2024/01/20' },
  { id: '3', name: '社内システム利用ガイド.pdf', pages: 28, uploadedAt: '2024/02/01' },
  { id: '4', name: '情報セキュリティポリシー.pdf', pages: 18, uploadedAt: '2024/02/10' },
  { id: '5', name: '新入社員オンボーディング.pdf', pages: 35, uploadedAt: '2024/02/15' },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-800">ドキュメント管理</h2>
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div className="p-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            ファイルをドラッグ＆ドロップ
          </p>
          <p className="text-xs text-gray-400 mt-1">
            または クリックしてアップロード
          </p>
        </div>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          アップロード済み ({mockDocuments.length})
        </h3>
        <ul className="space-y-2">
          {mockDocuments.map((doc) => (
            <li
              key={doc.id}
              className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"
            >
              <FileText className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-600">
                  {doc.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {doc.pages}ページ・{doc.uploadedAt}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="text-xs text-gray-500">
          <p>合計 {mockDocuments.reduce((acc, doc) => acc + doc.pages, 0)} ページをインデックス済み</p>
        </div>
      </div>
    </aside>
  );
}
