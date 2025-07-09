import { Component, signal, resource } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { runFlow } from 'genkit/beta/client';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { LinkComponent } from './components/link/link.component';
import { GEMINI_API_KEY } from './settings/settings';
import { FormComponent } from './common/form/form.component';

export interface StudyPlanInput {
  subject: string;
  level: string;
  timePerDay?: string;
  durationWeeks?: number;
}

export const studyPlan: StudyPlanInput = {
  subject: 'matematyka',
  level: 'średniozaawansowany'
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AngularLogoComponent, LinkComponent, FormComponent],
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
  GEMINI_API_KEY = GEMINI_API_KEY;
  imageSrc: string | null = null;

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

}


