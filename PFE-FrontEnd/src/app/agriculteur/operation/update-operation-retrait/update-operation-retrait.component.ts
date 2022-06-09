import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Service/operation.service';

@Component({
  selector: 'app-update-operation-retrait',
  templateUrl: './update-operation-retrait.component.html',
  styleUrls: ['./update-operation-retrait.component.css'],
})
export class UpdateOperationRetraitComponent implements OnInit {
  operation: Operation = new Operation();
  myForm!: FormGroup;
  CheckesCompetance: boolean = false;

  constructor(
    private translateService: TranslateService,
    private dialogClose: MatDialog,
    private operationService: OperationService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.ValidatedForm();
    this.operationService
      .getOperation(
        JSON.parse(localStorage.getItem('IdOperation') || '[]') || []
      )
      .subscribe((o) => {
        this.operation = o;
        console.log(this.operation);
      });
  }

  updateOperation() {
    this.operationService
      .updateOperationR(this.operation.idOperation, {
        poidsLait: this.myForm.get('poidsLait')?.value,
        dateOperation: this.myForm.get('dateOperation')?.value,
      })
      .subscribe(
        (o) => {
          localStorage.setItem(
            'Toast',
            JSON.stringify([
              'Success',
              'Une operation a été ajouté avec succes',
            ])
          );
          window.location.reload();
          console.log(this.operation);
        },
        (error) => {
          console.log('Failed');
        }
      );
  }

  ValidatedForm() {
    this.myForm = new FormGroup({
      poidsLait: new FormControl(null, [Validators.required]),
      dateOperation: new FormControl(null, [Validators.required]),
    });
  }

  get poidsLait() {
    return this.myForm.get('poidsLait');
  }

  get dateOperation() {
    return this.myForm.get('dateOperation');
  }

  get typeOp() {
    return this.myForm.get('typeOp');
  }

  onClose() {
    this.dialogClose.closeAll();
  }
}
