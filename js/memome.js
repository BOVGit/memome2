//v1.0.4 2021-02-15
//let urlHttpServiceQuote = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=text&key=1&lang=';
//let urlHttpServiceQuote = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote&key=1&lang=';
// let urlHttpServiceQuote = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote';
// let urlHttpServiceQuote = 'http://rzhunemogu.ru/Rand.aspx?CType=5'; //return xml

let langRU = 'RU', langEN = 'EN';
let curLang = langRU;

// ------------- On-Click ---------------

// buttonRefresh.onclick = () => refreshData();

elemTextDate1.onchange = () => setAllDataToStorage();
elemTextDate2.onchange = () => setAllDataToStorage();

elemCheckRow1Task1.onclick = () => setAllDataToStorage();
elemCheckRow1Task2.onclick = () => setAllDataToStorage();
elemCheckRow2Task1.onclick = () => setAllDataToStorage();
elemCheckRow2Task2.onclick = () => setAllDataToStorage();

langSelect.onchange = () => changeLang();

refreshData();

///////////////////////////////////////////////////////////

function setCurLang() {
  const elem = document.getElementById('langSelect');
  const sel = elem.selectedIndex;
  curLang = (sel === -1 || elem.options[sel].text === langRU) ? langRU : langEN;
}

function isLangRu() {
  return (curLang === langRU);
}

function changeLang() {
  let classBlock, headQuote, headButtonRefresh, headCheckTasks, headDate, headMorning, headEvening;
  setCurLang();
  localStorage.setItem('Lang', curLang);
  if (isLangRu()) {
    // classBlock = 'quote showBlock';
    headQuote = 'Помни о важных делах !';
    // headButtonRefresh = 'Обновить даты';
    headCheckTasks = 'Отмечай дела';
    headDate = 'Дата';
    headMorning = 'Утро';
    headEvening = 'Вечер';
  } else {
    // classBlock = 'quote hiddenBlock';
    headQuote = 'Remember important things !';
    // headButtonRefresh = 'Refresh dates';
    headCheckTasks = 'Check tasks';
    headDate = 'Date';
    headMorning = 'Morning';
    headEvening = 'Evening';
  }
  // document.querySelector('.quote').setAttribute('class', classBlock);
  document.querySelector('.quote').textContent = headQuote;
  // document.querySelector('.buttonRefresh').value = headButtonRefresh;
  // document.querySelector('.buttonRefresh').title = headButtonRefresh;
  document.querySelector('.CheckTasks').textContent = headCheckTasks;
  document.querySelector('.Date').textContent = headDate;
  document.querySelector('.Morning').textContent = headMorning;
  document.querySelector('.Evening').textContent = headEvening;

  fillQuote();
}

///////////////////////////////////////////////////////////

function refreshData() {
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

  fillQuote();
}

///////////////////////////////////////////////////////////

// //lang: 'ru', 'en', ...
// async function fillQuote(lang) {
//   let quote = 'Remember important things !';
//   // const url = urlHttpServiceQuote + lang;
//   const url = urlHttpServiceQuote;

//   const response = await fetch(url);
//   if (response.ok) { // HTTP-state in 200-299
//     const textObj = await response.text(); // read answer in text
//     quote = textObj;
//   } else {
//     console.log(url + ', response-error: ' + response.status);
//   };
//   document.querySelector('.quote').textContent = quote;
// }
// function parseQuote(response) {
//   document.querySelector('.quote').textContent = response.quoteText + ' (' + response.quoteAuthor + ')';
// }

function fillQuote() {
  if (!isLangRu()) {
    return;
  }

  const quotes = [
    { 'quote': 'Без знатных дел знатное состояние ничто.', 'source': 'Фонвизин Д.И.' },
    { 'quote': 'Важно не звание человека, а его дело.', 'source': 'Плиний Младший' },
    { 'quote': 'Велико ли, мало ли дело, его надо делать.', 'source': 'Эзоп' },
    { 'quote': 'В серьезных делах люди выказывают себя такими, какими им подобает выглядеть; в мелочах — такими, какие они есть.', 'source': 'Шамфор' },
    { 'quote': 'В старости нет лучшего утешения, чем сознание того, что все силы в молодости отданы делу, которое не стареет.', 'source': 'Шопенгауэр А.' },
    { 'quote': 'Где дело само за себя говорит, к чему слова.', 'source': 'Цицерон' },
    { 'quote': 'Дела важнее слов.', 'source': 'Саллюстий' },
    { 'quote': 'Дело без старания — только рук марание', 'source': 'Икс' },
    { 'quote': 'Дело мастера боится.', 'source': 'Суворов А.В.' },
    { 'quote': 'Дело само говорит за себя.', 'source': 'Лукреций' },
    { 'quote': 'Дело, не сделанное вовремя, становится проблемой.', 'source': 'Икс' },
    { 'quote': 'Для великих дел необходимо неутомимое постоянство.', 'source': 'Вольтер' },
    { 'quote': 'Занимаясь делом, говорят только тогда, когда есть что сказать; но в безделье является потребность говорить беспрерывно.', 'source': 'Руссо Ж.' },
    { 'quote': 'Из тысячи тех, кто говорит красиво, я выберу того, кто молча делает дела.', 'source': 'Икс' },
    { 'quote': 'Искусный расчет — залог успеха в деяниях; размышление — лучший помощник.Высшее совершенство в делах достигается при полной уверенности.', 'source': 'Грасиан - и - Моралес' },
    { 'quote': 'Исход крупных дел часто зависит от мелочей.', 'source': 'Ливий' },
    { 'quote': 'Кто пустым делам придает важность, тот в важных делах окажется пустым человеком.', 'source': 'Катон' },
    { 'quote': 'Кто, предпринимая дело, спешит наскоро достичь результата, тот ничего не сделает.Кто осторожно оканчивает свое дело, как начал, тот не потерпит неудачи.', 'source': 'Лаоцзы' },
    { 'quote': 'Лень делает всякое дело трудным.', 'source': 'Франклин Б.' },
    { 'quote': 'Лучше в совершенстве выполнить небольшую часть дела, чем сделать плохо в десять раз более.', 'source': 'Аристотель' },
    { 'quote': 'Меньше скажешь слов, скорее справишь дело.', 'source': 'Скотт В.' },
    { 'quote': 'Мудрому все дела следует решать словами, а не оружием.', 'source': 'Теренций' },
    { 'quote': 'Несдержанность в мелочах погубит великое дело.', 'source': 'Конфуций' },
    { 'quote': 'Не суди по виду, суди по делам.', 'source': 'Григорий Богослов' },
    { 'quote': 'Никогда не бывает больших дел без больших трудностей.', 'source': 'Вольтер' },
    { 'quote': 'От речей дело вперед не двигается.', 'source': 'Надо действовать, а не говорить, дела решают спор лучше, чем слова.', 'source': 'Мольер' },
    { 'quote': 'От слова к делу!', 'source': 'Икс' },
    { 'quote': 'О деле суди по исходу.', 'source': 'Овидий' },
    { 'quote': 'Порядочность обнаруживается в речах, но куда вернее — в делах.', 'source': 'Бальтасар' },
    { 'quote': 'Пусть дела твои будут такими, какими ты хотел бы их вспомнить на склоне жизни.', 'source': 'Марк Аврелий' },
    { 'quote': 'Слово всегда отважнее дела.', 'source': 'Шиллер Ф.' },
    { 'quote': 'Смерть тех, кто творит бессмертные дела, всегда преждевременна.', 'source': 'Плиний Младший' },
    { 'quote': 'Старость отвлекает от занятия делами.', 'source': 'Цицерон' },
    { 'quote': 'Судят не по словам, а по делам', 'source': 'Икс' },
    { 'quote': 'Ученье — свет, а неученье — тьма.', 'source': 'Дело мастера боится, и коль крестьянин не умеет сохою владеть — хлеб не родится.', 'source': 'Суворов А.В.' },
    { 'quote': 'Учиться и, когда придет время, прикладывать усвоенное к делу — разве это не прекрасно!', 'source': ' Конфуций' },
    { 'quote': 'Хорошее начало — половина дела.', 'source': 'Платон' },
    { 'quote': 'Человека нужно оценивать не только по его делам, но и по его стремлениям.', 'source': 'Демокрит' },
    { 'quote': 'Человек гибнет, дело остается.', 'source': 'Лукреций' }
  ];
  let random = quotes[Math.floor(Math.random() * quotes.length)];
  document.querySelector('.quote').textContent = `“${random.quote}” - ${random.source}`;
}

///////////////////////////////////////////////////////////

// function getLangFromStorageAndApplyThisLang() {
//   let v = localStorage.getItem('Lang');
//   curLang = (v === "" || v === langRU) ? langRU : langEN;
// }

function getDataFromStorageAndFillForm() {

  //switch to saved lang
  let v = localStorage.getItem('Lang');
  curLang = (v === "" || v === langRU) ? langRU : langEN;
  document.getElementById('langSelect').value = curLang;
  // let ar = document.getElementById('langSelect').options;
  // for (let i = 0; i < ar.length; i++) {
  //   if (ar[i].text === curLang) ar[i].selected = true;
  // }

  changeLang();

  setDate('Date1');
  setDate('Date2');

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
    let date = (dateName === 'Date1') ? getYesterday(curDate) : curDate;
    v = getDateYYYYMMDD(date);
  }
  document.getElementById('elemText' + dateName).value = v;
}

//rowTaskName: 'Row1Task1', 'Row1Task2', ...
function setCheckRowTask(rowTaskName) {
  let v = localStorage.getItem(rowTaskName + 'Checked');
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