import { Component, signal, resource } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { runFlow } from 'genkit/beta/client';
import { AngularLogoComponent } from './angular-logo/angular-logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AngularLogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-genkit';
  menuInput = '';
  theme = signal('');
  HUGGING_FACE_TOKEN =   'AIzaSyA4Xw_VubE4U3B-YYoQ9fqAFBUq3SoUNSs';
  menuResource = resource({
    request: () => this.theme(),
    loader: ({ request }) => runFlow({
      url: 'http://localhost:4200/api/menuSuggestionFlow',
      headers: {
        Authorization: `Bearer ${this.HUGGING_FACE_TOKEN}`
      },
      input: { theme: request }
    }),
  });
}
 