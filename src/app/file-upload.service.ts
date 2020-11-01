import { Injectable } from '@angular/core';  
import { HttpClient, HttpRequest, HttpEvent,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

interface filesSearch{
  fileName:String;
  fileLocationUrl:String;

}

@Injectable({ 
  providedIn: 'root'
})
export class FileUploadService {  

  SERVER_URL:string ="http://localhost:9999/"; 
  currentDate = new Date();

  constructor(private http: HttpClient) {
     
  }

  //   upload(formData){

  //   return this._http.post<any>(
  //     this.SERVER_URL,
  //     formData,
  //       {reportProgress :true,
  //        observe:'events' 
  //       }
  //     );
  //  }

  //  uploadFiles() {

  //  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    const headers= new HttpHeaders();

    formData.append('file', file); 
    formData.append('Uploaddate', this.currentDate.toString()); 

    const req = new HttpRequest('POST', `${this.SERVER_URL}`+"/UplaodFile", formData, {
      headers:headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

   getFiles() : Observable<any> { 
      return this.http.get(`${this.SERVER_URL}`+"/AllUploads");
    }


   removeFiles(fileName:String) : Observable<any> { 
      return this.http.get(`${this.SERVER_URL}`+"removeFile?fileName="+fileName);
   }
}
