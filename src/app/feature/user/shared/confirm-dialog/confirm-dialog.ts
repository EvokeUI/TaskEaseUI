import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule, MatIconModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  @Input() ok_btn: string = "";
  @Input() cancel_btn: string = "";
  @Input() message: string = "";

  @Output() confirm = new EventEmitter<boolean>();

  giveConfirmation(){
    this.confirm.emit(true);
  }

  cancel(){
    this.confirm.emit(false);
  }

}
