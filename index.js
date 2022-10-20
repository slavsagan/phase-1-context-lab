/* Your Code Here */
let testEmployee = ['Gray', 'Worm', 'Security', 1]

function createEmployeeRecord(arr) {
  let testEmployee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
  return testEmployee
}
console.log(createEmployeeRecord(testEmployee))

// =================================================

let twoRows = [
  ['moe', 'sizlak', 'barkeep', 2],
  ['bartholomew', 'simpson', 'scamp', 3],
]

function createEmployeeRecords(arr) {
  const employeeRecords = arr.map((x) => createEmployeeRecord(x))
  return employeeRecords
}
console.log(createEmployeeRecords(twoRows))

// =================================================

let bpRecord = createEmployeeRecord(['Byron', 'Poodle', 'Mascot', 3])

function createTimeInEvent(dateStamp) {
  let extractHour = dateStamp.slice(11)
  let hourNumber = parseInt(extractHour)
  let obj = {
    type: 'TimeIn',
    hour: hourNumber,
    date: dateStamp.slice(0, 10),
  }
  this.timeInEvents.push(obj)
  return bpRecord
}
console.log(createTimeInEvent.call(bpRecord, '2014-02-28 1400'))

// =================================================

function createTimeOutEvent(dateStamp) {
  let extractHour = dateStamp.slice(11)
  let hourNumber = parseInt(extractHour)
  let obj = {
    type: 'TimeOut',
    hour: hourNumber,
    date: dateStamp.slice(0, 10),
  }
  this.timeOutEvents.push(obj)
  return bpRecord
}
console.log(createTimeOutEvent.call(bpRecord, '2015-02-28 1700'))

// =================================================

let cRecord = createEmployeeRecord(['Julius', 'Caesar', 'General', 1000])

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find((t) => t.date === date)
  const timeOut = this.timeOutEvents.find((t) => t.date === date)

  return (timeOut.hour - timeIn.hour) / 100
}
console.log(hoursWorkedOnDate.call(cRecord, '2044-03-15'))
console.log(cRecord)

// =================================================

function wagesEarnedOnDate(dateStamp) {
  const houraWorked = hoursWorkedOnDate.call(this, dateStamp)

  return Math.round(houraWorked) * this.payPerHour
}

console.log(wagesEarnedOnDate.call(cRecord, '2044-03-15'))

// =================================================

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function allWagesFor() {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date
  })

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this),
    0,
  ) // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable
}

// =================================================
let src = [
  ['Loki', 'Laufeysson-Odinsson', 'HR Representative', 35],
  ['Natalia', 'Romanov', 'CEO', 150],
]
let emps = createEmployeeRecords(src)

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((e) => e.firstName === firstName)
}
console.log(findEmployeeByFirstName(emps, 'Loki'))

// =================================================
function calculatePayroll(srcArray) {
  const payable = srcArray.reduce(function (memo, cRecord) {
    return memo + allWagesFor.call(cRecord)
  }, 0)
  return payable
}
