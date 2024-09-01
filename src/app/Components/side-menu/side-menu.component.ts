import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ResetButtonComponent } from './reset-button/reset-button.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [MatIconModule, ResetButtonComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

}
