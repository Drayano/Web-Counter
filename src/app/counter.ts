import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Counter {
  private correct = signal(this.load('correct'));
  private wrong = signal(this.load('wrong'));

  readonly correctCount = this.correct.asReadonly();
  readonly wrongCount = this.wrong.asReadonly();

  readonly percentage = computed(() => {
    const total = this.correct() + this.wrong();
    return total === 0 ? 0 : Math.round((this.correct() / total) * 100);
  });

  constructor() {
    effect(() => this.save('correct', this.correct()));
    effect(() => this.save('wrong', this.wrong()));
  }

  incrementCorrect() {
    this.correct.update((c) => c + 1);
  }

  incrementWrong() {
    this.wrong.update((c) => c + 1);
  }

  reset() {
    this.correct.set(0);
    this.wrong.set(0);
  }

  private save(key: string, value: number) {
    localStorage.setItem(key, value.toString());
  }

  private load(key: string): number {
    return parseInt(localStorage.getItem(key) ?? '0', 10);
  }
}
