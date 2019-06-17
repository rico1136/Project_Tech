// const nameUser = document.getElementById('username')
// const ageUser = document.getElementById('age')
// const nameInput = document.querySelector('name')
// 
// 
// 
// console.log(nameUser)
// console.log(nameInput)
// console.log(ageUser)

       
  
function calculateType(event){
    // event.preventDefault();
  // console.log("test submit")
  var option1 = document.querySelector('input[name="q1"]:checked').value
  var option2 = document.querySelector('input[name="q2"]:checked').value
  var option3 = document.querySelector('input[name="q3"]:checked').value
  var option4 = document.querySelector('input[name="q4"]:checked').value
  var outcomeInput = document.querySelector('input[name="outcomeInput"]')
  var outcome = Number(option1) + Number(option2) + Number(option3) + Number(option4);
  console.log("werkt dit")
  console.log("test submit" + option1+ " "+ option2 + " "+ option3 + " "+ option4);
  console.log(outcome);
  var type = "";
  if(outcome < 20){
    type = "Childish";
  }
  else if(outcome > 19 && outcome < 30){
  type = "Akward"
  }
  else {
  type = "Dark Humor"
  }
  console.log(type)
  outcomeInput.value= type
  };
  
    var memetestForm = document.querySelector(".memetest")
    memetestForm.addEventListener("submit", calculateType);
    
    