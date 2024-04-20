import React from 'react';
import './App.css';
import Chat from './components/Chat.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Chat />
    </div>
  );
};

export default App;
