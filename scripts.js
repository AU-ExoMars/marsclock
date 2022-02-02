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
  pbs = perturbers(dtj2000)
  
  // prints
  document.getElementById('currentTime').innerHTML =  h + ":" + m + ":" + s;
  document.getElementById('test').innerHTML = pbs
  
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

function perturbers(dt) {
  return 0.0071 * cos((0.985626 * dt /  2.2353) +  49.409) +
    0.0057 * cos((0.985626 * dt /  2.7543) + 168.173) +
    0.0039 * cos((0.985626 * dt /  1.1177) + 191.837) +
    0.0037 * cos((0.985626 * dt / 15.7866) +  21.736) +
    0.0021 * cos((0.985626 * dt /  2.1354) +  15.704) +
    0.0020 * cos((0.985626 * dt /  2.4694) +  95.528) +
    0.0018 * cos((0.985626 * dt / 32.8493) +  49.095)
}

function cos(deg) {
  return Math.cos(deg * Math.PI / 180);
}

function sin(deg) {
  return Math.sin(deg * Math.PI / 180);
}
