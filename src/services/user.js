const db = require('../scripts/database');

class UserService {
    async create(data) {
      const result = await db.query(
        `INSERT INTO users 
        (first_name, last_name, password, email, phone_number) 
        VALUES 
        ('${data.firstName}', '${data.lastName}', '${data.password}', '${data.email}', '${data.phoneNumber}')`
      );
    
      return result.info;
    }
    async login(data){
      const result = await db.query(
        `SELECT 
        * 
        FROM users WHERE email='${data.email}' AND password='${data.password}'`
      );

      return result;
    }
    async read(id) {
      const result = await db.query(
        `SELECT 
        id, first_name, last_name, password, email, phone_number 
        FROM users ${id && `WHERE id='${id}'`}`
      );

      return result;
    }
    async update(id, data) {
      const queries = [];

      Object.keys(data).map(item => {
        switch (item) {
          case 'firstName':
            queries.push(`first_name='${data.firstName}'`)
            break;
          case 'lastName':
            queries.push(`last_name='${data.lastName}'`)
            break;
          case 'password':
            queries.push(`password='${data.password}'`)
            break;
          case 'email':
            queries.push(`email='${data.email}'`)
            break;
          case 'phoneNumber':
            queries.push(`phone_number='${data.phoneNumber}'`)
            break;
          default:
            break;
        }
      })

      const result = await db.query(
        `UPDATE 
        users
        SET
        ${queries.join(',')}
        WHERE id='${id}'`
      );

      return result;
    }
    async delete(id) {
      const result = await db.query(
        `DELETE FROM users 
        WHERE id='${id}'`
      );
    
      return result.info;
    }
}

module.exports = new UserService();
