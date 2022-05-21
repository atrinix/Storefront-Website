function setValueOfCookie(cookie_name, cookie_value) {
    var suffix = ["domain=localhost", "path=/", "SameSite=Strict"].join("; ");
    var cookie_val = cookie_value + "; " + suffix;
    document.cookie = cookie_name + "=" + cookie_val;
}
function setCurrentAnimalCookie(animal_key){
    setValueOfCookie("currentanimal", animal_key)
}
function getCurrentAnimal(){
    //Returns current animal by finding subcookie associated with the current animal
    //substring manipulation yields the section of the string correlating to just the name of the animal
    var splitCookie=document.cookie.split(';');
    for (var i=0; i<splitCookie.length;i++){
        var c=splitCookie[i];
        if(c.substring(0,13)=="currentAnimal="){
            return c.substring(14,c.length);
        }
    }

}