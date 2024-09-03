import { Component, HostListener, Input } from '@angular/core';
import { data } from '../../core/data';

@Component({
  selector: 'g[app-link]',
  standalone: true,
  imports: [],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent {
  @Input() sourceId:any;
  @Input() targetId:any;
  @Input() edge:any;
  @Input() offset: any;
  source:any;
  target:any;
  isSelected:boolean = false;

  ngOnInit() {
    this.source = data.nodes.find((node: any) => node.id === this.sourceId)
    this.target = data.nodes.find((node: any) => node.id === this.targetId)
  }
  @HostListener('mouseenter')
  mouseEnter() {
    this.source.selected = true;
    this.target.selected = true;
  }
  @HostListener('mouseleave')
  mouseLeave() {
    this.source.selected = false;
    this.target.selected = false;
  }

  @HostListener('click')
  onClick() {
    this.isSelected = true;
    data.edges.map((element:any) => {
      if (element.id === this.edge.id) element.selected = true;
      else element.selected = false;
      return element;
    });
  }
}
