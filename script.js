// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var hour = dayjs().hour();
var saveBtn = $('.saveBtn');


var storage = JSON.parse(localStorage.getItem("savedData"))
if(!storage){
  storage = []
} else {
  for (var i=0; i < storage.length; i++) {
    var time = storage[i].hour
    var text = storage[i].text
    $('#'+time).children(".description").val(text)
  }
}
for (var i = 0; i < saveBtn.length; i++) {
$(saveBtn[i]).on('click', function() {
  var textField = $(this).parent().children(".description");
  var textInput = textField.val();
  storage = storage.map(element => {
    if (element.hour ===  $(this).parent().attr('id')) {
      element.text = textInput
    }
    return element;
  })
  var newBlock =  {
    hour: $(this).parent().attr('id'),
    text: textInput
  }
  if (!storage.includes(newBlock)) {
    console.log('hello')
    storage.push(newBlock)
  }
   
  localStorage.setItem("savedData", JSON.stringify(storage));
  // textField.value = localStorage.getItem("savedData");
  // console.log(textInput);
});
}


  function updateClass() {
   $(".time-block").each(function() {
   var hourBlock = parseInt($(this).attr("id"));
   console.log(hourBlock)
   if(hour > hourBlock){
  $(this).removeClass("present future").addClass("past");
} else if (hour === hourBlock){
  $(this).removeClass("past future").addClass("present");
} else {
  $(this).removeClass("present past").addClass("future");
}
}); 
}    
updateClass();



function displayTime() {
  var today = dayjs();
  $('#currentDay').text(today.format("MMMM DD, YYYY"));
  console.log(today);
};
displayTime();
