import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { EMailInsert } from 'src/app/shared/models/e-mail-insert';
import { EMailUpdate} from 'src/app/shared/models/e-mail-update';
import { finalize } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDisplayComponent } from '../../loading-display/loading-display.component';

@Component({
  selector: 'app-email-form-for-creating',
  templateUrl: './email-form-for-creating.component.html',
  styleUrls: ['./email-form-for-creating.component.css']
})
export class EMailFormForCreatingComponent implements OnInit {

    @Input() event?: any;
    @Input() detectorID?: string = "";
    @Input() actionID?: string = "";
    @Input() inputName?: string = "";
    @Input() inputSubject?: string = "";
    @Input() inputMessage?: string = "";
    @Input() inputSentTo?: string = "";

    connectionError: boolean = false;

    form: FormGroup;

    constructor(private aaasService: AaasService, private fb: FormBuilder, public dialog: MatDialog) {
        this.form = this.fb.group({
            name: [ "", [Validators.required, Validators.pattern("[a-zA-Z-:,?!äöü1-9 ]*")]],
            subject: [ "", [Validators.required, Validators.pattern("[a-zA-Z-:,?!äöü1-9 ]*")]],
            message: [ "", [Validators.required, Validators.pattern("[a-zA-Z-:,?!äöü1-9 ]*")]],
            sentTo: [ "", [Validators.required, Validators.email]]
        });
    }

    ngOnInit(): void {
        this.form.reset({name: this.inputName, disabled: true, subject: this.inputSubject, message: this.inputMessage, sentTo: this.inputSentTo});
    }

    submit(): void {
        if(this.inputName == "") {
            var insert = new EMailInsert();
            insert.subject = this.form.value.subject;
            insert.content = this.form.value.message;
            insert.sentTo = this.form.value.sentTo;
            insert.name = this.form.value.name;
            insert.detectorID = this.detectorID;

            this.aaasService.insertEMail(insert)
                .subscribe(
                    {
                        next: () => this.refresh(),
                        error: () => this.connectionError = true
                    });
        }
        else {
            var update = new EMailUpdate();
            update.content = this.form.value.message;
            update.sentTo = this.form.value.sentTo;
            update.subject = this.form.value.subject;

            this.aaasService.updateEMail(this.actionID, update)
                .subscribe(
                    {
                        next: () => this.refresh(),
                        error: () => this.connectionError = true
                    });
        }
    }

    refresh() {
        this.dialog.open(LoadingDisplayComponent, { disableClose: true, 
            data: this.event
        });
    }

}
