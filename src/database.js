import mssql from 'mssql'

const config = {
  server: 'proyecto-as1-v1.checawq2oo9w.us-east-2.rds.amazonaws.com',
  database: 'proyecto_compiladores',
  user: 'Administrador',
  password: '!$1st3m4$',
  Options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

export const getConection = async () => {
  try {
    const pool = await mssql.connect(config);

    const result = await pool.request().query("SELECT GETDATE()")
    console.log(result)

    return pool;
  } catch (error) {
    console.error('Error: ', error);
  }
}