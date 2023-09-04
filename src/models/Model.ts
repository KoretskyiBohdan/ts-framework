import { AxiosPromise } from 'axios';

interface ModelAttributes<T extends object> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise<T>;
  save(data: T): AxiosPromise<T>;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attribues: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attribues.get;

  set(update: T): void {
    this.attribues.set(update);
    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.get('id');

    if (typeof id != 'number') {
      throw new Error('Cannot fetch without an id');
    }
    const { data } = await this.sync.fetch(id);

    this.set(data);
  }

  async save(): Promise<void> {
    try {
      await this.sync.save(this.attribues.getAll());
      this.trigger('save');
    } catch (error) {
      this.trigger('error');
    }
  }
}
