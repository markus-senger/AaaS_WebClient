import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { EMailInsert } from 'src/app/shared/models/e-mail-insert';
import { EMailUpdate} from 'src/app/shared/models/e-mail-update';
import { finalize } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form-for-creating',
  templateUrl: './email-form-for-creating.component.html',
  styleUrls: ['./email-form-for-creating.component.css']
})
export class EMailFormForCreatingComponent implements OnInit {

    @Input() detectorID?: string = "";
    @Input() actionID?: string = "";
    @Input() inputName?: string = "";
    @Input() inputSubject?: string = "";
    @Input() inputMessage?: string = "";
    @Input() inputSentTo?: string = "";
    @Output() reload = new EventEmitter();

    loading: boolean = false;
    connectionError: boolean = false;

    form: FormGroup;

    constructor(private aaasService: AaasService, private fb: FormBuilder) {
        this.form = this.fb.group({
            name: [ "", [Validators.required]],
            subject: [ "", [Validators.required]],
            message: [ "", [Validators.required]],
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

            this.aaasService.insertEMail(insert).pipe(finalize(() => this.loading = false)).
                subscribe(
                {
                    next: () => this.reload.emit("update"),
                    error: () => this.connectionError = true
                });
        }
        else {
            this.loading = true;
            var update = new EMailUpdate();
            update.content = this.form.value.message;
            update.sentTo = this.form.value.sentTo;
            update.subject = this.form.value.subject;

            this.aaasService.updateEMail(this.actionID, update)
                .pipe(finalize(() => this.loading = false)).
                    subscribe(
                    {
                        error: () => this.connectionError = true
                    });
        }
    }

}
