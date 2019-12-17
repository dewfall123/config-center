import { provide, config, EggAppConfig, scope, ScopeEnum } from 'midway';
import { Connection, createConnection } from 'mongoose';

@scope(ScopeEnum.Singleton)
@provide()
export class Connections {

    private pool: { [propName: string]: Connection };

    @config()
    config: EggAppConfig;

    async getConn(url: string): Promise<Connection> {
        if (this.pool[url]) {
            return this.pool[url];
        }
        const conn: Connection = await createConnection(url);
        this.pool[url] = conn;
        return conn;
    }
}
