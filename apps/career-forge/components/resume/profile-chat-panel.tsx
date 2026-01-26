'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useActionState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@feature/ui/components/card';
import { Button } from '@feature/ui/components/button';
import { Input } from '@feature/ui/components/input';
import { MessageSquare, Send, Loader2, Bot, User } from 'lucide-react';

export function ProfileChatPanel() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
  const chat = useChat();
  const [formState, formAction, isLoading] = useActionState(() => ({}), {});

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);

  return (
    <Card className="glass-effect card-hover flex flex-col h-[600px]">
      <CardHeader className="flex-shrink-0 border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-400" />
          AI Resume Assistant
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Tell me about your work experience, education, or skills
        </p>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chat.messages.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">
                Hi! I can help you build your resume. Try saying:
              </p>
              <ul className="text-sm mt-2 space-y-1">
                <li>&quot;I worked at Google as a Software Engineer from 2020-2023&quot;</li>
                <li>&quot;Add my CS degree from MIT, graduated 2019&quot;</li>
                <li>&quot;Show me my current profile&quot;</li>
              </ul>
            </div>
          )}

          {chat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-400" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-lg p-3 ${
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
                          {/* {part.state === 'call' && (
                            <span className="flex items-center gap-1">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              Calling {part.tool.Invocation.toolName}...
                            </span>
                          )} */}
                          {/* {part.toolInvocation.state === 'result' && (
                            <span className="text-green-400">
                              {part.toolInvocation.result?.success
                                ? `${part.toolInvocation.result.message || 'Done'}`
                                : `Error: ${part.toolInvocation.result?.error || 'Unknown error'}`}
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
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-blue-400" />
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}

          {formState.error && (
            <div className="text-center py-2">
              <p className="text-sm text-destructive">
                {formState.error || 'An error occurred. Please try again.'}
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          action={formAction}
          className="flex-shrink-0 p-4 border-t border-border"
        >
          <div className="flex gap-2">
            <Input
              // value={input}
              // onChange={handleInputChange}
              name="input"
              placeholder="Describe your experience or education..."
              className="flex-1 bg-background/50"
              disabled={isLoading}
            />
            <Button
              type="submit"
              // disabled={isLoading || !input.trim()}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
