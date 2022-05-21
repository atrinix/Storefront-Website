

function renderSearchResults(){
    
    let testAnimal1= new Animal("Gila Monster","Mammal");
    let testAnimal2= new Animal("Komodo Dragon","Mammal");
    let testAnimal3= new Animal("King Cobra","Mammal");

    var results=new Array(testAnimal1,testAnimal2,testAnimal3);
    var parent=document.getElementById("searchShell");
    for (var i=0; i <results.length;i++){
        var searchItem=document.createElement("div");
        searchItem.className="search-result";
    
        searchItem.innerHTML= ' <a href="../JavaScripts/animalTemplate.html" onclick="setCurrentAnimalCookie('+results[i].name +')"></a><div class="image-container"><img class="search-result-image" src='+results[i].images[0]+'></div><div class="search-result-description-container"><h3 class="search-result-title">'+results[i].name+'</h3><p class="search-result-description">'+results[i].description+'</p></div></a>';

        parent.appendChild(searchItem);
    }
}
function onPageLoad() {
    renderSearchResults();
}
window.addEventListener("load", onPageLoad, true);  