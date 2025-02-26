import { PostEntity } from '../entities/post.entity';

export interface IFindPostById {
  FindPostById(postId: number): Promise<PostEntity>;
}
