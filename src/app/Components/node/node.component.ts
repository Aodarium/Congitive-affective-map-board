import { Component, HostListener, Input } from '@angular/core';
import { data } from '../../core/data';

@Component({
  selector: 'g[app-node]',
  standalone: true,
  imports: [],
  templateUrl: './node.component.html',
  styleUrl: './node.component.css',
})
export class NodeComponent {
  @Input() offset: any;
  @Input() node: any;
  isMouseDown = false;
  hasMoved = false;
  position: any;

  ngAfterContentInit() {
    this.position = {
      x: this.node.position.x + this.offset.x - 100, 
      y: this.node.position.y + this.offset.y - 50
    };
  }

  setPosition(position: {x: number, y: number}){
    this.position = position;
    data.nodes.find((node: any) => node.id === this.node.id).position = position;
  }
  @HostListener('click')
  clickEvent() {
    if (this.hasMoved){
      this.hasMoved = false;  // reset moved status on mouse up event
      return;
    }
    data.nodes.map((element:any) => {
      if (element.id === this.node.id) element.selected = true;
      else element.selected = false;
      return element;
    });
  }

  @HostListener('mousedown', ['$event'])
  mouseDown(event:any) {
    this.isMouseDown = true;
    data.nodes.map((element:any) => {
      if (element.id === this.node.id) element.selected = true;
      else element.selected = false;
      return element;
    });
  }
  @HostListener('mouseup', ['$event'])
  mouseUp(event:any) {
    this.isMouseDown = false;
  }
  @HostListener('mousemove', ['$event'])
  mouseMove(event:any) {
    if (this.isMouseDown) {
      this.hasMoved = true;  // mark node as moved for click event handling later      
      this.setPosition({
        x: event.clientX - this.offset.x - 100, 
        y: event.clientY - this.offset.y - 50
      });
      event.preventDefault(); // prevent scrolling on double click event
    }
  }
}
