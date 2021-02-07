//v1.0.1 2021-02-06

// ------------- On-Click ---------------
curDate = new Date();
document.querySelector('.inputText1').value = getDateYYYYMMDD(curDate);
document.querySelector('.inputText2').value = getDateYYYYMMDD(curDate);

// buttonLichessRefresh.onclick = () => refreshLichess(); //refresh Lichess Table by click button


// getDataFromStorage();


// refresh();

// setAutoRefresh();

// setTheme();


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
