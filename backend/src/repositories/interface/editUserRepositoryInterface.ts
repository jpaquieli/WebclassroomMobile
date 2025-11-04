export interface IEditUserRepository {
  edit(id: number, data: { username?: string; password?: string }): Promise<boolean>;
}