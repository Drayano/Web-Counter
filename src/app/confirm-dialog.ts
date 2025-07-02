import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'confirm-dialog',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="overlay" *ngIf="visible">
      <div class="dialog">
        <p>Are you sure you want to reset?</p>
        <div class="actions">
          <button class="confirm" (click)="confirm()">Yes</button>
          <button class="cancel" (click)="cancel()">No</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
      }

      .dialog {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        max-width: 90%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        text-align: center;
      }

      .actions {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
      }

      .confirm {
        background-color: #43a047;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
      }

      .cancel {
        background-color: #e53935;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
      }
    `,
  ],
})
export class ConfirmDialog {
  visible = false;
  @Output() confirmed = new EventEmitter<void>();

  open() {
    this.visible = true;
  }

  cancel() {
    this.visible = false;
  }

  confirm() {
    this.visible = false;
    this.confirmed.emit();
  }
}
