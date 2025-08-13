// Sophia – Motor local com WebGPU (sem APIs externas)
export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

let generator: any | null = null

async function ensureGenerator() {
  if (generator) return generator
  try {
    const { pipeline } = await import('@huggingface/transformers')
    // Modelo leve, roda no navegador com WebGPU; primeiro uso baixa os pesos uma vez
    generator = await pipeline('text-generation', 'onnx-community/Qwen2.5-0.5B-Instruct', {
      device: 'webgpu',
    })
  } catch (e) {
    console.warn('HuggingFace Transformers indisponível, usando fallback local.', e)
    generator = null
  }
  return generator
}

function simpleMathEval(text: string): string | null {
  try {
    const expr = text
      .toLowerCase()
      .replace(',', '.')
      .match(/([-+*/()\d\.\s]+)/)?.[1]
    if (!expr || expr.length < 3) return null
    // Segurança básica: apenas números e operadores
    if (!/^[-+*/()\d\.\s]+$/.test(expr)) return null
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${expr})`)()
    if (typeof result === 'number' && isFinite(result)) {
      return new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 6 }).format(result)
    }
    return null
  } catch {
    return null
  }
}

function ruleBasedResponder(message: string, widget: string): string {
  const math = simpleMathEval(message)
  if (math) return `Resultado: ${math}`

  const tips: Record<string, string> = {
    dashboard: 'Posso resumir seus principais indicadores e variações do dia. Pergunte por receita, viagens ou eficiência.',
    analytics: 'Tenho comparativos e tendências. Peça taxa de conversão, satisfação ou tempos médios.',
    'traffic-news': 'Trago status de vias e incidentes. Pergunte por rotas mais rápidas agora.',
    heatmap: 'Destaco zonas quentes e incidentes. Pergunte melhores áreas e horários.',
    'business-plan': 'Calculo custos, taxas e lucro. Diga: "aplique taxa 25% e 15km/viagem" para simular.',
    account: 'Gerencio seu perfil, notificações e segurança. O que deseja ajustar?',
  }
  return tips[widget] || 'Como posso ajudar no seu fluxo agora? Posso calcular, explicar métricas e sugerir ações.'
}

export async function callSophia(params: {
  message: string
  history: ChatMessage[]
  widget: string
}): Promise<string> {
  const { message, history, widget } = params

  // Tenta o gerador local (WebGPU)
  const gen = await ensureGenerator()
  if (gen) {
    const system = `Você é Sophia, assistente DriverPro. Responda curto, em pt-PT, com números claros e passos quando necessário. Contexto atual: ${widget}.`
    const prompt = [
      { role: 'system', content: system },
      ...history.slice(-6),
      { role: 'user', content: message },
    ]
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n')

    try {
      const out = await gen(prompt, { max_new_tokens: 180, temperature: 0.7, top_p: 0.9 })
      const text = Array.isArray(out) ? out[0]?.generated_text ?? '' : String(out)
      const answer = String(text).split('ASSISTANT:').pop()?.trim() || String(text).trim()
      if (answer) return answer
    } catch (e) {
      console.warn('Falha no gerador local, usando fallback.', e)
    }
  }

  // Fallback leve, totalmente local
  return ruleBasedResponder(message, widget)
}
