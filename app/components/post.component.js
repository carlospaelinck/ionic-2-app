import {Component, View, Input} from 'angular2/core'
import Post from 'models/post.model'

@Component({
  selector: 'post-item'
})

@View({
  template: `
    <ion-card>
      <ion-item class="item">
        <ion-avatar item-left>
          <img src="{{post.userAvatarUrl(72)}}">
        </ion-avatar>
        <div class="item-inner">
          <ion-item-content cnt>
            <h2>{{post.userName}}</h2>
            <h3>{{post.formattedDate()}}</h3>
          </ion-item-content>
        </div>
      </ion-item>
      <ion-card-content>
        {{post.content}}
      </ion-card-content>
    </ion-card>
  `
})

export class PostComponent {
  @Input() post: Post

  constructor() {
  }
}
