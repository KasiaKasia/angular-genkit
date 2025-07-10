import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { LinkComponent } from './components/link/link.component';
import { DetectingObjectsInAPhotoComponent } from './detecting-objects/detecting-objects-in-a-photo/detecting-objects-in-a-photo.component';
import { GeneratePlanComponent } from './generate-plan/generate-plan/generate-plan.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AngularLogoComponent, LinkComponent, GeneratePlanComponent, DetectingObjectsInAPhotoComponent],
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
}
