import { Component, Input } from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from '../background/background.component';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-drawing-board',
  standalone: true,
  imports: [BackgroundComponent, NodeComponent, LinkComponent, CommonModule],
  templateUrl: './drawing-board.component.html',
  styleUrl: './drawing-board.component.css'
})
export class DrawingBoardComponent {
  @Input() currentData: any;
  offset = {x: 0, y: 0};

  offsetEmitter(offset:any){
    this.offset = offset;
  }
}
