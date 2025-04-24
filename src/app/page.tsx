'use client';

import { useChat } from '@ai-sdk/react';
import { SupplierResults } from './components/supplier-results';
import { Supplier } from './lib/suppliers';
import { useState, useEffect } from 'react';

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
    <div className="flex flex-col w-full max-w-3xl py-24 mx-auto stretch">
      <h1 className="text-2xl font-bold mb-4">Supplier Risk Management Assistant</h1>
      
      <div className="space-y-4 mb-4">
        {messages.map(message => {
          const supplierData = extractSupplierData(message);
          
          return (
            <div 
              key={message.id} 
              className={`p-4 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-orange-500 text-black ml-auto max-w-[80%]' 
                  : 'bg-white text-black mr-auto max-w-[80%]'
              }`}
            >
              <div className="font-semibold mb-1">
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
          <div className="p-4 rounded-lg bg-gray-100 mr-auto max-w-[80%]">
            <div className="font-semibold mb-1">Assistant</div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-3xl mb-8">
        <input
          className="w-full p-4 border border-gray-300 rounded-lg shadow-lg dark:bg-zinc-800 dark:border-zinc-700"
          value={input}
          placeholder="Ask about suppliers (e.g., 'Show me the top 3 highest risk suppliers')"
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}