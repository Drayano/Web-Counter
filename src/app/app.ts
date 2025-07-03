import {
  Component,
  signal,
  computed,
  inject,
  AfterViewInit,
  DestroyRef,
} from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Counter } from './counter';
import { ConfirmDialog } from './confirm-dialog';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgClass, MatButtonModule, MatIconModule, ConfirmDialog],
  animations: [
    trigger('bounce', [
      transition('* => *', [
        style({ transform: 'scale(1.2)' }),
        animate('200ms ease-out', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements AfterViewInit {
  private counter = inject(Counter);
  private destroyRef = inject(DestroyRef);

  private bounce = signal(0);
  bounceKey = computed(() => this.bounce());

  private portrait = signal(window.innerHeight > window.innerWidth);
  isPortrait = computed(() => this.portrait());

  displayedPercentage = signal(this.counter.percentage());
  correctCount = computed(() => this.counter.getCorrect());
  wrongCount = computed(() => this.counter.getWrong());

  ngAfterViewInit() {
    const resizeObserver = new ResizeObserver(() => {
      this.portrait.set(window.innerHeight > window.innerWidth);
    });
    resizeObserver.observe(document.body);
    this.destroyRef.onDestroy(() => resizeObserver.disconnect());
  }

  private playFeedback() {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  onCorrect() {
    this.counter.incrementCorrect();
    this.playFeedback();
    this.updateDisplay();
  }

  onWrong() {
    this.counter.incrementWrong();
    this.playFeedback();
    this.updateDisplay();
  }

  onReset() {
    this.counter.reset();
    this.updateDisplay();
  }

  private updateDisplay() {
    this.displayedPercentage.set(this.counter.percentage());
    this.bounce.update((v) => v + 1);
  }
}
