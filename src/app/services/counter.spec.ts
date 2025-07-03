import { TestBed } from '@angular/core/testing';
import { Counter } from './counter';

describe('Counter Service', () => {
  let service: Counter;
  let localStorageMock: Record<string, string> = {};

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(
      (key: string) => localStorageMock[key] || null
    );
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        localStorageMock[key] = value;
      }
    );
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete localStorageMock[key];
    });

    TestBed.configureTestingModule({
      providers: [Counter],
    });
    service = TestBed.inject(Counter);
  });

  it('should initialize with 0 correct and 0 wrong answers', () => {
    expect(service.getCorrect()).toBe(0);
    expect(service.getWrong()).toBe(0);
    expect(service.percentage()).toBe(0);
  });

  it('should increment correct count and update percentage', () => {
    service.incrementCorrect();
    expect(service.getCorrect()).toBe(1);
    expect(service.percentage()).toBe(100);
  });

  it('should increment wrong count and update percentage', () => {
    service.incrementWrong();
    expect(service.getWrong()).toBe(1);
    expect(service.percentage()).toBe(0);
  });

  it('should calculate correct percentage correctly', () => {
    service.incrementCorrect();
    service.incrementWrong();
    expect(service.percentage()).toBe(50);
  });

  it('should reset all counts and percentage', () => {
    service.incrementCorrect();
    service.incrementWrong();
    service.reset();
    expect(service.getCorrect()).toBe(0);
    expect(service.getWrong()).toBe(0);
    expect(service.percentage()).toBe(0);
  });

  it('should persist to localStorage', () => {
    service.incrementCorrect();
    service.incrementWrong();
    expect(localStorage.setItem).toHaveBeenCalledWith('correct', '1');
    expect(localStorage.setItem).toHaveBeenCalledWith('wrong', '1');
  });
});
