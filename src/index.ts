import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';

//
const root = document.getElementById('root');
const users = new Collection('http://localhost:3000/users', User.buildUser);

users.on('change', () => {
  if (!root) return;

  new UserList(root, users).render();
});
users.fetch();
