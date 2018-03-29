import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TodoProvider } from '../../providers/todo/todo';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { ITodo } from '../../models/todo.model';
import { Observable } from 'rxjs/Observable'

@IonicPage()
@Component({
  selector: 'page-to-do',
  templateUrl: 'to-do.html',
})
export class ToDoPage {

  todoList$: Observable<ITodo[]>;

  constructor(
    private todoProvider: TodoProvider,
    private navCtrl: NavController, 
    private navParams: NavParams,
    private loading: LoadingProvider,
    private toast: ToastProvider) {
    
    this.todoList$ = this.todoProvider
      .getTodoList()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      );
  }

  removeTodo(todo: ITodo) {
    let loader = this.loading.show('Deleting...');
    loader.present();
    this.todoProvider.removeTodo(todo).then(res => { 
      loader.dismiss(); 
      this.toast.show('Item Deleted.', 2000);
    });
  }

  todoState(todo: ITodo) {
    this.todoProvider.editTodo(todo).then(() => {
      this.toast.show(`Task ${todo.isDone ? '' : ' not '} completed.`);
    });
 
  }


}
