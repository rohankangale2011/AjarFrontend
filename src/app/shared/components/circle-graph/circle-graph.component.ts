import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-circle-graph',
  templateUrl: './circle-graph.component.html',
  styleUrls: ['./circle-graph.component.scss']
})
export class CircleGraphComponent implements OnInit, OnChanges {
  @Input() amountPercent;
  canvas = null;
  context = null;
  startAngle = 0;
  centerX;
  centerY;
  constructor() { }

  ngOnInit(): void {
    this.canvas = document.getElementById('myCanvas');
    this.context = this.canvas.getContext('2d');
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    const radius = 40;

    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fillStyle = '#85C6FE';
    this.context.fill();

    // setTimeout(() => {
    //   this.drawPercentCircle(60);
    // }, 2000);
  }

  ngOnChanges(changes: any) {
    // console.log('Changes:', changes);
    if (changes && changes.amountPercent) {
      setTimeout(() => {
        console.log('draw now');
        this.drawPercentCircle(changes.amountPercent.currentValue || 0);
      }, 1000);
    }
  }

  drawPercentCircle(percent) {
    // console.log('percent:', percent);
    if (this.canvas) {
      // const centerX = this.canvas.width / 2;
      // const centerY = this.canvas.height / 2;
      const radius = 40;
      // const startAngle = 0;
      let endAngle = 0;
      const unitValue = (Math.PI - 0.5 * Math.PI) / 25;
      if (percent >= 0 && percent <= 25) {
        endAngle = this.startAngle + (percent * unitValue);
      } else if (percent > 25 && percent <= 50) {
        endAngle = this.startAngle + (percent * unitValue);
      } else if (percent > 50 && percent <= 75) {
        endAngle = this.startAngle + (percent * unitValue);
      } else if (percent > 75 && percent <= 100) {
        endAngle = this.startAngle + (percent * unitValue);
      }

      this.context.beginPath();
      // this.context.moveTo(this.centerX, this.centerY);
      this.context.arc(this.centerX, this.centerY, radius, this.startAngle, endAngle, false);
      this.context.closePath();
      this.context.fillStyle = '#4F99D6';
      this.context.fill();
      // this.context.closePath();
    }
  }

}
