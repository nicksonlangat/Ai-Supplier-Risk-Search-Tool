'use client';

import { useChat } from '@ai-sdk/react';
import { SupplierResults } from './components/supplier-results';
import { Supplier } from './lib/suppliers';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: 'welcome-message',
        role: 'assistant',
        content: 'Welcome to the Supplier Risk Management Assistant. You can ask me questions about suppliers such as:\n\n- "What are the top 3 suppliers with the highest risk scores?"\n- "Show me all suppliers in the healthcare industry"\n- "Which suppliers have financial compliance risks?"\n\nHow can I help you today?'
      }
    ]
  });
  
  // Create a ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Function to scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Scroll to bottom when messages change or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  // Function to extract supplier data from message parts
  const extractSupplierData = (message: any): Supplier[] | null => {
    // Check if the message has parts
    if (message.parts) {
      for (const part of message.parts) {
        // Look for tool_call parts that contain supplier data
        if (part.type === 'tool_call' && 
            part.tool === 'searchSuppliers' && 
            part.output) {
          return part.output as Supplier[];
        }
      }
    }
    
    // For older versions of AI SDK or different message formats
    if (message.content && typeof message.content === 'string') {
      try {
        // Try to find JSON data in the content
        const match = message.content.match(/```json\n([\s\S]*?)\n```/);
        if (match && match[1]) {
          const data = JSON.parse(match[1]);
          if (Array.isArray(data) && data.length > 0 && 'id' in data[0]) {
            return data as Supplier[];
          }
        }
      } catch (e) {
        console.error('Failed to parse JSON from message content', e);
      }
    }
    
    return null;
  };

  return (
    <div className="flex bg-base-800 flex-col w-full max-w-3xl mx-auto h-screen">
      <h1 className="text-2xl font-bold p-4 border-b border-white/10">Supplier Risk Management Assistant</h1>
      
      {/* Make the messages container scrollable with fixed height */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="space-y-4">
          {messages.map(message => {
            const supplierData = extractSupplierData(message);
            
            return (
              <div 
                key={message.id} 
                className={`p-4 text-white rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-base-700 ml-auto max-w-[80%]' 
                    : 'bg-base-700  mr-auto max-w-[80%]'
                }`}
              >
                <div className="font-semibold  mb-1">
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </div>
                
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
                
                {supplierData && (
                  <div className="mt-2">
                    <SupplierResults suppliers={supplierData} />
                  </div>
                )}
              </div>
            );
          })}
          
          {isLoading && (
            <div className="pt-5 text-white/50 rounded-lg  mr-auto max-w-[80%]">
              <div className="mb-1">Thinking...</div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-white/30 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          
          {/* This empty div is used as a reference for scrolling to the bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="fixed bottom-0 w-full max-w-3xl p-4 bg-base-800 border-white/5 border-t"
      >
        <input
          className="w-full p-4 border border-white/10 rounded-xl shadow-lg bg-base-700 placeholder:text-white/50
          focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
          value={input}
          placeholder="Ask about suppliers (e.g., 'Show me the top 3 highest risk suppliers') Press Enter to send"
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}