const BASE_MONEY_KEY = "baseMoney"
const DEFAULT_MONEY_KEY = "CNY"


function saveBaseMoneyKey (baseMoneyKey) {
  if(!baseMoneyKey) return
  wx.setStorageSync(BASE_MONEY_KEY, baseMoneyKey)
}

function getBaseMoneyKey () {
  return wx.getStorageSync(BASE_MONEY_KEY) || DEFAULT_MONEY_KEY
}

module.exports = {
  saveBaseMoneyKey,
  getBaseMoneyKey
}
