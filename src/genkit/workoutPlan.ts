import { googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash'),
});

const StudyPlanInputSchema = z.object({
  subject: z.string(),
  level: z.string(),
  timePerDay: z.string().optional(),
  durationWeeks: z.number().optional(),
});

const StudyPlanSchema = z.object({
  title: z.string(),
  description: z.string(),
  dailySessions: z.array(
    z.object({
      day: z.string(),
      topic: z.string(),
      materials: z.array(z.string()),
      tasks: z.array(z.string()),
    })
  ),
  tips: z.array(z.string()).optional(),
});
export const studyPlanGeneratorFlow = ai.defineFlow(
  {
    name: 'studyPlanGeneratorFlow',
    inputSchema: StudyPlanInputSchema,
    outputSchema: StudyPlanSchema,
  },
  async (input) => {
    const prompt = `Utwórz spersonalizowany plan nauki z następującymi wymaganiami: Temat: ${input.subject} 
     Poziom zaawansowania: ${input.level}
     Dzienny czas nauki: ${input.timePerDay || 'brak preferencji'}
     Długość planu (tygodnie): ${input.durationWeeks || 'dowolna'}`;

    const { stream, response } = ai.generateStream({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: prompt,
    });

    const { output } = await ai.generate({
      prompt,
      output: { schema: StudyPlanSchema },
    });

    if (!output) throw new Error('Failed to generate study plan');
    return output
  }
);
