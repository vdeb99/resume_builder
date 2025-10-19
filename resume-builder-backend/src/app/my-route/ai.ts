import type { Endpoint } from 'payload'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const aiEndpoints: Endpoint[] = [
  {
    path: '/ai/generate-text',
    method: 'post',
    handler: async (req) => {
      try {
        // Parse the request body
        const body = typeof req.json === 'function' ? await req.json() : req.json
        const { prompt } = body

        if (!prompt) {
          return Response.json(
            { error: 'Prompt is required' },
            { status: 400 }
          )
        }

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are an AI resume writer.' },
            { role: 'user', content: prompt },
          ],
        })

        const text = completion.choices[0]?.message?.content?.trim() || 'No response generated.'
        
        return Response.json({ text }, { status: 200 })
      } catch (error: any) {
        console.error('AI Generation Error:', error)
        return Response.json(
          { error: error.message || 'Something went wrong.' },
          { status: 500 }
        )
      }
    },
  },
]