import { User } from './models/User';
import { UserForm } from './views/UserFrom';

const user = User.buildUser({ name: 'Test', age: 20 });
const root = document.getElementById('root');

if (root) {
  const userForm = new UserForm(root, user);

  userForm.render();
} else {
  throw new Error('No root element!');
}
