var rand = function (min, max) {
  k = Math.floor(Math.random() * (max - min) + min);
  return (Math.round( k / size) * size);
}
var newApple = function () {
  a = [rand(0, innerWidth),rand(0, innerHeight)];
  },
  newBody = function () {
  sBody = [{x: 0,y: 0}];
}

var scoreIncrement = function () {
    document.getElementById("score").innerHTML = ++score;
}

var scoreClear = function () {
  document.getElementById("score").innerHTML = score = 0;
}

var gameOver = function () {
  document.getElementById("gameOver").style.visibility="visible";
  document.getElementById("game-over__score").innerHTML = " " + score + " ";
}

var
  gP = document.getElementById('gP'), //Достаем canvas
  g = gP.getContext('2d'), //Получаем "контакс" (методы для рисования в canvas) //Сохраняем для удобства
  sBody = null, //Начально тело змейки - два элемента
  direction = 1, //Направление змейки 1 - вправо, 2 - вниз 3 - влево, 4 - вверх
  a = null, //Яблоко, массив, 0 элемент - x, 1 элемнт - y
  size = 30; newBody(); newApple(),
  score = 0; //Создаем змейку
gP.width = innerWidth; //Сохранем четкость изображения, выставив полную ширину экрана
gP.height = innerHeight; //То же самое, но только с высотой
setInterval(function(){
  if (a[0] + size >= gP.width || a[1] + size >= gP.height) newApple();
  g.clearRect(0,0,gP.width,gP.height); //Очищаем старое
  g.fillStyle = "red";
  g.fillRect(...a, size, size);
  g.fillStyle = "#000";
  sBody.forEach(function(el, i){
    if (el.x == sBody[sBody.length - 1].x && el.y == sBody[sBody.length - 1].y && i < sBody.length - 1) {gameOver(); return} //scoreClear(), sBody.splice(0,sBody.length-1), sBody = [{x:0,y:0}], direction = 1; //Проверка на столкновение
  });
  var m = sBody[0], f = {x: m.x,y: m.y}, l = sBody[sBody.length - 1]; // сохраняем хвост и голову змейки
  if (direction == 1)  f.x = l.x + size, f.y = Math.round(l.y / size) * size; //Если направление вправо, то тогда сохраняем Y, но меняем X на + size
  if (direction == 2) f.y = l.y + size, f.x = Math.round(l.x / size) * size; // Если направление вниз, то сохраняем X, но меняем Y на + size
  if (direction == 3) f.x = l.x - size, f.y = Math.round(l.y / size) * size; //Если направление влево, то сохраняем Y, но меняем X на -size
  if (direction == 4) f.y = l.y - size, f.x = Math.round(l.x / size) * size; //Если направление вверх, то сохраняем X, Но меняем Y на -ss
  sBody.push(f); //Добавляем хвост после головы с новыми координатами
  sBody.splice(0,1); //Удаляем хвост
  //Отрисовываем каждый элемент змейки
  sBody.forEach(function(pob, i){
    if (direction == 1) if (pob.x > Math.round(gP.width / size) * size) pob.x = 0; //Если мы двигаемся вправо, то если позиция эемента по X больше, чем ширина экрана, то ее надо обнулить
    if (direction == 2) if (pob.y > Math.round(gP.height / size) * size) pob.y = 0; //Если мы двигаемся внизу, то если позиция элемента по X больше, чем высота экрана, то ее надо обнулить
    if (direction == 3) if (pob.x < 0) pob.x = Math.round(gP.width / size) * size; //Если мы двигаемся влево, и позиция по X меньше нуля, то мы ставим элемент в самый конец экрана (его ширина)
    if (direction == 4) if (pob.y < 0) pob.y = Math.round(gP.height / size) * size; //Если мы двигаемся вверх, и позиция по Y меньше нуля, то мы ставим элемент в самый низ экрана (его высоту)
    if (pob.x == a[0] && pob.y == a[1]) scoreIncrement(), newApple(), sBody.unshift({x: f.x - size, y:l.y})
    g.fillRect(pob.x, pob.y, size, size);
    // size - это ширина и высота нашего "квадрата"
  });
}, 100);
onkeydown = function (e) {
  var k = e.keyCode;
  if ([38,39,40,37].indexOf(k) >= 0)
  //Останавливаем событие, отменяем его действие по умолчанию. На пример, при ажатии на стрелочку вверх мог произойти скролл, но он не произойдет, так как мы его отменили
    e.preventDefault();
  if (k == 39 && direction != 3) direction = 1; //Вправо
  if (k == 40 && direction != 4) direction = 2; //Вниз
  if (k == 37 && direction != 1) direction = 3; //Влево
  if (k == 38 && direction != 2) direction = 4; //Вверх
};