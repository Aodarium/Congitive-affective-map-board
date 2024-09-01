import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { data } from '../../../core/data';

@Component({
  selector: 'app-reset-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './reset-button.component.html',
  styleUrl: '../side-menu.component.css'
})
export class ResetButtonComponent {
  @HostListener('click')
  clickEvent() {
    data.nodes = []
  }
}
