import { Injectable, signal, computed } from '@angular/core';

function getLocalNumber(key: string): number {
  const value = localStorage.getItem(key);
  return value !== null ? +value : 0;
}

@Injectable({ providedIn: 'root' })
export class Counter {
  readonly correctCount = signal<number>(getLocalNumber('correct'));
  readonly wrongCount = signal<number>(getLocalNumber('wrong'));

  getCorrect = () => this.correctCount();
  getWrong = () => this.wrongCount();

  percentage = computed(() => {
    const total = this.correctCount() + this.wrongCount();
    return total ? Math.round((this.correctCount() / total) * 100) : 0;
  });

  incrementCorrect() {
    this.correctCount.update((v) => {
      const updated = v + 1;
      localStorage.setItem('correct', updated.toString());
      return updated;
    });
  }

  incrementWrong() {
    this.wrongCount.update((v) => {
      const updated = v + 1;
      localStorage.setItem('wrong', updated.toString());
      return updated;
    });
  }

  reset() {
    localStorage.removeItem('correct');
    localStorage.removeItem('wrong');
    this.correctCount.set(0);
    this.wrongCount.set(0);
  }
}
