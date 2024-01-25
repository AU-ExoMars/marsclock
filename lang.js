// for now just toggle En/Cy, can add other lang support later if wanted
const langs = ["En", "Cy"];

function toggleLang(currentLang){
  if(currentLang == langs[0]){return langs[1]};
  if(currentLang == langs[1]){return langs[0]};
}

var launchYmd, landingYmd, launchD, landingD;

// En Strings
var titleEn = "ExoMars Rosalind Franklin Mission";
var launchYmdEn = "Launch window opens in " + d_to_ymd(daysUntilLaunch);
var landingYmdEn = d_to_ymd(daysUntilLanding) + " until mission starts";
var launchDaysEn = "Launch window opens in " + daysUntilLaunch + " days";
var landingDaysEn = daysUntilLanding + " days until mission starts";

// Cy Strings
var titleCy = "Cenhadaeth ExoMars Rosalind Franklin";

// set-lang specific strings, default to En in case of an issue
function setStrings(currentLang = langs[0]){
  if(currentLang == langs[0]){
    document.getElementById('title').innerHTML = titleEn;
    launchYmd = launchYmdEn;
    landingYmd = landingYmdEn;
    launchD = launchDaysEn;
    landingD = landingDaysEn;
  }
  if(currentLang == langs[1]){
    document.getElementById('title').innerHTML = titleCy;
  }

  if(dayFormatYMD){
    document.getElementById('landing').innerHTML = landingYmd;
    document.getElementById('launch').innerHTML = launchYmd;
  } else {
    document.getElementById('landing').innerHTML = landingD;
    document.getElementById('launch').innerHTML = launchD;
  }
}

// non-lang specific
document.getElementById('earthUTC').innerHTML =  h + ":" + m + ":" + s;
document.getElementById('marsCT').innerHTML = h_to_hms(mstPM);
document.getElementById('ltstOP').innerHTML = h_to_hms(within_24(ltst));
