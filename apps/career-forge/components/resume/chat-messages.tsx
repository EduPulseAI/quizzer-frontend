'use client';

import { useChat } from '@ai-sdk/react';
import { Bot, Loader2, User } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ChatMessagesProps {
  isLoading?: boolean;
}

export function ChatMessages({ isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="p-4 space-y-2">
      {messages.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <Bot className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Try saying:</p>
          <ul className="text-xs mt-2 space-y-1">
            <li>&quot;I worked at Google as a Software Engineer from 2020-2023&quot;</li>
            <li>&quot;Add my CS degree from MIT, 2019&quot;</li>
          </ul>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.role === 'assistant' && (
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Bot className="h-3.5 w-3.5 text-blue-400" />
            </div>
          )}

          <div
            className={`max-w-[80%] rounded-lg p-2.5 ${
              message.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-muted/50 border border-border'
            }`}
          >
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return (
                    <div key={`${message.id}-${i}`} className="text-sm whitespace-pre-wrap">
                      {part.text}
                    </div>
                  );
                case 'tool-invocation':
                  return (
                    <div
                      key={`${message.id}-${i}`}
                      className="text-xs text-muted-foreground italic mt-2 pt-2 border-t border-border/50"
                    >
                      {/* {part.toolInvocation.state === 'call' && (
                        <span className="flex items-center gap-1">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          {part.toolInvocation.toolName}...
                        </span>
                      )}
                      {part.toolInvocation.state === 'result' && (
                        <span className="text-green-400">
                          {part.toolInvocation.result?.success
                            ? `${part.toolInvocation.result.message || 'Done'}`
                            : `Error: ${part.toolInvocation.result?.error || 'Failed'}`}
                        </span>
                      )} */}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {message.role === 'user' && (
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-white" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-3 justify-start">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Bot className="h-3.5 w-3.5 text-blue-400" />
          </div>
          <div className="bg-muted/50 border border-border rounded-lg p-2.5">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
