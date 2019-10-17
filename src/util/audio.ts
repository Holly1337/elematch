export const select1 = new Audio('http://static.honybot.com/sounds/select-1.wav')
export const select2 = new Audio('http://static.honybot.com/sounds/select-2.wav')
export const select3 = new Audio('http://static.honybot.com/sounds/select-3.wav')
export const selectFail = new Audio('http://static.honybot.com/sounds/select-fail.wav')

export const audio = {
  select1,
  select2,
  select3,
  selectFail
}

export const playSelect1 = () => {
  try {
    select1.play()
  } catch (e) { }
}

export const playSelect2 = () => {
  try {
    select2.play()
  } catch (e) { }
}

export const playSelectSet = () => {
  try {
    select3.play()
  } catch (e) { }
}

export const playSelectFail = () => {
  try {
    selectFail.play()
  } catch (e) { }
}
