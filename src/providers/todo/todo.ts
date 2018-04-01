import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { ITodo } from '../../models/todo.model';

@Injectable()
export class TodoProvider {

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    
  }

  getListRef() {
    return this.db.list<ITodo>(`users/${this.afAuth.auth.currentUser.uid}/todo`);
  }

  getTodoList() {
    return this.getListRef();
  }

  addTodo(todo: ITodo) {
    return this.getListRef().push(todo);
  }

  editTodo(todo: ITodo) {
    return this.getListRef().update(todo.key, todo);
  }

  removeTodo(todo: ITodo) {
    return this.getListRef().remove(todo.key);
  }

}
