import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { ITodo } from '../../models/todo.model';

@Injectable()
export class TodoProvider {
  
  private todoListRef = this.db.list<ITodo>(`users/${this.getUserID()}/todo`);

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  getUserID() {
    return this.afAuth.auth.currentUser.uid;
  }

  getTodoList() {
    return this.todoListRef;
  }

  addTodo(todo: ITodo) {
    return this.todoListRef.push(todo);
  }

  editTodo(todo: ITodo) {
    return this.todoListRef.update(todo.key, todo);
  }

  removeTodo(todo: ITodo) {
    return this.todoListRef.remove(todo.key);
  }

}
