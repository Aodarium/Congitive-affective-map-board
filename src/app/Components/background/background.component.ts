import { v4 as uuidv4 } from 'uuid';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { data } from '../../core/data';

@Component({
  selector: 'g[app-background]',
  standalone: true,
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css'
})
export class BackgroundComponent {
  @Output() offsetEmitter = new EventEmitter<any>();

  @Input() offset: any;
  isMouseDown = false;

  @HostListener('mousedown', ['$event'])
  mouseDown(event:any) {
    this.isMouseDown = true;
  }
  @HostListener('mouseup', ['$event'])
  mouseUp(event:any) {
    this.isMouseDown = false;
  }
  @HostListener('mousemove', ['$event'])
  mouseMove(event:any) {
    if (this.isMouseDown) {
      this.offset.x += event.movementX;
      this.offset.y += event.movementY;
      this.offsetEmitter.emit(this.offset);
      event.preventDefault(); // prevent scrolling on double click event
    }

  }

  @HostListener('dblclick', ['$event'])
  clickEvent(event:any):void {
    console.log('Clicked on background:', event.offsetX, event.offsetY);
    const node = data.nodes.find((node: any) => node.selected)
    if (node){
      node.selected = false;
    }
    else {

      data.nodes.push({ id: uuidv4(), label: 'Node 1', position: {x:event.clientX, y:event.clientY} })
    }
  }
}
