import { PostEntity } from '../entities/post.entity';

export interface IFindPostById {
  findPostById(postId: number): Promise<PostEntity>;
}
