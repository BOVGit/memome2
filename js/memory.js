//v1.0.2 2021-02-10

// ------------- On-Click ---------------

buttonRefresh.onclick = () => refreshDates();

elemTextDate1.onchange = () => setAllDataToStorage();
elemTextDate2.onchange = () => setAllDataToStorage();

elemCheckRow1Task1.onclick = () => setAllDataToStorage();
elemCheckRow1Task2.onclick = () => setAllDataToStorage();
elemCheckRow2Task1.onclick = () => setAllDataToStorage();
elemCheckRow2Task2.onclick = () => setAllDataToStorage();

refreshDates();

///////////////////////////////////////////////////////////
function refreshDates() {
  getDataFromStorageAndFillForm();

  let yestDateStr = getDateYYYYMMDD(getYesterday(new Date()));
  let curDateStr = getDateYYYYMMDD(new Date());
  let dateTwoStr = document.getElementById('elemTextDate2').value;

  //current date is not equal date in row #2
  if (curDateStr !== dateTwoStr) {

    //yesterday is equal date in row #2
    document.getElementById('elemTextDate1').value = yestDateStr;
    if (yestDateStr === dateTwoStr) {
      //row #1: move from #2
      document.getElementById('elemCheckRow1Task1').checked = document.getElementById('elemCheckRow2Task1').checked;
      document.getElementById('elemCheckRow1Task2').checked = document.getElementById('elemCheckRow2Task2').checked;
    } else {
      //row #1: set yesterday and today, then clear checkboxes
      document.getElementById('elemCheckRow1Task1').checked = false;
      document.getElementById('elemCheckRow1Task2').checked = false;
    }

    //row #2: set today with empty checkboxes
    document.getElementById('elemTextDate2').value = curDateStr;
    document.getElementById('elemCheckRow2Task1').checked = false;
    document.getElementById('elemCheckRow2Task2').checked = false;
  }
}

function getDataFromStorageAndFillForm() {
  setDate("Date1");
  setDate("Date2");

  setCheckRowTask('Row1Task1');
  setCheckRowTask('Row1Task2');
  setCheckRowTask('Row2Task1');
  setCheckRowTask('Row2Task2');
}

//dateName: 'Date1', 'Date2'
function setDate(dateName) {
  let v = localStorage.getItem(dateName);
  if (v === '' || v === null) {
    let curDate = new Date();
    let date = (dateName === "Date1") ? getYesterday(curDate) : curDate;
    v = getDateYYYYMMDD(date);
  }
  document.getElementById('elemText' + dateName).value = v;
}

//rowTaskName: 'Row1Task1', 'Row1Task2', ...
function setCheckRowTask(rowTaskName) {
  v = localStorage.getItem(rowTaskName + 'Checked');
  document.getElementById('elemCheck' + rowTaskName).checked = (v === '1' ? true : false);
}

function setAllDataToStorage() {
  saveDateToStorage('Date1');
  saveDateToStorage('Date2');

  saveCheckToStorage('Row1Task1');
  saveCheckToStorage('Row1Task2');
  saveCheckToStorage('Row2Task1');
  saveCheckToStorage('Row2Task2');
}

//dateName: 'Date1', 'Date2'
function saveDateToStorage(dateName) {
  let v = document.getElementById('elemText' + dateName).value;
  localStorage.setItem(dateName, v);
}

//rowTaskName: 'Row1Task1', 'Row1Task2', ...
function saveCheckToStorage(rowTaskName) {
  let v = document.getElementById('elemCheck' + rowTaskName).checked;
  localStorage.setItem(rowTaskName + 'Checked', v ? '1' : '0');
}

///////////////////////////////////////////////////////////

//get date & time in: YYYY-MM-DD HH:MM:SS
function getDateTime(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1; //'+1', because return: from 0 to 11
  let dayOfMonth = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  //formatting
  //year = year.toString().slice(-2); //year in 2 digit
  year = year.toString();
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${year}-${month}-${dayOfMonth} ${hour}:${minutes}:${seconds}`
}

//get date in: YYYY-MM-DD
function getDateYYYYMMDD(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1; //'+1', because return: from 0 to 11
  let dayOfMonth = date.getDate();

  //formatting
  //year = year.toString().slice(-2); //year in 2 digit
  year = year.toString();
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;

  return `${year}-${month}-${dayOfMonth}`
}

function getYesterday(date) {
  let d = date;
  d.setDate(d.getDate() - 1);
  return d;
}