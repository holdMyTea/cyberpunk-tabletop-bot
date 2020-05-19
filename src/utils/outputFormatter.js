// line width for table-like formatted messages
const lineWidth = 40

/**
 * Adds `left` to `right` with a semicolumn between, and pads it to the `lineWidth` length.]
 * @param {string} left
 * @param {string} right
 */
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

/**
 * Formats roll message to the `!dice` command
 * @param {number} total - total sum of the roll
 * @param {number[]} rolls - list of dice rolls results
 * @param {string[]} staticModifiers - array of static modifiers
 */
const formatDiceMessage = (total, rolls, staticModifiers) => {
  return '```\n' +
    `${rolls.join('+')}${staticModifiers.join('')}` +
    '```' +
    `**TOTAL: ${total}**`
}

/**
 * Creates a formatter for the Shoot message
 */
const createShootFormatter = () => {
  const shootFormatter = {
    message: '',
    /**
     * Sets the `message` to formatted string with char's name, weapon's name and type
     * @param {string} characterName
     * @param {string} weaponName
     * @param {string} weaponType - weapon type, i.e. `Light Autopistol`
     */
    initializeShootMessage: function (characterName, weaponName, weaponType) {
      this.message = '```' +
        `${characterName} shoots their ${weaponName} (${weaponType}):` + '```'
    },

    /**
     * Appends to the `message` hit roll additions and total
     * @param {number} refValue - character's REF stat
     * @param {string} skillName - full name of the skill
     * @param {number} skillValue - values of character's `skillName`
     * @param {number} weaponAccuracy - weapon's accuracy stat (WA)
     * @param {number} d10 - d10 roll for hit
     * @param {number} hitTotal - total hit roll value
     */
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

    /**
     * Appends to `message` damage rolls and total
     * @param {string} weaponName
     * @param {string} weaponDamageStat - weapon's damage, in format from rulebook, i.e. `1D6+3` or `4D6'
     * @param {number} damageTotal - total sum of all `damageRolls`
     * @param {number[]} damageRolls - array of dice rolls for weapon's damage
     * @param {string[]} damageStaticParts - the `+3` part of `damageStat`
     */
    appendDamageRoll: function (weaponName, weaponDamageStat, damageTotal, damageRolls, damageStaticParts) {
      const spacedStaticParts = damageStaticParts.map(
        s => s.charAt(0) + ' ' + s.slice(1)
      ).join(' ')
      this.message +=
        'DAMAGE ROLL:\n' +
        '```\n' +
        `${weaponName} damages is ${weaponDamageStat}:\n` +
        `${damageRolls.join(' + ')} ${spacedStaticParts}\n` +
        '```' +
        `**DAMAGE ROLL TOTAL: ${damageTotal}**\n`
    },

    /**
     * Appends to `message` hit area and roll
     * @param {string} characterName
     * @param {string} hitArea - name os the are hit was made (i.e. `head`, `rigth arm`)
     * @param {number} hitAreaRoll - d10 roll for hit area
     */
    appendHitAreaRoll: function (characterName, hitArea, hitAreaRoll) {
      this.message +=
        `${characterName} hits enemy's ${hitArea} (${hitAreaRoll})`
    },

    /**
     * Appends to `message` miss notification
     * @param {string} characterName
     */
    appendMissMessage: function (characterName) {
      this.message +=
        `${characterName} misses their shots`
    }
  }
  return shootFormatter
}

export {
  formatRollMessage,
  formatDiceMessage,
  createShootFormatter
}
