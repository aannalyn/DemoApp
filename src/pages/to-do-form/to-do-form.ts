import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITodo } from '../../models/todo.model';

import { TodoProvider } from '../../providers/todo/todo';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-to-do-form',
  templateUrl: 'to-do-form.html',
})
export class ToDoFormPage {

  todoForm: FormGroup;
  todo: ITodo;
  action: string;
  
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private fb: FormBuilder,
    private todoProvider: TodoProvider,
    private toast: ToastProvider,
    private loading: LoadingProvider) {
    
    this.action = this.navParams.get('action');      
    this.todo = this.navParams.get('item');
    this.createForm();
  }

  createForm() {
    let task = this.todo ? this.todo['task'] : '';
    this.todoForm = this.fb.group({
      task: [task, Validators.compose([Validators.required])],
    });
  }

  saveTodo() {
    let loader = this.loading.show('Loading', null);
    loader.present();
    
    if (this.todoForm.valid) {

      if (this.action == 'add') {

        this.todoProvider.addTodo({ isDone: false, ...this.todoForm.value }).then(res => {
          loader.dismiss();
          this.navCtrl.pop();
        },err => {
          loader.dismiss();        
          this.toast.show(err.message);
        });
        
      } else if (this.action == 'edit')  {

        this.todo['task'] = this.todoForm.value.task;
        this.todoProvider.editTodo(this.todo).then(res => {
          loader.dismiss();
          this.navCtrl.pop();
        },err => {
          loader.dismiss();        
          this.toast.show(err.message);
        });

      }
    }
  }


}
