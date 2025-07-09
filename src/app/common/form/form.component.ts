import { Component, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { studyPlan, StudyPlanInput } from '../../app.component';
import { runFlow } from 'genkit/beta/client';
import { GEMINI_API_KEY } from '../../settings/settings';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
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
