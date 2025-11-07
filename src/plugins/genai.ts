// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function generateReport(input: string): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
    systemInstruction: [
        {
          text: "voce vai ler dados de lotes e analisa-los, com base nos dados gere um relatorio com observações e conclusões, faça num formato html, e desconsidere a imagem do produto, apenas gere o html não cite mais nada, tire tambem o ```html```",
        }
    ],
  };
  const model = 'gemini-2.5-pro';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: JSON.stringify(input),
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let output = '';

  for await (const chunk of response) {
    output += chunk.text ?? '';
  }
  return output
}

export default generateReport;
