import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.scss'],
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
