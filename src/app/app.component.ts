import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf'
import { rotateIcon } from './animation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[rotateIcon()]
})

export class AppComponent implements OnInit{
  title = 'poc-print-pms';
  roomNoData
  startAnimationDiv1:boolean = true
  startAnimationDiv2:boolean = false
  startAnimationDiv3:boolean = false
  startAnimationDiv4:boolean = false
  Window
  constructor(public http:HttpClient){
   
  }

  ngOnInit() {  
  // this.scrollAnimateBot().then(res => console.log(res))
  // await this.scrollAnimateTop()    
    this.getdata()
    let elemnt1 = document.getElementById('1')
    let elemnt2 = document.getElementById('2')
    let elemnt3 = document.getElementById('3')
    let elemnt4 = document.getElementById('4')    

    let observer1 = new IntersectionObserver(() => {
      this.startAnimationDiv1 = true
    },{
      rootMargin:'20px',
      threshold: 0.1
    })

    let observe2 = new IntersectionObserver(() => {
      this.startAnimationDiv2 = !this.startAnimationDiv2
    },{
      rootMargin:'20px',
      threshold: 0.1
    })

    let observe3 = new IntersectionObserver(() => {
      this.startAnimationDiv3 = !this.startAnimationDiv3
    },{
      rootMargin:'20px',
      threshold: 0.1
    })

    let observer4 = new IntersectionObserver(() => {
      this.startAnimationDiv4 = !this.startAnimationDiv4
    },{
      rootMargin:'20px',
      threshold: 0.1
    })



    observer1.observe(elemnt1)
    observe2.observe(elemnt2)
    observe3.observe(elemnt3)
    observer4.observe(elemnt4)    
  }

  getdata(){
    const body = { apiRequest: { action: 'list' } };
        this.http.post('http://pmsdev.thamming.com/papi/configuration/room',body).subscribe( (x:any) => {
          console.log(x.data)
          this.roomNoData = x.data
          this.roomNoData.push(...x.data)
          // this.roomNoData.push(...x.data)
        })
  }

  download() {
    var doc = new jsPDF();
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');
    // Save the PDF
    doc.save('Test.pdf');
  }

  print(){
    var printContents = document.getElementById('test').innerHTML;    
    var w:Window = window.open();    
    w.document.write(
      `<html>
        <head>
        <style type="text/css">
        @media print {
          table { page-break-after: auto }
          tr    { page-break-before: always; page-break-inside:avoid; page-break-after:always }
          td    { page-break-before: always; page-break-inside:avoid; page-break-after:always }
          thead { display:table-header-group}
          tfoot { display:table-footer-group}
          #f {display: none}
        }

        * {
          font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif
        }
        body  {
          margin:0
        }
        .header {
          position: fixed;
          top: 0; 
          font-size: 30px;          
        }

        .footer {
          position: fixed;
          bottom: 0;        
          font-size: 30px;  
          
        }

        .header, .header-space,
        .footer, .footer-space {
         height: 50px;
        }

        @media screen {
          thead { display: none }
          tfoot { display: none }
        }
        </style>

        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
      );    
    w.print();
    w.close();    
  }

  scrollAnimateBot(){
    return new Promise(reslove => {
      setTimeout(() => {
        window.scrollTo({
          top:document.body.scrollHeight,
          behavior:'smooth'
        })
        window.scrollTo({
          top:0,
          behavior:'smooth'
        })  
        reslove('finish')
      },100)
    })
    
  }

  
}