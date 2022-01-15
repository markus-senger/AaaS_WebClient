import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-detector',
  templateUrl: './remove-detector.component.html',
  styleUrls: ['./remove-detector.component.css']
})
export class RemoveDetectorComponent {

    message: string = "Löschen?"
    confirmButtonText = "Ja"
    cancelButtonText = "Nein"
    constructor(@Inject(MAT_DIALOG_DATA) private data: any,
                private dialogRef: MatDialogRef<RemoveDetectorComponent>) {
        if(data){
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }
  
    onConfirmClick(): void {
        this.dialogRef.close(true);
    }

}
