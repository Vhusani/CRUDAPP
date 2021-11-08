import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private modalService: NgbModal, private service: SharedService) { }

  @Input() client: any;
  clientId!: number;
  clientName!: string;
  clientSurname!: string;
  clientPhone!: string;
  clientDOB!: string;
  clientAddress!: string;
  clientPhoto!: string;
  clientPhotopath!: string;


  ClientsList: any = [];
  ModalTtitle!: string;
  ActivatedAddEditClient: boolean = false;

  ngOnInit(): void {
    this.clientId = this.client.clientId;
    this.clientName = this.client.clientName;
    this.clientSurname = this.client.clientSurname;
    this.clientPhone = this.client.clientPhone;
    this.clientDOB = this.client.clientDOB;
    this.clientAddress = this.client.clientAddress;
    this.clientPhoto = this.client.clientPhoto;
    this.clientPhotopath = this.service.PhotoUrl + this.clientPhoto;
  }

  addContact() {
    var val = {
      clientId: this.clientId,
      clientName: this.clientName,
      clientSurname: this.clientSurname,
      clientPhone: this.clientPhone,
      clientDOB: this.clientDOB,
      clientAddress: this.clientAddress,
      clientPhoto: this.clientPhoto
    };
    this.service.addclient(val).subscribe(res => {
      alert(res.toString());
    });
  }

  UpdateContact() {
    var val = {
      clientId: this.clientId,
      clientName: this.clientName,
      clientSurname: this.clientSurname,
      clientPhone: this.clientPhone,
      clientDOB: this.clientDOB,
      clientAddress: this.clientAddress,
      clientPhoto: this.clientPhoto
    };
    this.service.updateclient(val).subscribe(res => {
      alert(res.toString());
    });
  }

  refreshClientList() {
    this.service.getClient().subscribe(data => {
      this.ClientsList = data;
      console.log(data);
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhotos(formData).subscribe((data: any) => {
      this.clientPhoto = data.toString();
      this.clientPhotopath = this.service.PhotoUrl + this.clientPhoto;
    })
  }

  closeClick() {
    this.ActivatedAddEditClient = false;
    this.refreshClientList();
    this.service.filter('register click');
    this.modalService.dismissAll();
  }

}
