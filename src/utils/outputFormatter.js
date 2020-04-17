const lineWidth = 40

const formatLine = (left, right) =>
  left + ':'.padEnd(lineWidth - (left.length + right.length + 1)) + right + '\n'

/**
   * Formats the roll message and calculates total.
   * @param {string} charName - name of the character
   * @param {string} attribute - name of the attribute
   * @param {number} attrValue - attribute's value
   * @param {string} skill - name of the skill
   * @param {number} skillValue - skill's value
   * @param {number} diceRoll - value of the dice roll
   * @returns {string} formatted message
   */
const formatRollMessage = (charName, attribute, attrValue, skill, skillValue, diceRoll, modifier = '') => {
  const intModifier = Number.parseInt(modifier)

  const total = Number.isNaN(intModifier)
    ? attrValue + skillValue + diceRoll
    : attrValue + skillValue + diceRoll + intModifier

  return '```\n' +
    `${charName} rolls:\n` +
    formatLine(attribute, attrValue.toString()) +
    formatLine(skill, skillValue.toString()) +
    formatLine('d10', diceRoll.toString()) +
    (Number.isNaN(intModifier) ? '' : formatLine('Modifier', modifier)) +
    ''.padEnd(lineWidth, '-') + '\n' +
    formatLine('Total', total.toString()) +
    '```\n'
}

// TODO: comments here
const createShootFormatter = () => {
  return {
    message: '',
    initializeShootMessage: function (characterName, weaponName, weaponType) {
      this.message = '```' +
        `${characterName} shoots their ${weaponName} (${weaponType}):` + '```'
    },
    appendHitRoll: function (refValue, skillName, skillValue, weaponAccuracy, d10, hitTotal) {
      this.message +=
        'HIT ROLL:\n' +
        '```\n' +
        formatLine('REF', refValue.toString()) +
        formatLine(skillName, skillValue.toString()) +
        formatLine('Weapon Accuracy', weaponAccuracy.toString()) +
        formatLine('d10', d10.toString()) +
        '```' +
        `**HIT ROLL TOTAL: ${hitTotal}**\n`
    },
    appendDamageRoll: function (weaponName, weaponDamageStat, damageTotal, damageRolls, damnageConstPart) {
      this.message +=
        'DAMAGE ROLL:\n' +
        '```\n' +
        `${weaponName} damages is ${weaponDamageStat}:\n` +
        `${damageRolls.join(' + ')}${damnageConstPart ? ' + ' + damnageConstPart : ''}\n` +
        '```' +
        `**DAMAGE ROLL TOTAL: ${damageTotal}**\n`
    },
    appendHitAreaRoll: function (characterName, hitArea, hitAreaRoll) {
      this.message +=
        `${characterName} hits enemy's ${hitArea} (${hitAreaRoll})`
    },
    appendMissMessage: function (characterName) {
      this.message +=
        `${characterName} misses their shots`
    }
  }
}

export {
  formatRollMessage,
  createShootFormatter
}
