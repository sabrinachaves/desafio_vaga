export interface IDatabase {
  connect(): Promise<void>;
}
