// Cliente da Sophia (Edge Function)
export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function callSophia(params: {
  message: string
  history: ChatMessage[]
  widget: string
}): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)

  try {
    const res = await fetch('/functions/v1/sophia-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal: controller.signal,
    })

    if (!res.ok) {
      throw new Error(`EDGE_FUNCTION_ERROR_${res.status}`)
    }

    const data = await res.json().catch(() => ({} as any))

    const content =
      data?.message ??
      data?.content ??
      data?.choices?.[0]?.message?.content ??
      ''

    return typeof content === 'string' && content.trim()
      ? content
      : 'Sem resposta da Sophia no momento.'
  } catch (err) {
    throw err
  } finally {
    clearTimeout(timeout)
  }
}
