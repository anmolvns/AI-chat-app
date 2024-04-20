import React, { useState } from 'react';

const Chat = () => {
  const BACKEND_API_URL = 'http://localhost:3001/api/chat';
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    [],
  );

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessage: { text: string; sender: string } = {
        text: inputValue,
        sender: 'user',
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        const response = await fetch(BACKEND_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputValue }),
        });

        const data = await response.json();

        const aiMessage: { text: string; sender: string } = {
          text: data.response,
          sender: 'ai',
        };

        setMessages((prevMessages) => [...prevMessages, aiMessage]);

        setInputValue('');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === 'user' ? 'bg-green-200' : 'bg-blue-200'
            } p-2 rounded-md mb-2 max-w-xs`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-200">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleSend}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
