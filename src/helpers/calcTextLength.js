// 計算字的byte(中文字是2byte, 英數字是1byte)
function renderText( str, length ) {
  let string = ""
  let count = 0

  for (let i = 0; i < str.length; i++) {
    if (count < length) {
      if (/[^\x00-\xff]/g.test(str[i])) { // 中文字是2byte
        if(count === length - 1) { // 不能超過length
          count = count + 2
          return string + '...'
        }else {
        count = count + 2
        string = string + str[i]
        }
      } else { // 英數字是1byte
        count++
        string = string + str[i]
      }
    } else {
      return string + '...'
    }
  }
  return string 
}

export default renderText