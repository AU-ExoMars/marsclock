function startTime() {
  const today = new Date();
  const ut = new Date(0);
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  // calls
  jdut = julianDate(today.getTime());
  jdtt = julianTT(jdut);
  dtj2000 = dtJ2000(jdtt);
  M = marsMeanAnomaly(dtj2000)
  aFMS = alphaFMS(dtj2000)
  // prints
  document.getElementById('currentTime').innerHTML =  h + ":" + m + ":" + s;
  document.getElementById('JDut').innerHTML = jdut
  document.getElementById('JDtt').innerHTML = jdtt
  document.getElementById('dt').innerHTML = dtj2000
  document.getElementById('M').innerHTML = M
  document.getElementById('afms').innerHTML = aFMS
  
  // make time tick
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function julianDate(i){
 return 2440587.5 + (i / 86400000)
}

function julianTT(jdut){
 return jdut + (69.184 / 86400)
}

function dtJ2000(jdtt){
 return jdtt - 2451545.0 
}

function marsMeanAnomaly(dt) {
 return (19.3871 + 0.52402073 * dt) % 360
}

function alphaFMS(dt){
 return (270.3871 + 0.524038496 * dt) % 360
}
