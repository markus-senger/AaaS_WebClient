import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { WebHookInsert } from 'src/app/shared/models/web-hook-insert';
import { finalize } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebHookUpdate } from 'src/app/shared/models/web-hook-update';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDisplayComponent } from '../../loading-display/loading-display.component';

@Component({
  selector: 'app-web-hook-form-for-creating',
  templateUrl: './web-hook-form-for-creating.component.html',
  styleUrls: ['./web-hook-form-for-creating.component.css']
})
export class WebHookFormForCreatingComponent implements OnInit {

    @Input() event?: any;
    @Input() detectorID?: string = "";
    @Input() actionID?: string = "";
    @Input() inputName?: string = "";
    @Input() inputURL?: string = "";
    @Input() inputTool?: string = "";

    connectionError: boolean = false;

    form: FormGroup;

    constructor(private aaasService: AaasService, private fb: FormBuilder, public dialog: MatDialog) { 
        this.form = this.fb.group({
            name: [ "", [Validators.required, Validators.pattern("[a-zA-Z-:,?!äöü1-9 ]*")]],
            url: [ "", [Validators.required, Validators.pattern("[a-zA-Z-:,?!äöü1-9 ]*")]],
            tool: [ "", [Validators.required, Validators.pattern("[a-zA-Z-:,?!äöü1-9 ]*")]],
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

            this.aaasService.insertWebHook(insert).
                subscribe(
                {
                    next: () => this.refresh(),
                    error: () => this.connectionError = true
                });
        }
        else {
            var update = new WebHookUpdate();
            update.tool = this.form.value.tool;
            update.url = this.form.value.url;

            this.aaasService.updateWebHook(this.actionID, update)
                .subscribe(
                    {
                        next:() => this.refresh(),
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
