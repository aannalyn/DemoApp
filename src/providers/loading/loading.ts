import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class LoadingProvider {

  constructor(private loadingCtrl: LoadingController) { }

  show(content: string, duration: number = 3000,  other?) {
    return this.loadingCtrl.create({
      content, duration, ...other
    });
  }

}
