module.exports = class MysqlTable {
    constructor(client, tableName) {
        this.client = client;
        this.tableName = tableName;
    }

    fetchAll() {
        return new Promise((resolve, reject) => {
            this.getFields(["*"]).then(fields => {
                for(var field in fields) {
                    this["_" + field] = fields[field];
                }
                resolve();
            });
        });
    }

    getFields(fields) {
        return new Promise((resolve, reject) => {
            console.log("[QUERY]", fields.join());

            var query = "SELECT ";
            for(var field of fields) {
                query += "`" + field + "`, ";
            }
            query = query.substr(0, query.length - 2);
            query += " FROM " + this.tableName + " WHERE id=?";

            // console.log(query);

            this.client.query(query, [this._id], (err, resp) => {
                if(err) return reject(err);
                if(!resp[0]) return resolve(null);
                for(var field in resp[0]) {
                    this["_" + field] = resp[0][field];
                }
                resolve(resp[0]);
            });
        });
    }

    query(query, args) {
        return new Promise((resolve, reject) => {
            this.client.query(query, args, (err, resp) => {
                if(err) return reject(err);
                resolve(resp);
            });
        });
    }

    async getField(field) {
        if(this["_" + field]) return this["_" + field];

        var fields = await this.getFields([field]);
        if(!fields) return null;
        return fields[field];
    }
};

global.MysqlTable = module.exports;
