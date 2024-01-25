// for now just toggle En/Cy, can add other lang support later if wanted
const langs = ["En", "Cy"];

function toggleLang(currentLang){
  if(currentLang == langs[0]){return langs[1]};
  if(currentLang == langs[1]){return langs[0]};
}

// set-lang specific strings, default to En in case of an issue
function setStrings(currentLang = langs[0]){
  console.log(currentLang);
  // En Strings
  if(currentLang == langs[0]){
    titletext = "ExoMars Rosalind Franklin Mission";
    utctag = "UTC (Earth)";
    mtctag = "MTC (Mars)";
    launchYmd = "Launch window opens in " + d_to_ymd(daysUntilLaunch, langs[0]);
    landingYmd = d_to_ymd(daysUntilLanding, langs[0]) + " until mission starts";
    launchD = "Launch window opens in " + daysUntilLaunch + " days";
    landingD = daysUntilLanding + " days until mission starts";
  }
  // Cy Strings
  if(currentLang == langs[1]){
    titletext = "Cenhadaeth ExoMars Rosalind Franklin";
    utctag = "UTC (Y Ddaear)";
    mtctag = "MTC (Mawrth)";
    launchYmd = "Ffenestr lansio yn agor mewn " + d_to_ymd(daysUntilLaunch, langs[1]);
    landingYmd = d_to_ymd(daysUntilLanding, langs[1]) + " tan ddechrau'r cenhadaeth";
    launchD = "Ffenestr lansio yn agor mewn " + daysUntilLaunch + " dydd";
    landingD = daysUntilLanding + " dydd tan ddechrau'r cenhadaeth";
  }
}
