import axios from 'axios';

interface HasId {
  id?: number;
}

export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}

  async fetch(id: number) {
    const { data } = await axios.get<T>(`${this.rootUrl}/${id}`);

    return data;
  }

  async save(data: T) {
    const { id } = data;
    if (id) {
      return axios.put<T>(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post<T>(this.rootUrl, data);
    }
  }
}
