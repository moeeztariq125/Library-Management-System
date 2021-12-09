import { randomInt } from 'crypto'
import { readFileSync } from 'fs'
import fs from 'fs'

const rawdata = readFileSync('./Books.json')
var student = JSON.parse(rawdata)
var i = 0
student.forEach((element) => {
  delete element._id
  element.quantity_available = randomInt(20)
  element.rating = randomInt(5)
  element.quantity_total = element.quantity_available
  element.borrowedBy = []
})
const output = JSON.stringify(student)
fs.writeFile('./out.json', output, 'utf8', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('file written')
  }
})

// var categories = []

// student.forEach((element) => {
//   categories = [...categories, ...element.categories]
// })

// const distinct = (value, index, self) => {
//   return self.indexOf(value) === index
// }
// const cat = categories.filter(distinct)
// var out = []
// cat.forEach((element) => {
//   out.push({ name: element })
// })
// console.log(out)

// fs.writeFile('./categories.json', JSON.stringify(out), 'utf8', (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('written')
//   }
// })
