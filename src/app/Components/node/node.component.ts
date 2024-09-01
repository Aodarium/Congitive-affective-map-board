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
  position: any;

  ngAfterContentInit() {
    console.log(this.node);
    
    this.position = {
      x: this.node.position.x + this.offset.x, 
      y: this.node.position.y + this.offset.y
    };
  }

  setPosition(position: {x: number, y: number}){
    this.position = position;
  }
  getPosition() { 
    return {
      x: this.position.x + this.offset.x, 
      y: this.position.y + this.offset.y}; 
  }
  @HostListener('click')
  clickEvent() {
    console.log('Clicked on node:', this.node);
    data.nodes.map((element:any) => {
      if (element.id === this.node.id) element.selected = true;
      else element.selected = false;
      return element;
    });
    console.table(data.nodes);
    
  }
}
