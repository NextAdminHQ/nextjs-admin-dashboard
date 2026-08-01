'use server';

import { createStreamableValue, createStreamableUI } from '@ai-sdk/rsc';
import { generateObject, CoreMessage, streamText, stepCountIs } from 'ai';
import { xai, createXai } from '@ai-sdk/xai';
import { generateText, tool } from 'ai';
import { ReactNode } from 'react';
import { z } from 'zod';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  display?: ReactNode;
}


const xai_keyed = createXai({
  apiKey: process.env.XAI_API_KEY || '',
});



// Streaming Chat 
export async function continueTextConversation(messages: any[]) {
  let conversation = [...messages];
  let last_message = conversation.at(-1);

  // console.log("conversation",conversation)

    const result = await generateText({
      model: xai('grok-4.20-0309-non-reasoning'),
      messages: conversation,
      temperature: 0.6,
      tools: { 

         getCityDocRefTool: tool({
      description: 'Search city budget/finance documents from the Coral Gables collection to find relevant information based on the users query',
      inputSchema: z.object({
    query: z.string(last_message),

            }),
            execute: async ({ query }) => {
              const collectionId = "collection_4596033a-4422-4a49-b7ba-c24e3eda17c1";

              try {
                const response = await fetch('https://api.x.ai/v1/documents/search', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
                  },
                  body: JSON.stringify({
                    query,
                    source: { collection_ids: [collectionId] },
                    max_results:6,
                    chunk_size: 1024,
                  }),
                });

                if (!response.ok) {
                  const err = await response.json().catch(() => ({}));
                  return `Error: Search failed — ${err.message || response.status}`;
                }

                const data = await response.json();

                if (!data.matches?.length) {
                  return "No relevant documents found in the collection.";
                }

                // THIS IS THE KEY: Return clean, readable text
                const context = data.matches
                  .map((match: any, i: number) => 
                    `--- Reference ${i + 1} (Score: ${match.score.toFixed(3)}) ---\n${match.chunk_content.trim()}`
                  )
                  .join('\n\n');

                  // console.log("context",context)
                  // console.log("last_message",last_message)
                  // console.log("last_message",conversation)
          


                const { text } = await generateText({
                model: xai_keyed('grok-4.20-0309-non-reasoning'),
                
                  prompt: `${last_message}. Respond as a useful human assistant and concisely under 48 words. Dont include word count in response. 

                        Please note that the key in the sensor data are abreviated for actual data

                iaq_n	Indoor Air Quality index (0-7 for each BME688 sensor)
          iaqAcc_n	IAQ accuracy (0-3) for sensor n
          co2_n	Estimated CO₂ (ppm) - sensor n
          bvoc_n	Breath VOC equivalent (ppm) - sensor n
          gasR_n	Gas resistance (Ω) - sensor n
          temp_n	Temperature (°C) - sensor n
          hum_n	Relative humidity (%) - sensor n
          pres_n	Atmospheric pressure (hPa) - sensor n
          pm1	Particulate Matter ≤1.0 µm (µg/m³)
          pm2_5	Particulate Matter ≤2.5 µm (µg/m³)
          pm10	Particulate Matter ≤10 µm (µg/m³)
          batV	Battery voltage (V)
          batP	Battery percentage (%)
          batC	Battery charging current (mA)
          solV / solP	Solar panel voltage and power
          loc	Latitude/Longitude (from GNSS)
          alt	Altitude (m)
          satCnt	Number of satellites in fix
          ts	Timestamp of reading
          device / bID	Device identifier
                  

                  Please use this as reference information on the previous conversation that also includes sensor data ${conversation}
                  Please use this as reference information for city planning documentation: ${context}
                  `,
                });

                  // console.log("text",text)

                return text; // ← Plain string! Grok loves this


                } catch (error: any) {
                  return `Error: Failed to search documents — ${error.message}`;
                }
            }
          })
      },
      toolChoice: 'auto',
      stopWhen: stepCountIs(5),
      providerOptions: {
        xai: {
          searchParameters: {
            mode: 'auto',
            returnCitations: true,
            maxSearchResults: 5,
            sources: [{ type: 'web' }, { type: 'news', country: 'US' }, { type: 'x' }],
          },
        },
      },
    });

    const { text, toolResults } = result;
    // If Grok used the tool
    if (toolResults && toolResults.length > 0) {
      // console.log('Grok called getCityDocRef tool — feeding back results', toolResults);
      //   console.log("text",toolResults[0].output)

       const lastToolResult = toolResults[toolResults.length - 1];


      

      return String(lastToolResult.output) || "please try again"
      
    } else {
      // Final answer — no more tools
      return text|| "I'm not sure how to respond to that.";
    }
  }

// Gen UIs 
export async function continueConversation(history: Message[]) {
  const stream = createStreamableUI();

  const { text, toolResults } = await generateText({
    model: xai_keyed('grok-4.20-0309-non-reasoning'),
    system: 'You are a friendly weather assistant!',
    messages: history,
   
  });

  return {
    messages: [
      ...history,
      {
        role: 'assistant' as const,
        content:
          text || (toolResults ?? []).map(toolResult => String((toolResult as any).result ?? (toolResult as any).output ?? (toolResult as any).text ?? toolResult)).join(', '),
        display: stream.value,
      },
    ],
  };
}

// Utils
export async function checkAIAvailability() {
  const envVarExists = !!process.env.OPENAI_API_KEY;
  return envVarExists;
}



export async function dataNarrative(dailyReadings: any): Promise<string> {
  // Handle empty or invalid input early
  if (!dailyReadings || dailyReadings.length === 0) {
    return "No data available.";
  }

  try {
    const { text } = await generateText({
      model: xai_keyed('grok-4.20-0309-non-reasoning'),
      providerOptions: {
        xai: {
          searchParameters: {
            mode: 'off', // Fixed typo: 'of' → 'off' (or use 'on'/'auto' if needed)
            returnCitations: true,
            maxSearchResults: 5,
            sources: [
              { type: 'web' },
              { type: 'news', country: 'US' },
              { type: 'x' },
            ],
          },
        },
      },
      prompt: `Provide a concise 5-word summary of the following data: ${JSON.stringify(dailyReadings)}`,
    });

    // console.log("Data Narrative Text:", text);
    return text || "No summary generated.";
  } catch (error) {
    // console.error("Error generating data narrative:", error);
    return "Failed to generate summary.";
  }
}

type KPIProps = {
  weekly: Partial<Record<string, { x: string; y: number }[]>>;
  latest: Partial<Record<string, { x: string; y: number }>>;
};
export async function generateActionInsight(  
  weekly: Partial<Record<string, { x: string; y: number }[]>>,
  latest: Partial<Record<string, { x: string; y: number }>>,
) {
  const weeklyString = JSON.stringify(weekly, null, 2);
  const latestString = JSON.stringify(latest, null, 2);

  let docContext = ""; // ← 1. Initialize outside so we can capture it

  const inputQuery = `Please find relevant information from files in the collection that allows me to understand how the environment, economy, and community is impacted by this sensor data.
  
     Please note all power is in Watts and batP is energy used by sensor. solP is energy generated. 
    the battery is a sodium ion 31wH Sodium Ion Battery 33140 3.1V 10Ah 31Wh (12C) Cylindrical Battery

           Please note that the key in the sensor data are abreviated for actual data

       iaq_n	Indoor Air Quality index (0-7 for each BME688 sensor)
iaqAcc_n	IAQ accuracy (0-3) for sensor n
co2_n	Estimated CO₂ (ppm) - sensor n
bvoc_n	Breath VOC equivalent (ppm) - sensor n
gasR_n	Gas resistance (Ω) - sensor n
temp_n	Temperature (°C) - sensor n
hum_n	Relative humidity (%) - sensor n
pres_n	Atmospheric pressure (hPa) - sensor n
pm1	Particulate Matter ≤1.0 µm (µg/m³)
pm2_5	Particulate Matter ≤2.5 µm (µg/m³)
pm10	Particulate Matter ≤10 µm (µg/m³)
batV	Battery voltage (V)
batP	Battery percentage (%)
batC	Battery charging current (mA)
solV / solP	Solar panel voltage and power
loc	Latitude/Longitude (from GNSS)
alt	Altitude (m)
satCnt	Number of satellites in fix
ts	Timestamp of reading
device / bID	Device identifier

      Weekly Sensor Data : ${weeklyString},

      Latest Sensor Data: ${latestString}`;

  const result = await generateText({
    model: xai('grok-4.20-0309-non-reasoning'),
    prompt: inputQuery,
    temperature: 0.6,
    tools: { 
      getCityActionDocRefTool: tool({
        description: `Search city budget/finance documents from the Coral Gables collection to find relevant information based on the users query`,
        inputSchema: z.object({
          query: z.string(),
        }),
        execute: async ({ query }) => { // ← 2. Accept { query } from Grok
          const collectionId = "collection_4596033a-4422-4a49-b7ba-c24e3eda17c1";

          try {
            const response = await fetch('https://api.x.ai/v1/documents/search', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
              },
              body: JSON.stringify({
                query: inputQuery, // ← 3. Use the query Grok sent, not inputQuery
                source: { collection_ids: [collectionId] },
                max_results: 6,
                chunk_size: 1024,
              }),
            });

            if (!response.ok) {
              const err = await response.json().catch(() => ({}));
              return `Error: Search failed — ${err.message || response.status}`;
            }

            const data = await response.json();

            if (!data.matches?.length) {
              return "No relevant documents found in the collection.";
            }

            const context = data.matches
              .map((match: any, i: number) => 
                `--- Reference ${i + 1} (Score: ${match.score.toFixed(3)}) ---\n${match.chunk_content.trim()}`
              )
              .join('\n\n');

            docContext = context; // ← 4. Assign to outer variable (this works in JS!)
            // console.log("action insights context", docContext);

            return context; // ← Return it so Grok sees it too

          } catch (error: any) {
            return `Error: Failed to search documents — ${error.message}`;
          }
        }
      })
    },
    toolChoice: 'auto',
    stopWhen: stepCountIs(5),
  });

  const { text, toolResults } = result;

  // console.log("tool result", result.steps);
  const allDocumentContext = result.steps.flatMap(s => s.content).filter(c => c.type === 'tool-result').map(c => c.output).join('\n\n');
  // console.log(allDocumentContext)

  // If tool was used, proceed with structured output
  if (allDocumentContext) {
    // console.log('Grok called tool — using retrieved context');

const { object } = await generateObject({
  model: xai_keyed("grok-4.20-0309-non-reasoning"),
  output: "array",
  schema: z.object({
    inisghtObj: z.object({
      insightName: z
        .string()
        .describe(
          "A concise, human-readable title describing the insight. Must be 2–4 words, no abbreviations."
        ),
      insightCategory: z
        .string()
        .describe(
          "A category derived from the NIST Smart City Framework (e.g., 'Environmental Quality', 'Energy Efficiency'). Must be 1–2 words."
        ),
      insightSummary: z
        .string()
        .describe(
          "A short actionable summary (≤125 characters) justified by sensor data and municipal planning context."
        ),
    }),
  }),

  prompt: `
You are an AI system generating actionable smart city insights for municipal planning teams.  

Please provide insights for those that might not be literate in the city planning documentation so providing very clear actionable insights such as plant trees, or investigate carbon emmissions, or optimize solar power. like very specific actions people can take


Your outputs must follow the NIST Smart City Framework and be credible, data-driven, and operationally useful.

---
### 🎯 Your Task
Generate 3–5 concise and actionable insight objects that help improve:
- Sustainability  
- Environmental health  
- Economic development  
- Socioeconomic well-being  
- Infrastructure resilience  

---
### 📘 Required Data Sources
Every insight must reference both
1. IoT sensor data  
2. Municipal planning documents  


Please use human sentiment from X.com if applicable

Do not use acronymss and do not show character count

You must justify each insight using specific sensor signals and relevant planning context.

---
### 📡 Sensor Data (No acronyms, please use numbers rather than spelling the word for a number out. For example please use 4 instead of four)
Indoor Air Quality index  
IAQ accuracy  
Estimated Carbon Dioxide (ppm)  
Breath Volatile Organic Compounds (ppm)  
Gas resistance (ohms)  
Temperature (°C)  
Relative humidity (%)  
Atmospheric pressure (hPa)  
Particulate Matter ≤1.0µm  
Particulate Matter ≤2.5µm  
Particulate Matter ≤10µm  
Battery voltage (V)  
Battery percentage (%)  
Battery charging current (mA)  
Solar panel voltage (V)  
Solar panel power (mW)  
GNSS latitude and longitude  
Altitude (m)  
Number of satellites  
Timestamp  
Device identifier  

Energy note:
All power values are in milliwatts. The sensor uses a 31 Wh sodium-ion battery powering an ESP32 and Monarch2 GNSS.

---
### 🗓 Sensor Readings Provided
Weekly sensor data  
${weeklyString}

Latest sensor reading:  
${latestString}

---
### 📄 Municipal Planning Context
${allDocumentContext}

---
### 🧠 Insight Requirements
Each insight must be: 
- Actionable step for any stake holder including a resident, city planner, emergency response, financial planner, by those that might not be familiar with smart city documentation (recommend a measurable next step)  
- Clear and concise  
- ≤150 characters for insightSummary 
- No Acronyms
- use numebrs instead of the spelling out the word. For example use "4" not "four"
- provide a small reference to the municiapl planning context to add credibility

---
### 📦 Output Format
Return ONLY objects following this exact schema:

{
  inisghtObj: {
    insightName: string,
    insightCategory: string,
    insightSummary: string
  }
}

Do NOT include reasoning or commentary. 
  `,
});



    // This will now work because docContext has real content
    for await (const hero of object) {
      // console.log(hero);
    }
    return object;

  } else {
    return [];
  }
}





