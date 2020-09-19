const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'euroslje',
  host: 'lallah.db.elephantsql.com',
  database: 'euroslje',
  password: 'VBVzPpAWRMYy2KopArhHq0l665QVAifU',
  port: 5432,
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query(`SELECT * FROM pacientes`);
  res.send(rows);
});

router.post('/insertarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.send('INSERTADO');
});

router.delete('/borrarpacientes', async (req, res) => {

    const {numid} = req.body;
    await pool.query(
      `DELETE FROM  pacientes WHERE numid = '${numid}'`
    );
    res.send('BORRADO');
  
});

router.put('/modificarpacientes', async (req, res) => {
  const { nombre, apellido, numid, id } = req.body;
  await pool.query(
    `UPDATE  pacientes SET nombre = '${nombre}',apellido = '${apellido}',numid ='${numid}' WHERE id = '${id}'`
  );
  res.send('UPDATE');
});