import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorChromeModule } from "ngx-color/chrome"


@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [ColorChromeModule, FormsModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css'
})
export class GeneratorComponent {
  @ViewChild('memeCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;

  topText: string = '';
  bottomText: string = '';
  fileEvent: any;

  preview(e: any) {
    this.fileEvent = e;

    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext("2d");

    let render = new FileReader();
    render.readAsDataURL(e.target.files[0])
    render.onload = function (event) {
      const img = new Image();
      img.src = event.target?.result as string

      img.onload = function () {
        ctx?.drawImage(img, 50, 150, 500, 550)
      }
    }
  }


  drawText() {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      this.preview(this.fileEvent)
      ctx.fillStyle = '#000000'
      ctx.font = '50PX Comic Sans Ms'
      ctx.textAlign = "center"
      ctx?.fillText(this.topText, canvas.width / 2, 100)
      ctx?.fillText(this.bottomText, canvas.width / 2, 750)
    }
  }
}
