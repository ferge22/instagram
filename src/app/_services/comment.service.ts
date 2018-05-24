import { Injectable } from '@angular/core';
import * as firebase from 'firebase' ;
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserService } from './user.service';
import { AuthService } from '../core/auth.service';



@Injectable()
export class CommentService {


  constructor(private afs: AngularFirestore, private _uS: UserService, private _aS: AuthService) {

  }


  createComment(uid, comment, postid){
    const information = {
      "user_uid" : uid,
      "comment" : comment,
      "post_uid" : postid,
      "created_at" : new Date().getTime()

    }
      return this.afs.collection('comments').add(information);
  }


  getComments(postid){
    return  this.afs.collection('comments', (ref) => ref
    .where('post_uid', '==', postid)
    .orderBy('created_at', 'desc'))
    .snapshotChanges().map(
      (comments) => {
        return comments.map(
          comment => {
            const data = comment.payload.doc.data();
            return{
              comment: data.comment
              // comment turi sutapt i kuri desiu html pvz com.comment
            }
          }
        )
      }
    )
  }



//likes-------------------------------------------------------------------------


  createLike(value, uid, postid){
    const info = {
      'likes' : value,
      'user_uid' : uid,
      'post_uid' : postid

    }

    return this.afs.collection('likesdislikes').add(info);
  }


  getLikes(postid){
    return this.afs.collection('likesdislikes', (ref) => ref
    .where('post_uid', '==', postid))
    .snapshotChanges().map(
      (posts) => {
        // console.log(posts);
        return posts.map(
          post => {
            const data = post.payload.doc.data();
            return {
              likes : data.likes
              // likes turi sutapt tu namie kur i html desiu pvz likes
            }
          }
        )
      }
    )
  }

  alreadyLiked(uid, id){
    return this.afs.collection('likesdislikes', (ref) => ref
    .where('post_uid', '==', id)
    .where('user_uid', '==', uid))
    .snapshotChanges().map(
      (likes) => {
        console.log(likes.length);
        if(likes.length >= 1){
          return true;
        }
        else{
          return false;
        }
      }
    )
  }


  getLikesandDislikesId(id){
    return this.afs.doc<any>(`likesdislikes/${id}`);
  }


  deleteLike(id){
    return this.afs.doc(`likesdislikes/${id}`).delete()
  }







  // getAllActivePosts(){
  //   return this.afs.collection('posts', (ref) => ref
  //   .where('status', '==', 'active')
  //   .orderBy('created_at', 'desc'))
  //   .snapshotChanges().map(
  //     (posts) => {
  //       return posts.map(
  //         post => {
  //           const data = post.payload.doc.data();
  //           const user = this._uS.getProfile(data.user_uid).valueChanges();
  //
  //           return {
  //             id: post.payload.doc.id,
  //             user_uid: data.user_uid,
  //             description:  data.description,
  //             user: user,
  //             photoURL: data.photoURL
  //           }
  //         }
  //       )
  //     }
  //   )
  // }


}
