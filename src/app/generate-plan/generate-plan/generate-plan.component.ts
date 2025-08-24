import { Component, resource, ResourceRef, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { runFlow } from 'genkit/beta/client';
import { GEMINI_API_KEY } from '../../settings/settings';

export interface StudyPlanInput {
  subject: string;
  level: string;
  timePerDay?: string;
  durationWeeks?: number;
  numberOfLessonsPerWeek?: number;
  numberOfSemesters?: number;
  educationalStage?: string;
  programmingLanguages?: string;
}

export const studyPlan: StudyPlanInput = {
  subject: 'matematyka',
  level: 'średniozaawansowany'
};

@Component({
  selector: 'app-generate-plan',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './generate-plan.component.html',
  styleUrl: './generate-plan.component.scss'
})
export class GeneratePlanComponent {
  GEMINI_API_KEY = GEMINI_API_KEY;
  studyPlanInput: StudyPlanInput = studyPlan;
  studyPlanInputUpdate = signal<StudyPlanInput>(studyPlan);

  studyPlanInputResource = resource({
    request: () => this.studyPlanInputUpdate(),
    loader: ({ request }) => runFlow({
      url: 'http://localhost:3000/api/studyPlanGeneratorFlow',
      headers: {
        Authorization: `Bearer ${this.GEMINI_API_KEY}`
      },
      input: request
    }),
  });

  onSubmit() {
    this.studyPlanInputUpdate.set(this.studyPlanInput);
    this.studyPlanInputResource.reload();
  }
}
