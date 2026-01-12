import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <ChatInterface />
    </div>
  );
}

export default App;
