import Sidebar from '../components/Sidebar';
import RagChatInterface from '../components/RagChatInterface';

export default function KnowledgeSearchDemo() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <RagChatInterface />
    </div>
  );
}
