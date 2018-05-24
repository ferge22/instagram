import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { DashPostComponent } from './dash-post/dash-post.component';

import { AuthService } from '../core/auth.service';
import { PostService } from '../_services/post.service';



import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: any;



  constructor(private afs : AngularFirestore, private _pS: PostService, public auth: AuthService, public dialog: MatDialog) {

  }


  ngOnInit() {
    this.posts = this._pS.getAllActivePosts();
  }

  openDialog(data): void {
  let dialogRef = this.dialog.open(DashPostComponent, {
    data: data,
    panelClass : 'postdialog',
    width: '1000px'


    //data is html o htmele is post service per funkcijos argumenta eina info
  });

}




  // getPosts(){
  //   this._pS.getPosts().subscribe(
  //     data => {
  //       this.posts = data;
  //     }
  //   )
  // }
}
