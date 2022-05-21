/*
    Author:         Arielle Riray
    Here is the JS file for the filter functions in the shop.html
*/

var buttonForm = document.getElementById("FilterButtonForm");
var buttons = buttonForm.getElementsByClassName("shop-filter-button");
var filterlist = document.getElementsByClassName("animals");
var selected = document.getElementsByClassName("active");

filterSelection("all")

function addElement(element, name) 
{
  var i, list1, list2;
  list2 = name.split(" ");
  list1 = element.className.split(" ");

  for (i = 0; i < list2.length; i++) 
  {
    if (list1.indexOf(list2[i]) == -1) 
    {
        element.className += " " + list2[i];
    }
  }
}

function hideElement(element, name) 
{
  var i, list1, list2;
  list1 = element.className.split(" ");
  list2 = name.split(" ");

  for (i = 0; i < list2.length; i++) 
  {
    while (list1.indexOf(list2[i]) > -1) 
    {
      list1.splice(list1.indexOf(list2[i]), 1);     
    }
  }
  element.className = list1.join(" ");
}

function filterSelection(c) {
  var i;
  if (c == "all") c = "";

  for (i = 0; i < filterlist.length; i++) 
  {
    hideElement(filterlist[i], "show");
    if (filterlist[i].className.indexOf(c) > -1) 
    {
        addElement(filterlist[i], "show");
    }
  }
}

for (var i = 0; i < buttons.length; i++) 
{
  buttons[i].addEventListener("click", function()
  {
    selected[0].className = selected[0].className.replace(" active", "");
    this.className += " active";
  });
}