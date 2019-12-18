import { provide, scope, ScopeEnum } from 'midway';
import { Connection, createConnection } from 'mongoose';
import { IConnections } from '../../interface';

@scope(ScopeEnum.Singleton)
@provide('connections')
export class Connections implements IConnections {
  pool: { [propName: string]: Connection };

  constructor() {
    this.pool = {};
  }

  async getConn(url: string): Promise<Connection> {
    if (this.pool[url]) {
      return this.pool[url];
    }
    const conn: Connection = await createConnection(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.pool[url] = conn;
    return conn;
  }
}
