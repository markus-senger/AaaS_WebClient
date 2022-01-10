import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { EMailInsert } from 'src/app/shared/models/e-mail-insert';
import { finalize } from 'rxjs';

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

    name: string = "";
    subject: string = "";
    message: string = "";
    sentTo: string = "";

    constructor(private aaasService: AaasService) { }

    submit(): void {
        var insert = new EMailInsert();
        insert.subject = this.subject;
        insert.content = this.message;
        insert.sentTo = this.sentTo;
        insert.detectorID = this.detectorID;
        insert.name = this.name;
        this.aaasService.insertEMail(insert).pipe(finalize(() => this.loading = false)).
            subscribe(
            {
                next: () => this.reload.emit("update"),
                error: () => this.connectionError = true
            });
    }

}
