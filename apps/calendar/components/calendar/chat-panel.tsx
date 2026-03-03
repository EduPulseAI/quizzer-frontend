"use client"

import React, { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useCalendarStore } from "@/lib/calendar-store"
import { AVAILABLE_MODELS } from "@/lib/types"
import {
  Send,
  Bot,
  User,
  Sparkles,
  Settings2,
  X,
  Cpu,
  Thermometer,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChatPanel({ open, onOpenChange }: ChatPanelProps) {
  const { agentSettings, updateAgentSettings } = useCalendarStore()
  const [input, setInput] = useState("")
  const [settingsOpen, setSettingsOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Local settings state that syncs on open
  const [localModel, setLocalModel] = useState(agentSettings.model)
  const [localTemp, setLocalTemp] = useState(agentSettings.temperature)
  const [localPrompt, setLocalPrompt] = useState(agentSettings.systemPrompt)

  // Sync local state when settings panel opens or agentSettings change externally
  useEffect(() => {
    setLocalModel(agentSettings.model)
    setLocalTemp(agentSettings.temperature)
    setLocalPrompt(agentSettings.systemPrompt)
  }, [agentSettings])

  // Persist on every change so the next message uses the latest settings
  function updateModel(model: string) {
    setLocalModel(model)
    updateAgentSettings({ model })
  }
  function updateTemp(temp: number) {
    setLocalTemp(temp)
    updateAgentSettings({ temperature: temp })
  }
  function updatePrompt(prompt: string) {
    setLocalPrompt(prompt)
    updateAgentSettings({ systemPrompt: prompt })
  }

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: {
          messages,
          id,
          model: agentSettings.model,
          temperature: agentSettings.temperature,
          systemPrompt: agentSettings.systemPrompt,
        },
      }),
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  // Find the currently active model label
  const activeModelLabel =
    AVAILABLE_MODELS.find((m) => m.value === localModel)?.label ?? localModel

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[85vh] max-h-[700px] flex-col gap-0 p-0 sm:max-w-lg">
        {/* Header with inline settings toggle */}
        <DialogHeader className="flex-shrink-0 border-b px-4 py-3">
          <div className="flex items-center justify-between pr-8">
            <DialogTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              Chronos AI
            </DialogTitle>
            <button
              type="button"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                settingsOpen
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              {settingsOpen ? (
                <X className="h-3 w-3" />
              ) : (
                <Settings2 className="h-3 w-3" />
              )}
              {settingsOpen ? "Close" : activeModelLabel}
            </button>
          </div>
          <DialogDescription className="sr-only">
            Chat with the Chronos AI scheduling assistant
          </DialogDescription>
        </DialogHeader>

        {/* Collapsible settings drawer */}
        {settingsOpen && (
          <div className="flex-shrink-0 border-b bg-muted/30 px-4 py-3">
            <div className="flex flex-col gap-4">
              {/* Model selector chips */}
              <div className="flex flex-col gap-1.5">
                <Label className="flex items-center gap-1.5 text-xs">
                  <Cpu className="h-3 w-3 text-muted-foreground" />
                  Model
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_MODELS.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => updateModel(m.value)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                        localModel === m.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-accent",
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature slider */}
              <div className="flex flex-col gap-1.5">
                <Label className="flex items-center gap-1.5 text-xs">
                  <Thermometer className="h-3 w-3 text-muted-foreground" />
                  Temperature: {localTemp.toFixed(1)}
                </Label>
                <Slider
                  value={[localTemp]}
                  onValueChange={([v]) => updateTemp(v)}
                  min={0}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>

              {/* System prompt */}
              <div className="flex flex-col gap-1.5">
                <Label className="flex items-center gap-1.5 text-xs">
                  <FileText className="h-3 w-3 text-muted-foreground" />
                  System Prompt
                </Label>
                <Textarea
                  value={localPrompt}
                  onChange={(e) => updatePrompt(e.target.value)}
                  rows={3}
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">How can I help?</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try asking me to schedule a meeting or find your next free slot.
                </p>
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {[
                  "What's on my schedule today?",
                  "Schedule a meeting tomorrow at 3pm",
                  "When am I free this week?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setInput(suggestion)}
                    className="rounded-full border bg-card px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-accent"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {message.role === "assistant" && (
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl px-3 py-2 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground",
                  )}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <span key={index} className="whitespace-pre-wrap">
                          {part.text}
                        </span>
                      )
                    }
                    return null
                  })}
                </div>
                {message.role === "user" && (
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <User className="h-3.5 w-3.5 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex items-center gap-1 rounded-xl bg-muted px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-shrink-0 items-center gap-2 border-t px-4 py-3"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Chronos..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
