import { provide, scope, ScopeEnum } from 'midway';
import { Connection, createConnection } from 'mongoose';

@scope(ScopeEnum.Singleton)
@provide('connections')
export class Connections {
  pool: { [propName: string]: Connection } = {};

  async getConnWithoutCache(url: string): Promise<Connection> {
    const conn: Connection = await createConnection(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return conn;
  }

  async getConn(url: string): Promise<Connection> {
    if (this.pool[url]) {
      return this.pool[url];
    }
    const conn = await this.getConnWithoutCache(url);
    this.pool[url] = conn;
    return conn;
  }
}
