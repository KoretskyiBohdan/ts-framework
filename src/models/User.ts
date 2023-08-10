import { Callback, Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync(rootUrl);
  public attribues: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attribues = new Attributes(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attribues.get;
  }

  set(update: UserProps): void {
    this.attribues.set(update);
    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.get('id');

    if (typeof id != 'number') {
      throw new Error('Cannot fetch without an id');
    }
    const data = await this.sync.fetch(id);

    this.set(data);
  }
}
