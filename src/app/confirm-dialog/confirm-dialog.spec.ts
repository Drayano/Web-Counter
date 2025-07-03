import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialog } from './confirm-dialog';
import { By } from '@angular/platform-browser';

describe('ConfirmDialog', () => {
  let fixture: ComponentFixture<ConfirmDialog>;
  let component: ConfirmDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dialog', () => {
    expect(component).toBeTruthy();
  });

  it('should open and show the dialog', () => {
    expect(component.visible).toBeFalse();

    component.open();
    fixture.detectChanges();

    expect(component.visible).toBeTrue();
    const dialog = fixture.debugElement.query(By.css('.dialog'));
    expect(dialog).toBeTruthy();
  });

  it('should close the dialog on cancel', () => {
    component.open();
    fixture.detectChanges();

    component.cancel();
    fixture.detectChanges();

    expect(component.visible).toBeFalse();
  });

  it('should emit confirmed on confirm()', () => {
    spyOn(component.confirmed, 'emit');
    component.open();
    fixture.detectChanges();

    component.confirm();
    fixture.detectChanges();

    expect(component.visible).toBeFalse();
    expect(component.confirmed.emit).toHaveBeenCalled();
  });
});
