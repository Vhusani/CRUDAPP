import { Component, NgModule, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from '../function/edit/edit.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private service: SharedService, private modalService: NgbModal) {
    this.refreshClientList();
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshClientList();
    })
  }

  ClientsList: any = [];
  ModalTtitle!: string;
  ActivatedAddEditClient: boolean = false;
  client!: any;
  closeResult = '';
  clientPhotopath: any;

  ngOnInit(): void {
    this.clientPhotopath = this.service.PhotoUrl;
  }

  refreshClientList() {
    this.service.getClient().subscribe(data => {
      this.ClientsList = data;
      console.log(data);
    });
  }

  addContact() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    console.log(ngbModalOptions);
    const modalRef = this.modalService.open(EditComponent, ngbModalOptions);
    modalRef.componentInstance.ModalTtitle = "Add Client";
    modalRef.componentInstance.client = this.client = {
      clientId: 0,
      clientName: "",
      clientSurname: "",
      clientPhone: "",
      clientDOB: "",
      clientAddress: "",
      clientPhoto: "human.jpg"
    }
    this.ActivatedAddEditClient = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure?')) {
      this.service.deleteclient(item.clientId).subscribe(data => {
        alert(data.toString());
        this.refreshClientList();
      })
    }
  }

  editClick(item: any) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    console.log(ngbModalOptions);
    const modalRef = this.modalService.open(EditComponent, ngbModalOptions);
    modalRef.componentInstance.ModalTtitle = "Edit Client";
    modalRef.componentInstance.client = item;
    this.ActivatedAddEditClient = true;
  }


}
