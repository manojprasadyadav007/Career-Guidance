import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
    providedIn: 'root'
  })
  export class MandatoryfieldCheckService {
        constructor(){ }

       setinvalidFields(){
            Swal.fire({
              icon: 'error',
              title: 'Fill Mandatory fields',
              text: '',
            });
        }

}