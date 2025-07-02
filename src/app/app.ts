import {
  Component,
  signal,
  computed,
  effect,
  inject,
  ViewChild,
  AfterViewInit,
  DestroyRef,
} from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Counter } from './counter';
import { ConfirmDialog } from './confirm-dialog';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgClass, ConfirmDialog],
  animations: [
    trigger('bounce', [
      transition('* => *', [
        style({ transform: 'scale(1.2)' }),
        animate('200ms ease-out', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
  template: `
    <confirm-dialog (confirmed)="onReset()" #dialog />

    <div
      class="container"
      [ngClass]="{ portrait: isPortrait(), landscape: !isPortrait() }"
    >
      <header>
        <button class="reset-btn" (click)="dialog.open()" title="Reset">
          <span class="material-icons">restart_alt</span>
        </button>

        <div class="score" [@bounce]="bounceKey()">
          {{ displayedPercentage() }}%
        </div>
      </header>

      <main>
        <button class="correct" (click)="onCorrect()">
          <span class="material-icons">check_circle</span>
        </button>
        <button class="wrong" (click)="onWrong()">
          <span class="material-icons">cancel</span>
        </button>
      </main>
    </div>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

      * {
        box-sizing: border-box;
      }

      .container {
        display: flex;
        flex-direction: column;
        height: 100dvh;
        width: 100%;
        background-color: #f5f5f5;
        font-family: sans-serif;
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        background-color: #ffffff;
        border-bottom: 1px solid #ddd;
      }

      .reset-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #666;
        font-size: 1.5rem;
      }

      .score {
        font-size: 1.5rem;
        font-weight: bold;
        color: #333;
      }

      main {
        flex: 1;
        display: flex;
        gap: 1rem;
        padding: 1.5rem;
        justify-content: center;
        align-items: center;
      }

      .portrait main {
        flex-direction: column;
      }

      .landscape main {
        flex-direction: row;
      }

      button.correct,
      button.wrong {
        flex: 1 1 auto;
        aspect-ratio: 1 / 1;
        font-size: clamp(2rem, 6vw, 4rem);
        border: none;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transition: transform 0.2s ease, background 0.2s ease;
      }

      button.correct {
        background-color: #43a047;
        color: white;
      }

      button.wrong {
        background-color: #e53935;
        color: white;
      }

      button:hover {
        transform: scale(1.05);
      }
    `,
  ],
})
export class App implements AfterViewInit {
  private counter = inject(Counter);
  private destroyRef = inject(DestroyRef);

  private bounce = signal(0);
  bounceKey = computed(() => this.bounce());

  private portrait = signal(window.innerHeight > window.innerWidth);
  isPortrait = computed(() => this.portrait());

  // Track the displayed percentage
  displayedPercentage = signal(this.counter.percentage());

  ngAfterViewInit() {
    const resizeObserver = new ResizeObserver(() => {
      this.portrait.set(window.innerHeight > window.innerWidth);
    });
    resizeObserver.observe(document.body);
    this.destroyRef.onDestroy(() => resizeObserver.disconnect());
  }

  onCorrect() {
    this.counter.incrementCorrect();
    this.updateDisplay();
  }

  onWrong() {
    this.counter.incrementWrong();
    this.updateDisplay();
  }

  onReset() {
    this.counter.reset();
    this.updateDisplay();
  }

  private updateDisplay() {
    this.displayedPercentage.set(this.counter.percentage());
    this.bounce.update((v) => v + 1); // trigger bounce animation
  }
}
