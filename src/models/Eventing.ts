type Callback = () => void;

export class Eventing {
  events: Record<string, Callback[]> = {};

  on(eventName: string, cb: Callback): void {
    (this.events[eventName] = this.events[eventName] || []).push(cb);
  }

  trigger(eventName: string): void {
    this.events[eventName]?.forEach((cb) => cb());
  }
}
