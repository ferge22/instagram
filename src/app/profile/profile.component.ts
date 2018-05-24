import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  editable = false;
  id:string;

  constructor(private _uS: UserService, private aR: ActivatedRoute, public auth: AuthService) { }

  ngOnInit() {
    this.id = this.aR.snapshot.params['id'];
    if(!this.id){
      this._uS.getProfileInfo().subscribe(
        user => this.user = user
      );
    }else{
      this._uS.getProfile(this.id).valueChanges().subscribe(
        user => this.user = user
      );
    }

  }

  toggleName(){
    this.editable = !this.editable;

  }

  saveName(){
    this._uS.updateProfile(this.user.uid , this.user.displayName);
    this.editable = false;
  }

  detectFile(event: Event){
    const selectedFile = (event.target as HTMLInputElement).files;
    const files = selectedFile;

    if(!files || files.length === 0){
      console.log('No Files Found');
      return;
    }

    this._uS.updateProfilePicture(files[0], this.user.uid)
  }


}
