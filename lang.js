// for now just toggle En/Cy, can add other lang support later if wanted
const langs = ["En", "Cy"];

function toggleLang(currentLang){
  if(currentLang == langs[0]){return langs[1]};
  if(currentLang == langs[1]){return langs[0]};
}

// En Strings
titleEn = "ExoMars Rosalind Franklin Mission";

// Cy Strings
titleCy = "Cenhadaeth ExoMars Rosalind Franklin";

function setStrings(currentLang){
  if(currentLang == lang[0]){
    document.getElementById('title').innerHTML = titleEn;
  }
  if(currentLang == lang[1]){
    document.getElementById('title').innerHTML = titleCy;
  }
}
