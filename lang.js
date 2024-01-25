// for now just toggle En/Cy, can add other lang support later if wanted
const langs = ["En", "Cy"];

function toggleLang(currentLang){
  if(currentLang == lang[0]){return lang[1]};
  if(currentLang == lang[1]){return lang[0]};
}

// En Strings
titleEn = "ExoMars Rosalind Franklin Mission";

// Cy Strings
titleCy = "Cenhadaeth ExoMars Rosalind Franklin";

if(currentLang == lang[0]){
  document.getElementById('title').innerHTML = titleEn;
}
if(currentLang == lang[1]){
  document.getElementById('title').innerHTML = titleCy;
}
