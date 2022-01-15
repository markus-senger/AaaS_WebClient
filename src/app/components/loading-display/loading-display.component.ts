import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-display',
  templateUrl: './loading-display.component.html',
  styleUrls: ['./loading-display.component.css']
})
export class LoadingDisplayComponent {

    WAIT_FOR_AAAS_MS: number = 500;

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<LoadingDisplayComponent>) {
        if(data) { 
            setTimeout(() => { data.emit("update"); setTimeout(() => this.dialogRef.close(true), 200) }, this.WAIT_FOR_AAAS_MS);
        }
        else {
            setTimeout(() => { setTimeout(() => this.dialogRef.close(true), 200) }, this.WAIT_FOR_AAAS_MS);
        }
    }

}
