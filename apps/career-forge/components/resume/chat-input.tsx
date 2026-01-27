'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@feature/ui/components/button';
import { Input } from '@feature/ui/components/input';
import { Send, Loader2, ArrowUpIcon, Upload, Link, Link2, Paperclip } from 'lucide-react';
import { InputGroup, InputGroupTextarea, InputGroupAddon, InputGroupButton, InputGroupText } from '@feature/ui/components/input-group';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@feature/ui/components/dropdown-menu';
import { Separator } from '@feature/ui/components/separator';

interface ChatInputProps {
  isLoading?: boolean;
}

export function ChatInput({ isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    // onSend({ text: input });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className=''>
    {/* <form onSubmit={handleSubmit} className="flex-shrink-0 p-4 border-t border-border"> */}
      <InputGroup>
        <InputGroupTextarea 
          className='bg-background/50 h-9' 
          placeholder="Describe your experience or education..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="outline"
            className="rounded-full"
            size="icon-xs"
          >
            <Paperclip />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">Auto</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="[--radius:0.95rem]"
            >
              <DropdownMenuItem>Auto</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText className="ml-auto">52% used</InputGroupText>
          {/* <Separator className="!h-4" /> */}
          <InputGroupButton
            variant="default"
            className="rounded-full cursor-pointer"
            size="icon-xs"
          >
            {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Send />
          )}
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {/* <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your experience or education..."
          className="flex-1 bg-background/50 h-9"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="sm"
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div> */}
    </form>
  );
}
