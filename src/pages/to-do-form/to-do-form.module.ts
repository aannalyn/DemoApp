import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToDoFormPage } from './to-do-form';

@NgModule({
  declarations: [
    ToDoFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ToDoFormPage),
  ],
})
export class ToDoFormPageModule {}
