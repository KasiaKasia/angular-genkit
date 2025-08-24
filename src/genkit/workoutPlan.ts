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
  numberOfLessonsPerWeek: z.number().optional(),
  programmingLanguages: z.string().optional(),
  numberOfSemesters: z.number().optional(),
  educationalStage: z.string().optional(),
});

const StudyPlanSchema = z.object({
  title: z.string(),
  description: z.string(),
  dailySessions: z.array(
    z.object({
      day: z.string(),               // np. "Dzień 1"
      topic: z.string(),             // główny temat zajęć
      details: z.array(z.string()).optional(),  // szczegóły, pojęcia do poznania
      materials: z.array(z.string()).optional(),// lista materiałów do wykorzystania
      tasks: z.array(z.string()).optional(),    // zadania do wykonania
      examples: z.array(z.string()).optional(), // przykładowe ćwiczenia / case study
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
    const prompt = `Utwórz spersonalizowany plan nauki na przedmiot: ${input.subject} 
     Poziom zaawansowania: ${input.level}
     Czas nauki: ${input.timePerDay || 'brak preferencji'}
     Długość planu (tygodnie): ${input.durationWeeks || 'dowolna'}
     Ilość lekcji w tygodniu: ${input.numberOfLessonsPerWeek || 'dowolna'}
     Ilość semestrów: ${input.numberOfSemesters || 'dowolna'}
     Lekcje mają obejmować języki programowania : ${input.programmingLanguages || 'dowolna'}
     Etap kształcenia: ${input.educationalStage || 'dowolna'}`;
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
