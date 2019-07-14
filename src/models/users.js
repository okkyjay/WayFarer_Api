import {Pool} from 'pg';

const pool = new Pool();
const table = 'users';

export default class User {

    static emailExist(req, res) {
        let checkSql = 'SELECT * FROM '+table+' WHERE email = \''+req.body.email+'\'';
        return pool.query(checkSql);
    }

    static createUser(req, res) {
        let sql = `INSERT INTO ${table} (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        let values = [req.body.first_name, req.body.last_name, req.body.email, req.body.password, new Date()];

        return pool.query(sql,values);
    }

    static userExist(req, res) {
        let sql = `SELECT * FROM ${table} WHERE email='${req.body.email}' AND password='${req.body.password}'` ;
        return pool.query(sql);
    }

    static updateLastLogin(id) {
        let sql = `UPDATE ${table} SET  last_login = $1 WHERE id=${id}`;
        let values = [new Date()];
        pool.query(sql, values);
        // .then(r => console.log(r))
        // .catch(e => console,log(e));
    }
}