import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { WebHookInsert } from 'src/app/shared/models/web-hook-insert';
import { finalize } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebHookUpdate } from 'src/app/shared/models/web-hook-update';

@Component({
  selector: 'app-web-hook-form-for-creating',
  templateUrl: './web-hook-form-for-creating.component.html',
  styleUrls: ['./web-hook-form-for-creating.component.css']
})
export class WebHookFormForCreatingComponent implements OnInit {

    @Input() detectorID?: string = "";
    @Input() inputName?: string = "";
    @Input() inputURL?: string = "";
    @Input() inputTool?: string = "";
    @Output() reload = new EventEmitter();

    loading: boolean = false;
    connectionError: boolean = false;

    form: FormGroup;

    constructor(private aaasService: AaasService, private fb: FormBuilder) { 
        this.form = this.fb.group({
            name: [ "", [Validators.required]],
            url: [ "", [Validators.required]],
            tool: [ "", [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.form.reset({name: this.inputName, disabled: true, url: this.inputURL, tool: this.inputTool});
    }

    submit(): void {
        if(this.inputName == "") {
            var insert = new WebHookInsert();
            insert.url = this.form.value.url;
            insert.tool = this.form.value.tool;
            insert.name = this.form.value.name;
            insert.detectorID = this.detectorID;

            this.aaasService.insertWebHook(insert).pipe(finalize(() => this.loading = false)).
                subscribe(
                {
                    next: () => this.reload.emit("update"),
                    error: () => this.connectionError = true
                });
        }
        else {
            this.loading = true;
            var update = new WebHookUpdate();
            update.tool = this.form.value.tool;
            update.url = this.form.value.url;

            this.aaasService.updateWebHook(this.detectorID, update)
                .pipe(finalize(() => this.loading = false)).
                    subscribe(
                    {
                        error: () => this.connectionError = true
                    });
        }
    }

}
