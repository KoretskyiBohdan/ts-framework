import { User, UserProps } from '../models/User';
import { CollectionView } from './CollectionView';
import { UserEdit } from './UserEdit';

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: HTMLElement): void {
    new UserEdit(itemParent, model).render();
  }
}
