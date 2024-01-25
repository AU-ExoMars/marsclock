function dateTimeCalcs(){
  // A1 Get a starting Earth time in milliseconds
  const today = new Date();
  const ut = new Date(0);
  
  // calls each function to process the time calcs
  jdut = julianDate(today.getTime());
  jdtt = julianTT(jdut);
  dtj2000 = dtJ2000(jdtt);
  mma = marsMeanAnomaly(dtj2000);
  aFMS = alphaFMS(dtj2000);
  pbs = perturbers(dtj2000);
  eqocentre = eoc(dtj2000,mma,pbs);
  Ls = aFMS + eqocentre; // areocentric solar longitude
  eotdeg = eotDeg(Ls,eqocentre);
  eothrs = eotHrs(eotdeg);
  mstPM = meanSolarTime(jdtt);
  lmst = localMeanSolarTime(mstPM,24);
  ltst = localTrueSolarTime(lmst,eotdeg);
  msd = marsSolarDate(dtj2000);
}

// visual fixing of numbers
function checkTime(i) {
  if (i < 10){i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

// Convert millis to Julian Date
// offset from the Unix epoch as a known JD
function julianDate(i){
 return 2440587.5 + (i / 86400000)
}

// UTC to Terrestrial Time TT
// TAI to UTC = 32.184s
// also need to add current leap seconds because js doesn't; https://www.timeanddate.com/time/leapseconds.html = 37s
// 37 + 32.184 = 69.184s
function julianTT(jdut){
 return jdut + (69.184 / 86400)
}

// time offset from the J2000 epoch
function dtJ2000(jdtt){
 return jdtt - 2451545.0 
}

function marsMeanAnomaly(dt) {
 return (19.3871 + 0.52402073 * dt) % 360
}

// angle of Fiction Mean Sun
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

// equation of center = the true anomaly minus mean anomaly
function eoc(dt,m,pbs) {
  //ν - M = (10.691° + 3.0° × 10-7 ΔtJ2000) sin M + 0.623° sin 2M + 0.050° sin 3M + 0.005° sin 4M + 0.0005° sin 5M + PBS
  return (10.691 + 3.0E-7 * dt) * sin(m) + 0.623 * sin(2 * m) + 0.050 * sin(3 * m) + 0.005 * sin(4 * m) + 0.0005 * sin(5 * m) + pbs
}

// C1 Equation of Time in degrees and hours
function eotDeg(ls,eoc){
  // 2.861° sin 2Ls - 0.071° sin 4Ls + 0.002° sin 6Ls - (ν - M)
  return 2.861 * sin(2*ls) - 0.071 * sin(4*ls) + 0.02 * sin(6*ls) - eoc
}

function eotHrs(eotDeg){
  // Multiply by (24 h / 360°) = (1 h / 15°) to obtain the result in hours.
  return eotDeg * (24/360)
}

// C2 Determine Mean Solar Time at Mars's prime meridian, i.e., Airy Mean Time
function meanSolarTime(jdtt){
  // MST = mod24 { 24 h × ( [(JDTT - 2451549.5) / 1.0274912517] + 44796.0 - 0.0009626 ) }
  return (24 * (((jdtt - 2451549.5) / 1.0274912517) + 44796.0 - 0.0009626)) % 24
}

function localMeanSolarTime(mst,long) {
  // LMST = mod24 { MST - Λ (24 h / 360°) } = mod24 { MST - Λ (1 h / 15°) }
  return (mst - long * (24/360)) % 24
}

function localTrueSolarTime(lmst,eot) {
  //LTST = LMST + EOT (24 h / 360°) = LMST + EOT (1 h / 15°)
  return (lmst + eot * (24/360)) % 24
}

function marsSolarDate(dt) {
  return (((dt - 4.5) / 1.027491252) + 44796.0 - 0.00096)
}

// cos and sin in radians
function cos(deg) {
  return Math.cos(deg * Math.PI / 180);
}
function sin(deg) {
  return Math.sin(deg * Math.PI / 180);
}

// prettify times into human-readable hh:mm:ss format
function h_to_hms(h) {
  var x = h * 3600;
  var hh = Math.floor(x / 3600);
  if (hh < 10) hh = "0" + hh;
  var y = x % 3600;
  var mm = Math.floor(y / 60);
  if (mm < 10) mm = "0" + mm;
  var ss = Math.round(y % 60);
  if (ss < 10) ss = "0" + ss;
  return hh + ":" + mm + ":" + ss;
}

// fix any wrapping of 24hr times
function within_24(n) {
    if (n < 0) {
        n += 24;
    } else if (n >= 24) {
        n -= 24;
    }
    return n;
}

// prettify day counting too
// solution from https://stackoverflow.com/questions/44502866/transform-number-of-days-in-years-months-days-in-javascript
function d_to_ymd(numberOfDays, lang = "En") {
  if(lang == "En"){
    yy = " year, ";
    yys = " years, ";
    MM = " month, ";
    MMs = " months, ";
    dd = " day";
    dds = " days";
  }
  if(lang == "Cy"){
    yy = " blwyddyn, ";
    yys = " blwyddyn, ";
    MM = " mis, ";
    MMs = " mis, ";
    dd = " dydd";
    dds = " dydd";
  }
  
  var years = Math.floor(numberOfDays / 365.242199);
  var months = Math.floor(numberOfDays % 365.242199 / 30.43692);
  var days = Math.floor(numberOfDays % 365.242199 % 30.43692);
  
  var yearsDisplay = years > 0 ? years + (years == 1 ? yy : yys) : "";
  var monthsDisplay = months > 0 ? months + (months == 1 ? MM : MMs) : "";
  var daysDisplay = days > 0 ? days + (days == 1 ? dd : dds) : "";
  return yearsDisplay + monthsDisplay + daysDisplay; 
}
