export interface IEditRepository {
    edit(id: number, data: { title?: string; content?: string }): Promise<boolean>;
  }