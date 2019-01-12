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
