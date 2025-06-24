import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface LinkComponentProps {
  readonly title: string;
  readonly link: string;
}

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent {
  readonly router = input<LinkComponentProps[]>([])
}
