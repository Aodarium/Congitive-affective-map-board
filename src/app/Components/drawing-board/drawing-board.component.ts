import { Component, Input } from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from '../background/background.component';

@Component({
  selector: 'app-drawing-board',
  standalone: true,
  imports: [BackgroundComponent, NodeComponent, CommonModule],
  templateUrl: './drawing-board.component.html',
  styleUrl: './drawing-board.component.css'
})
export class DrawingBoardComponent {
  offset = {x: 0, y: 0};
  @Input() currentData: any;

  ngAfterContentInit() {
    console.log(this.currentData);
  }

  offsetEmitter(offset:any){
    this.offset = offset;
    console.log(this.offset);
    
  }
}
