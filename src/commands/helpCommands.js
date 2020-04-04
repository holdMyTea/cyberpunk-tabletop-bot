import db from '../db'

const printSkillList = (message, args) => {
  const [attribute] = args

  db.query(`
    SELECT
      s.name AS 'skillName',
      s.short_name AS 'skillShortName',
      a.name AS 'attributeName'
    FROM skills s
      LEFT JOIN attributes a ON a.id = s.attribute_id
      ${attribute ? 'WHERE a.name=\'' + attribute + '\'' : ''};
  `)
    .then(data => {
      if (data.length === 0) {
        message.reply('Stap!!1 :cry:')
        return
      }

      let reply = '\n'
      data.forEach(row => {
        reply += `${row.skillName} | ${row.skillShortName} | ${row.attributeName}\n`
      })
      message.reply(reply)
    })
}

const findSkill = (message, args) => {
  const [query] = args

  if (!query) {
    message.reply('Stap!!1 :cry:')
    return
  }

  db.query(`
    SELECT name, short_name FROM skills WHERE name LIKE '%${query.toLowerCase()}%'
  `)
    .then(data => {
      if (data.length === 0) {
        message.reply('Nothing found :cry:')
        return
      }

      let reply = '\n'
      data.forEach(row => {
        reply += `${row.name} | ${row.short_name}\n`
      })
      message.reply(reply)
    })
}

export {
  printSkillList,
  findSkill
}
