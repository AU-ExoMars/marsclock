// for now just toggle En/Cy, can add other lang support later if wanted
const langs = ["En", "Cy"];

function toggleLang(currentLang){
  if(currentLang == lang[0]){return lang[1]};
  if(currentLang == lang[1]){return lang[0]};
}
