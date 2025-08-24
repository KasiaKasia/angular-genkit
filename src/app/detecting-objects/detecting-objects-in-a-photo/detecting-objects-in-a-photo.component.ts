import { Component, ElementRef, ViewChild } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
@Component({
  selector: 'app-detecting-objects-in-a-photo',
  standalone: true,
  templateUrl: './detecting-objects-in-a-photo.component.html',
  styleUrl: './detecting-objects-in-a-photo.component.scss'
})
export class DetectingObjectsInAPhotoComponent {
  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;
  predictions: cocoSsd.DetectedObject[] = [];
  imageSrc: string | null = null;


  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;

      setTimeout(() => {
        const img = this.imageRef.nativeElement;
        img.onload = () => this.detectObjects();
      });
    };

    reader.readAsDataURL(file);
  }

  async detectObjects() {
    const img = this.imageRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d')!;

    canvas.width = img.width;
    canvas.height = img.height;

    const model = await cocoSsd.load();
    this.predictions = await model.detect(img);

    context.drawImage(img, 0, 0, img.width, img.height);
    this.predictions.forEach(pred => {
      context.strokeStyle = 'red';
      context.lineWidth = 2;
      context.strokeRect(...pred.bbox);

      context.font = '16px Arial';
      context.fillStyle = 'red';
      context.fillText(`${pred.class} (${Math.round(pred.score * 100)}%)`, pred.bbox[0], pred.bbox[1] - 5);
    });
  }
}
