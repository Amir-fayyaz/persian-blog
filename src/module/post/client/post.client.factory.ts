import { Injectable } from '@nestjs/common';
import { IFindPostById } from '../interface/IFindPostById';
import { PostClientService } from './services/post.client.service';

@Injectable()
export class PostClientFactory {
  private readonly FindPost: IFindPostById;
  constructor(PostService: PostClientService) {
    this.FindPost = PostService;
  }

  public async FindPostById(postId: number) {
    return await this.FindPost.findPostById(postId);
  }
}
