const mostRecentScore = localStorage.getItem('mostRecentScore')
let fs = mostRecentScore/10
finalScore.innerText = fs + '/10'
points_added = Number(mostRecentScore)
localStorage.Point =  Number(localStorage.Point) + points_added
  document.getElementById("demo").innerHTML = localStorage.Point;