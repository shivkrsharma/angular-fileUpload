import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router'


interface filesSearch{
  fileName:String;
  fileLocationUrl:String;

}

@Component({ 
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {
 
  constructor(private uplaodService: FileUploadService,private router: Router ) { }
  filesSearch :filesSearch[];

  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<filesSearch[]>;

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';
  
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    this.uplaodService.upload(file).subscribe(
      event => {

        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uplaodService.getFiles();
        } 
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      }); 
  }

  ngOnInit() { 
     this.uplaodService.getFiles().subscribe(
      (data)=>{
        
        this.filesSearch=data;
     }
    );
   } 


  deleteFiles(fileName:String){ 
    
    console.log("file name to delete"+fileName);
    this.uplaodService.removeFiles(fileName).subscribe(
      (data)=>{console.log(data);}
      );

    this.ngOnInit();  
    this.router.navigateByUrl('home');  
      
  }  



















//   files:File[];

//    upLoadFile(file) {
//     const formData = new FormData();

//     formData.append('file', file.data);
//     file.inProgress = true;

//     this.uplaodService.upload(formData).pipe(
//       map(event => {
//         switch (event.type) {
//           case HttpEventType.UploadProgress:
//             file.progress = Math.round(event.loaded * 100 / event.total);
//             break;
//           case HttpEventType.Response:
//             return event;
//         }

//       }),
//       catchError((error: HttpErrorResponse) => {

//         file.inProgress = false;
//         return of('${file.data.name} upload failed.');
//       })).subscribe((event: any) => {
//         if (typeof (event) === 'object') {
//           console.log(event.body);
//         }
//       }
//       );
//   }


 

//   onClick() {  
//     const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
//     for (let index = 0; index < fileUpload.files.length; index++)  
//     {  
//      const file = fileUpload.files[index];  
//      this.files.push({ data: file, inProgress: false, progress: 0});  
//     }  
//       this.uploadFiles();  
//     };  
//     fileUpload.click();  
// }


  

}
