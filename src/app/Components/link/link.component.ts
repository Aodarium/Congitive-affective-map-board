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

  ngOnInit() {
    this.source = data.nodes.find((node: any) => node.id === this.sourceId)
    this.target = data.nodes.find((node: any) => node.id === this.targetId)
  }
  @HostListener('mousemove')
  mouseClick() {
    console.log(this.source.position);
    
  }
}
