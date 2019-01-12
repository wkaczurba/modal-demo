import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  modalCloseResult : string;
  title = 'modal-demo';

  onModalClose(reason : string) {
    this.modalCloseResult = reason;
  }    
}
