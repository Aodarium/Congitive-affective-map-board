import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawingBoardComponent } from './Components/drawing-board/drawing-board.component';
import { SideMenuComponent } from './Components/side-menu/side-menu.component';
import { TopMenuComponent } from './Components/top-menu/top-menu.component';
import { data } from './core/data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DrawingBoardComponent, SideMenuComponent,TopMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Board';
  currentData = data;
}
