import {
  consumeStream,
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, model, temperature, systemPrompt } = (await req.json()) as {
    messages: UIMessage[]
    model?: string
    temperature?: number
    systemPrompt?: string
  }

  const result = streamText({
    model: model || "anthropic/claude-opus-4.6",
    system:
      systemPrompt ||
      `You are Chronos, a smart calendar assistant. You help users manage their schedule, create events, find free time, and offer scheduling suggestions. Be concise and helpful. The current date/time is: ${new Date().toISOString()}.`,
    messages: await convertToModelMessages(messages),
    temperature: temperature ?? 0.7,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
