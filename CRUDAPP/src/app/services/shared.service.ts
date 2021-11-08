import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://localhost:52105/api";
  readonly PhotoUrl = "http://localhost:52105/Photos/";

  constructor(private http: HttpClient) { }

  getClient():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'/Clients/')
  }

  addclient(val :any){
    return this.http.post(this.APIUrl + '/Clients/', val)
  }

  updateclient(val :any){
    return this.http.put(this.APIUrl + '/Clients/', val)
  }

  deleteclient(val :any){
    return this.http.delete(this.APIUrl + '/Clients/' +  val)
  }

  UploadPhotos(val:any){
    return this.http.post(this.APIUrl+'/Clients/SaveFile', val)
  }


  private _listners= new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: string ){
    this._listners.next(filterBy);
  }

}
