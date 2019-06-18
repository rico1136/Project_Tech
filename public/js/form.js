console.log('enhanced form')

// loop through the label and hide them all
// https://www.youtube.com/watch?v=wc5k2AMPED0

let labels = document.querySelectorAll('label');
for (let i = 0; i < labels.length; i++) {
  labels[i].style.display= 'none';
}
// https://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
// only when there is a javascript  run this css
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    "beforeend",
    "<link rel=\"stylesheet\" href=\"css/form.css\" />");


function animatedForm() {
  const nextArrow = document.querySelectorAll('.fa-angle-right'); 

  nextArrow.forEach(nextArr => {
    nextArr.addEventListener('click', () => {
      const input = nextArr.previousElementSibling;
      const parent = nextArr.parentElement;
      const nextForm = parent.nextElementSibling;

      console.log(input);

      // valid
      if (input.type === 'text' && validUser(input)) {
        console.log('its goood');
        nextSlide(parent, nextForm);
      } else if (input.type === 'number' && validAge(input)) {
        nextSlide(parent, nextForm);
      } else if (input.type === 'email' && validEmail(input)) {
        nextSlide(parent, nextForm);
      } else if (input.name === 'state' && validSex()) {
        nextSlide(parent, nextForm);
      } else if (input.type === 'password' && validUser(input)) {
        nextSlide(parent, nextForm);
      } else if (input.name === 'profilePic' && validFile(input)) {
        nextSlide(parent, nextForm);
      } else {
        parent.style.animation = 'shake 20ms ease';
      }
      parent.addEventListener('animationend', () => {
        parent.style.animation = '';
      })
    });
  });
}

// validation of every input

function validFile(file) {
  if (file.value) {
    return true;
  }
}

function validSex(sex) {
  let selector = document.getElementById('state');
  let value = selector[selector.selectedIndex].value;
  console.log(value);
  if (value === 'man' || value === 'woman') {
    return true;
  }
}

function validUser(user) {

  if (user.value.length < 3) {
    console.log(user.value);
    console.log('not long enough');
    error('rgb(189,87,87');
  } else {
    error('rgb(87,189,130)');
    return true;
  }
}

function validEmail(email) {
  const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (valid.test(email.value) == false) {
    console.log('not an email')
    error('rgb(189,87,87');
  } else {
    error('rgb(87,189,130)');
    return true;
  }
}

function validAge(age) {
  const minAge = 18;
  if (age.value < minAge) {
    console.log('not old enough');
    console.log(age.value);
    error('rgb(189,87,87');
  } else {
    console.log('You are old enough');
    error('rgb(87,189,130)');
    return true;
  }
}

function nextSlide(parent, nextForm) {
  parent.classList.add('inactive');
  parent.classList.remove('active');
  nextForm.classList.add('active');
}

function error(color) {
  document.body.style.backgroundColor = color;
}
animatedForm();