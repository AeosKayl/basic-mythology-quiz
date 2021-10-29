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
let points = 0; //* för att räkna användarens poäng
const maxPoints = 10; //* max nårbar poäng som inte används, kanske tar bort denna variabel

submitBtn.addEventListener("click",()=>{
  console.log("this works");

  let userInput = []; //* för att spara användarens val
  let rightInputs = []; //* svar med värdet "right" sparas
  let wrongCheckInputs = []; //* checkbox svar med värdet "wrong"
  let rightCheckinputs = []; //* checkbox svar med värdet "right"
  let wrongInputs = []; //* svar med värdet "wrong" sparas
  
  //* foreach för att räkna poäng & spara värden
  answers.forEach(input =>{
    if(input.checked){ //* om ett svarsfält är ibockat
      userInput.push(input.id); //* pushas id i arrayen userInput
      if(input.value === "right"){ //* och i fall dess värde är rätt
        rightInputs.push(input.id) //* pushas det i arrayen rightInputs
        if(input.type === "checkbox"){ //* dessutom om typen är en checkbox
          rightCheckinputs.push(input.id); //* pushas det i en array för rätta checkboxar
          if(rightCheckinputs.length === 2){ //* om 2 checkboxar med värdet "right" har bockats
            points ++; //* poäng ska adderas, annars inga poäng
          }
        }
        else{ //* annars om man bokar i radiobuttons med värdet "right"
          points++; //* poäng ska adderas
        }
      }
      else{ //* annars, dvs om värdet av input är fel
        wrongInputs.push(input.id);
        if(input.type === "checkbox"){ //* denna kodblock kanske är öveflödig
          wrongCheckInputs.push(input.id);
        }
      }
    }
    
    
    
    //*denna if grönmarkerar alla input som är checkade och har värdet "right"
    // if(input.checked && (input.value === "right" || input.value === "wrong")){
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
  
  //*kollar om checkboxes med rätta svar är valda -i testfas fortfarande
  if(input.type === "checkbox" && input.checked && input.value === "right"){
    console.log(`You chose the ${input.value} answer for ${input.id}`);
  }//*annars om checkboxes med fel är valda -i testfas fortfarande
  else if (input.type === "checkbox" && input.checked){
    console.log(`You checked the box ${input.id} which is ${input.value}`);
  }
  

  })
  console.log(userInput, rightInputs, wrongInputs);
  console.log(points +" points collected");
  let checkboxLimit = rightCheckinputs.length + wrongCheckInputs.length;
  console.log(checkboxLimit + " is the length of the checkboxes that are checked");
  console.log(rightCheckinputs + " right answers",wrongCheckInputs + " wrong answers");
  

  //* If-sats som bestämmer vad som ska hända om:
  if(userInput.length < 1){  //* 1- man lämnar svarsfälten tomma
    alert("You can not submit an empty quiz");
    return false;
  }
  else if(checkboxLimit > 2){ //* om man väljer fler än 2 checkboxar
    alert("You may only choose 2 options out of the given 4. No cheating allowed.")
    points = 0;
    return false;
  }

  //* If-sats som bestämmer vad som ska skrivas ut i resultatfältet
  if(points === 10){
    results.style.color = "gold";
    results.style.background = "darkred";
    results.innerHTML = `<h3>You are a Legend-Killer.<br/> Perfect score and that is ${points} out of 10</h3>`
  }
  else if(points > 10 * 0.75){
    results.style.color = "green";
    results.innerHTML = `<h3><legend>Congratulations! Your score is ${points} out of 10 points!</legend></h3>`
  }
  else if(points > 10*0.5 && points <= 10*0.75 ){
    results.style.color = "orange";
    results.innerHTML = `<h3>Not bad, you got more than 50% right answers.<br/> Your score is ${points} out of 10 points.</h3>`
  }
  else if(points === 10*0.5){
    results.style.color = "purple";
    results.innerHTML = `<h3>You got half of the answers right, Kudos.<br> Your score is ${points} out of 10 points.</h3>`
  }
  else if(points > 10*0.25 && points < 10*0.5){
    results.innerHTML = `<h3>Well that sucks, your score is ${points} out of 10 points.</h3>`
  }
  else{
    results.style.color = "red";
    results.innerHTML = `<h3>Perhaps you're not into mythology.<br/> Your glorious score is ${points} out of 10 points...</h3>`
  }
  disableBtn(); //* funktionen anropas för att man inte ska kunna ändra alternativ efter ett försök
 
})

//* när användaren trycker på reset, kommer resultaten att nollställas och man kan börja om
resetBtn.addEventListener('click', () => {
  //* denna kod resettar hela sidan, t.o.m. temat
  // location.reload();
  //* följande kodrader är för att nollställa variablerna nederst
  //* samt alla knappar/inputs.
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
  answers.forEach(input =>{ // går igenom alla input knappar och inaktiverar dem
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
    nightMode.style.background = "";
  }
}
