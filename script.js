// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var hour = dayjs().hour();
var saveBtn = $(".saveBtn");

var storage = JSON.parse(localStorage.getItem("savedData"));

if (!storage) {
  storage = [];
} else {
  for (var i = 0; i < storage.length; i++) {
    var time = storage[i].hour;
    var text = storage[i].text;
    $("#" + time)
      .children(".description")
      .val(text);
  }
}

for (var i = 0; i < saveBtn.length; i++) {


  $(saveBtn[i]).on("click", function () {
    const description =  $(this).parent().children(".description").val();
    const hourOfEntry = $(this).parent().attr("id").toString()
    //console.log(hourOfEntry)

    console.log(description)

    // is this a new entry or an updated entry
    const isNewEntry = !storage.find( block => block.hour == hourOfEntry)
    console.log("Is new entry: ", isNewEntry);

    if( isNewEntry ){
      // push the new data into the storage array
      storage.push({
        hour: hourOfEntry.toString(),
        text: description
      })
    } else {
      storage = storage.map((element) => {
        if (element.hour == hourOfEntry ) {
          element.text = description;
        }
        return element;
      });
    }

    console.log(storage)

    localStorage.setItem("savedData", JSON.stringify(storage));
    // textField.value = localStorage.getItem("savedData");
    // console.log(textInput);
  });
}

function updateClass() {
  $(".time-block").each(function () {
    var hourBlock = parseInt($(this).attr("id"));
    console.log(hourBlock);
    if (hour > hourBlock) {
      $(this).removeClass("present future").addClass("past");
    } else if (hour === hourBlock) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("present past").addClass("future");
    }
  });
}
updateClass();

function displayTime() {
  var today = dayjs();
  $("#currentDay").text(today.format("MMMM DD, YYYY"));
  console.log(today);
}
displayTime();
