import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { WebHookInsert } from 'src/app/shared/models/web-hook-insert';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-web-hook-form-for-creating',
  templateUrl: './web-hook-form-for-creating.component.html',
  styleUrls: ['./web-hook-form-for-creating.component.css']
})
export class WebHookFormForCreatingComponent {

    @Input() detectorID?: string = "";
    @Output() reload = new EventEmitter();

    loading: boolean = false;
    connectionError: boolean = false;

    name: string = "";
    url: string = "";
    tool: string = "";

    constructor(private aaasService: AaasService) { }

    submit(): void {
        var insert = new WebHookInsert();
        insert.url = this.url;
        insert.tool = this.tool;
        insert.detectorID = this.detectorID;
        insert.name = this.name;
        this.aaasService.insertWebHook(insert).pipe(finalize(() => this.loading = false)).
            subscribe(
            {
                next: () => this.reload.emit("update"),
                error: () => this.connectionError = true
            });
    }

}
