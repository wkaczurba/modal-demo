# Demo of Modal for Angular 7 / Ngbootstrap:

This repo contains demo of Angular 7 modal with Bootstrap.
You can simply clone the repo or follow the tutorial below.
Happy coding.


# Step-by-instap installation Tutorial

## 1. Installing Angular + Ngbootstrap + Bootstrap (Angular 7):

Execute the following:

```
ng new modal-demo
cd modal-demo
npm install --save @ng-bootstrap/ng-bootstrap
```

Install bootstrap (we are interested only in CSS); ignore warning about jquery, popper, fsevent:

```
npm install --save bootstrap
```
        
Add bootstrap.css: open (angular.json), add into “styles” array the following entry:

```
   "styles": [
	  ...
	  "node_modules/bootstrap/dist/css/bootstrap.min.css"
	],
```

Add into src\app\app.module.ts @ngbootstrap:

```
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
```

And add NgbModule into array in app.module.ts

```
@NgModule({
   …
  imports: [
    …
    NgbModule
  ], ...
})
```

The above sets basic working environment

## 2. Main modal business:

Create modal-simple:

```
ng generate component modal-simple
```

edit src\app\modal-simple\modal-simple.component.html with the following. Notice #content. We will refer to it in @ViewChild later.

```
<ng-template #content let-modal>
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">Are you sure?</h4>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>You have not finished reading my code. Are you sure you want to close?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="modal.close('yes')">Yes</button>
    <button type="button" class="btn btn-outline-dark" (click)="modal.close('no')">No</button>
  </div>
</ng-template>
```

Change src\app\modal-simple\modal-simple.component.html:

Import and Inject NgbModal into the component. It is needed for any model dealings:

```
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
```

And inject it into constructor:

```
export class ModalSimpleComponent implements OnInit {

  constructor(private modalService : NgbModal) { }
  ...
}
```

Since we need to reference the template (see #content in HTML) - we will use @ViewChild to refer
to the DOM component. In order to Emit an event to outer component - we will use EventEmmiter.
So import the following ones: ViewChild, Output, EventEmitter from @angular/core:

```
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
```

And in the class define output:

```
export class ModalSimpleComponent implements OnInit {
  @ViewChild('content') content;
  @Output() result : EventEmitter<string> = new EventEmitter();
  
  constructor(private modalService : NgbModal) { }
  ngOnInit() { }
}
```

The most exictment is in opening modal. Add the following function that open modal and emits an event:

```
 open() {
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-simple-title'})
      .result.then((result) => { console.log(result as string); this.result.emit(result) }, 
        (reason) => { console.log(reason as string); this.result.emit(reason) })
  }
```
	
Your final modal-simple-component.ts should look like this:

```
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-simple',
  templateUrl: './modal-simple.component.html',
  styleUrls: ['./modal-simple.component.css']
})
export class ModalSimpleComponent implements OnInit {
  @ViewChild('content') content;
  @Output() result : EventEmitter<string> = new EventEmitter();

  constructor(private modalService : NgbModal) { }

  open() {
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-simple-title'})
      .result.then((result) => { console.log(result as string); this.result.emit(result) }, 
        (reason) => { console.log(reason as string); this.result.emit(reason) })
  }

  ngOnInit() {
  }
}
```

## 3. Demo the modal component (App-component.html)

Now lets demo it.
Replace the content of the original app.component.html with:

```
<app-modal-simple #mymodal (result)="onModalClose($event)"></app-modal-simple>
<button (click)="mymodal.open()">Open modal</button>

<p>
Result is {{ modalCloseResult }}
</p>
```

In your app.component.html add function that handles closing of the modal:

```
export class AppComponent {
  modalCloseResult : string;
  ...

  onModalClose(reason : string) {
    this.modalCloseResult = reason;
  }  
}
```

So final app.component.ts should look like:

```
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
```

Voila!

See source code for all details.
The above is adopted from https://ng-bootstrap.github.io/#/components/modal/examples It adds external component to make it into two-way communication.
