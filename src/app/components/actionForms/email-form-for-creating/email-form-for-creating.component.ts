import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { EMailInsert } from 'src/app/shared/models/e-mail-insert';
import { finalize } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form-for-creating',
  templateUrl: './email-form-for-creating.component.html',
  styleUrls: ['./email-form-for-creating.component.css']
})
export class EMailFormForCreatingComponent {

    @Input() detectorID?: string = "";
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

    submit(): void {
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

}
