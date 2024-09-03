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
  hasMouseMoved = false;
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
      this.hasMouseMoved = true;
      this.offset.x += event.movementX;
      this.offset.y += event.movementY;
      this.offsetEmitter.emit(this.offset);
      event.preventDefault(); // prevent scrolling on double click event
    }
  }
  @HostListener('click')
  mouseClick() {
    if (this.hasMouseMoved){
      this.hasMouseMoved = false;
      return;
    }
    data.nodes.map((element:any) => {
      element.selected = false;
      return element;
    });
    data.edges.map((element:any) => {
      element.selected = false;
      return element;
    });
  }
  @HostListener('dblclick', ['$event'])
  clickEvent(event:any):void {
    const node = data.nodes.find((node: any) => node.selected)
    if (node){
      node.selected = false;
    }
    else {
      data.nodes.push({ 
        id: uuidv4(),
        label: 'Node 1',
        position: {
          x:event.pageX - (2 * this.offset.x), 
          y:event.pageY - (2 * this.offset.y)
        } 
      })
    }
  }
}
