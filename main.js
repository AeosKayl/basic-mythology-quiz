let thisBody = document.querySelector("body");
let headers = document.querySelector(".container");
let nightMode = document.querySelector("#on-off");
thisBody.style.background ="lightblue";
thisBody.style.color = "black";

  nightMode.addEventListener("click",changeMode)

  const answers = document.querySelectorAll("input");
  const checkboxes = document.querySelectorAll("[name='choice1']");
  const rightCheckboxes = document.querySelectorAll("[name='choice1'][value='right']");
  const wrongCheckboxes = document.querySelectorAll("[name='choice1'][value='wrong']");
  //console.log(checkboxes);

  //console.log(answers);
  //*testar om jag kan få ut värdena av svaren
  // answers.forEach(input =>{
  //   if(!input.checked){
  //     console.log(`${input.id} has the value of :${input.value}`);
  //   }
  // })

const results = document.querySelector("#results");  
const submitBtn = document.querySelector("#submit");
const resetBtn = document.querySelector("#reset");
const rightAnswers = document.querySelectorAll("[value='right']");
let wrongAnswers = document.querySelectorAll("[value='wrong']");
let points = 0;
const maxPoints = 10;

submitBtn.addEventListener("click",()=>{
  console.log("this works");
  // if(input.type === "checkbox" && !input.checked){
  //   console.log("please choose an answer");
  // }
  // if(!answers.checked){
  //   console.log("you must choose an answer");
  //   results.innerText  = "choose an answer";
  // }
  // else if(!checkboxes.checked){
  //   console.log("choose at least one option");
  //   results.innerText  = "choose an answer";
  // }
  let userInput = [];
  let rightInputs = [];
  let wrongCheckInputs = [];
  let rightCheckinputs = [];
  let wrongInputs = [];
  

  // console.log(userInput);


  answers.forEach(input =>{
    // console.log(input);
    if(input.checked){
      userInput.push(input.id);
      if(input.value === "right"){
        rightInputs.push(input.id)
        if(input.type === "checkbox"){
          rightCheckinputs.push(input.id);
          if(rightCheckinputs.length === 2){
            points ++;
          }
        }
        else{
          points++;
        }
      }
      else{
        wrongInputs.push(input.id);
        if(input.type === "checkbox"){
          wrongCheckInputs.push(input.id);
        }
      }
    }
    
    
    
    //*denna if grönmarkerar alla input som är checkade och har värdet "right"
    // if(input.checked && (input.value === "right")){
    //   input.previousElementSibling.style.background = "lightgreen";
    //   console.log("you answered "+ input.value + " on "+input.parentElement.previousElementSibling.previousElementSibling.innerText);
    //   console.log(input.parentElement.previousElementSibling.previousElementSibling.innerText);
    // }
    // //*denna else-if rödmarkerar alla inputs med värdet "wrong"
    // else if (input.value=== "wrong"){
    //   input.previousElementSibling.style.background = "red";
    // }

    //TODO: behöver kolla första checkbox frågan och se till att svaret blir rätt bara om
  //TODO båda rätt svär är valda
  // if(input.name === "choice1" && !input.checked){
  //   console.log("please choose an answer");
  // }
  
  //*kollar om checkboxes med rätta svar är valda
  if(input.type === "checkbox" && input.checked && input.value === "right"){
    console.log(`You chose the ${input.value} answer for ${input.id}`);
  }//*annars om checkboxes med fel är valda
  else if (input.type === "checkbox" && input.checked){
    console.log(`You checked the box ${input.id} which is${input.value}`);
  }
  

  })
  console.log(userInput, rightInputs, wrongInputs);
  console.log(points +" points collected");
  let checkboxLimit = rightCheckinputs.length + wrongCheckInputs.length;
  console.log(checkboxLimit + " is the length of the checkboxes that are checked");
  console.log(rightCheckinputs + " right answers",wrongCheckInputs + " wrong answers");
  
  // if(rightInputs.length < rightAnswers.length){
  // }
  if(userInput.length < 1){
    alert("You can not submit an empty quiz");
    return false;
  }
  else if(checkboxLimit > 2){
    alert("You may only choose 2 options out of the given 4. No cheating allowed")
    points = 0;
    return false;
  }
  if(points === 10){
    results.style.color = "gold";
    results.style.background = "darkred";
    results.innerHTML = `<h2><legend>You are a Legend-Killer.<br/> Perfect score and that is ${points} out of 10</legend></h2>`
  }
  else if(points > 10 * 0.75){
    results.style.color = "green";
    results.innerHTML = `<h3><legend>Congratulations! Your score is ${points} out of 10 points!</legend></h3>`
  }
  else if(points >= 10*0.5 && points <= 10*0.75 ){
    results.style.color = "orange";
    results.innerHTML = `<h3><legend>Not bad, you got more than 50% right answers. Your score is ${points} out of 10 points.</legend></h3>`
  }
  else if(points > 10*0.25 && points < 10*0.5){
    // results.style.color = "black";
    results.innerHTML = `<h3><legend>Well that sucks, your score is ${points} out of 10 points.</legend></h3>`
  }
  else{
    results.style.color = "red";
    results.innerHTML = `<h3><legend>Perhaps you're not into mythology. Your glorious score is ${points} out of 10 points...</legend></h3>`
  }
  disableBtn();


  
})

//* när användaren trycker på reset, kommer resultaten att nollställas och man kan börja om
resetBtn.addEventListener('click', () => {
  //* denna kod resettar hela sidan, t.o.m. temat
  // location.reload();
   userInput = [];
   rightInputs = [];
   rightCheckinputs = [];
   wrongInputs = [];
   points = 0;
   results.innerHTML = "";
   results.style.color = "";
   results.style.background = "";
  answers.forEach(input =>{
    input.checked = false;
    input.disabled = false;
  })
  submitBtn.disabled = false;
})

//* funktion för att stoppa user input
function disableBtn(){
  answers.forEach(input =>{
    input.disabled = true;
  })
  submitBtn.disabled = true;
}
//* funktion för att ändra temat
function changeMode(){
  if(thisBody.style.background === "lightblue"){
    thisBody.style.background = "black";
    thisBody.style.color ="white";
    headers.style.color = "gold";
    nightMode.innerText = "Light Mode";
    nightMode.style.color = "gold";
    nightMode.style.background = "black";
  }
  else{
    thisBody.style.background = "lightblue";
    thisBody.style.color ="black";
    headers.style.color = "black";
    nightMode.innerText = "Dark Mode";
    nightMode.style.color = "black";
    nightMode.style.background = "lightgrey";
  }
}
