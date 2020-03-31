export default [
  'BOT_SECRET_TOKEN',
  'DB_HOST', 'MYSQL_DATABASE', 'MYSQL_USER', 'MYSQL_PASSWORD'
]
  .reduce((acc, val) => {
    if (process.env[val]) {
      acc[val] = process.env[val]
      return acc
    } else {
      throw new Error('Enviromental property ' + val + ' is missing')
    }
  }, {})
