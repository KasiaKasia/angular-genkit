import { Component, signal, resource } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { runFlow } from 'genkit/beta/client';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { LinkComponent } from './components/link/link.component';
import { GEMINI_API_KEY } from './settings/settings';

export interface StudyPlanInput {
  subject: string;
  level: string;
  timePerDay?: string;
  durationWeeks?: number;
}

export const studyPlan: StudyPlanInput = {
  subject: 'history',
  level: 'beginner'
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AngularLogoComponent, LinkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly routerArray = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Create GEMINI API key', link: 'https://aistudio.google.com/app/apikey' },
    { title: 'Use Genkit in an Angular app', link: 'https://genkit.dev/docs/angular/' },
    {
      title: 'angular-examples/genkit-angular-story-generator', link:
        'https://github.com/devchas/angular-examples/tree/livestream-base/genkit-angular-story-generator'
    },
    { title: 'Genkit Dev Tools for method', link: 'http://localhost:4000/flows/menuSuggestionFlow' },
  ]

  title = 'angular-genkit';
  menuInput = '';
  theme = signal('');
  studyPlanInput: StudyPlanInput = studyPlan;
  GEMINI_API_KEY = GEMINI_API_KEY;
  studyPlanInputUpdate = signal<StudyPlanInput>(studyPlan);
  imageSrc: string | null = null;

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

  menuResource = resource({
    request: () => this.theme(),
    loader: ({ request }) => runFlow({
      url: 'http://localhost:3000/api/menuSuggestionFlow',
      headers: {
        Authorization: `Bearer ${this.GEMINI_API_KEY}`
      },
      input: { theme: request }
    }),
  });

  onSubmit() {
    this.studyPlanInputUpdate.set(this.studyPlanInput);
    this.studyPlanInputResource.reload();
  }
}


