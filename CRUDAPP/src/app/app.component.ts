import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:  `
  <!-- header -->
  <app-header></app-header>
  <!--body-->
  <app-body></app-body>
  <!--footer-->
  <!--app-footer></app-footer-->
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUDmongoDB';
}
