import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Counter } from './services/counter';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('App', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<App>>;
  let component: App;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        Counter,
        provideZonelessChangeDetection(),
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial percentage and counts', () => {
    expect(element.querySelector('.score')?.textContent).toContain('0%');
    expect(element.querySelector('.correct-count')?.textContent).toContain('0');
    expect(element.querySelector('.wrong-count')?.textContent).toContain('0');
  });

  it('should increment correct count and update percentage', () => {
    component.onCorrect();
    fixture.detectChanges();

    expect(component.correctCount()).toBe(1);
    expect(component.displayedPercentage()).toBe(100);
    expect(element.querySelector('.score')?.textContent).toContain('100%');
    expect(element.querySelector('.correct-count')?.textContent).toContain('1');
  });

  it('should increment wrong count and update percentage', () => {
    component.onWrong();
    fixture.detectChanges();

    expect(component.wrongCount()).toBe(1);
    expect(component.displayedPercentage()).toBe(0);
    expect(element.querySelector('.score')?.textContent).toContain('0%');
    expect(element.querySelector('.wrong-count')?.textContent).toContain('1');
  });

  it('should reset counts and percentage', () => {
    component.onCorrect();
    component.onWrong();
    fixture.detectChanges();

    component.onReset();
    fixture.detectChanges();

    expect(component.correctCount()).toBe(0);
    expect(component.wrongCount()).toBe(0);
    expect(component.displayedPercentage()).toBe(0);
    expect(element.querySelector('.score')?.textContent).toContain('0%');
  });
});
