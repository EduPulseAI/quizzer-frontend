"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useCalendarStore } from "@/lib/calendar-store"
import { AVAILABLE_MODELS } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Bot, Cpu, Thermometer, FileText, Wrench } from "lucide-react"

type SettingsTab = "agent" | "capabilities"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { agentSettings, updateAgentSettings } = useCalendarStore()
  const [tab, setTab] = useState<SettingsTab>("agent")
  const [model, setModel] = useState(agentSettings.model)
  const [temperature, setTemperature] = useState(agentSettings.temperature)
  const [systemPrompt, setSystemPrompt] = useState(agentSettings.systemPrompt)

  useEffect(() => {
    if (open) {
      setModel(agentSettings.model)
      setTemperature(agentSettings.temperature)
      setSystemPrompt(agentSettings.systemPrompt)
    }
  }, [open, agentSettings])

  function handleSave() {
    updateAgentSettings({ model, temperature, systemPrompt })
    onOpenChange(false)
  }

  const tabs: { value: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { value: "agent", label: "Agent", icon: <Bot className="h-4 w-4" /> },
    { value: "capabilities", label: "Capabilities", icon: <Wrench className="h-4 w-4" /> },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Configure your AI assistant and app preferences.</DialogDescription>
        </DialogHeader>

        {/* Tab chips */}
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                tab === t.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {tab === "agent" && (
          <div className="flex flex-col gap-5">
            {/* Model selector */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-muted-foreground" />
                Model
              </Label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_MODELS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setModel(m.value)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      model === m.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-1.5">
                <Thermometer className="h-3.5 w-3.5 text-muted-foreground" />
                Temperature: {temperature.toFixed(1)}
              </Label>
              <Slider
                value={[temperature]}
                onValueChange={([v]) => setTemperature(v)}
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
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                System Prompt
              </Label>
              <Textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={5}
                className="text-xs"
              />
            </div>
          </div>
        )}

        {tab === "capabilities" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="text-sm font-medium text-foreground">AI Calendar Assistant</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Chronos uses the Vercel AI Gateway to connect to the model of your choice.
                The assistant can help you with scheduling, finding free time, and managing events
                through natural language conversations.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Available Capabilities
              </h4>
              {[
                {
                  name: "Scheduling Help",
                  desc: "Ask the AI to suggest meeting times or help plan your day",
                },
                {
                  name: "Event Management",
                  desc: "Get help creating, updating, or organizing your events",
                },
                {
                  name: "Time Analysis",
                  desc: "Understand how your time is distributed across activities",
                },
                {
                  name: "Smart Suggestions",
                  desc: "Receive proactive scheduling recommendations",
                },
              ].map((cap) => (
                <div key={cap.name} className="rounded-lg border bg-card p-3">
                  <p className="text-sm font-medium text-foreground">{cap.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
