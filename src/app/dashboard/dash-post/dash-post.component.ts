import { Component, OnInit, Inject } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommentService } from '../../_services/comment.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/auth.service';




@Component({
  selector: 'app-dash-post',
  templateUrl: './dash-post.component.html',
  styleUrls: ['./dash-post.component.scss']
})
export class DashPostComponent implements OnInit {

  user:any = {
    comment: ""
  }

  comments: any //i html
  globalvalue:number = 0 //likepost function naudoju
  likes: any; //i html

  user_uid: any;


  isliked: boolean = false;
  isnotliked: boolean = true;


  id: any;




  constructor(
    public dialogRef: MatDialogRef<DashPostComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any, private _cM: CommentService, private _aS: AuthService) {

    // public data is dash componento
     }


  ngOnInit() {
    this._aS.user.subscribe(
      user => {
        // console.log(user);
        this.user = user
        console.log(this.data)
        this._cM.alreadyLiked(user.uid, this.data.id).subscribe(
          likes => {
            this.isliked = likes;
          }
        )

        // console.log(user)
        // console.log(user.uid)
      })





    // this.data.user.subscribe(
    //   data => console.log(data)
    // )
    // console.log(this.user.comment);
    // this.user.comment = this._cM.getComments(this.data.id)
  this._cM.getComments(this.data.id).subscribe(
      data => {
          this.comments = data;
      }
    )


    this._cM.getLikes(this.data.id).subscribe(
      data => {
        this.likes = data.length
        // console.log(data.length);
      }
    )
    console.log(this.data);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendComment(){
    this._cM.createComment(this.user.uid, this.user.comment, this.data.id);
  }





  likePost(value){
    //tureciau gaut user uid kuris paspuaude ta posta ir neleist likint dauigau negu 1 karta
    value = 0 //is html
    value = this.globalvalue;

      if(!this.isliked){
      // this.isliked = true;
      let globalvalue = this.globalvalue +=1;

      this._cM.createLike(globalvalue, this.user.uid, this.data.id);

      }

    }

    dislikePost(){

      // if(this.isliked && this.likes >0){
      // this.likes -= 1;
      // this.isliked = false
      //
      // }
      //jeigu true leisk pridet 1;

      this._cM.deleteLike(this.id)

    }



  }
