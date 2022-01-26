gsap.registerPlugin(ScrollTrigger);

const arrow = document.querySelector(".arrow");

//ARROW ANIMATION
// STARTS THE ARROW ANIMATION
let tween = '';
const arrowAnimation = () => {
  arrow.classList.add("arrow");
  tween = gsap.to(".arrow", {y: 50, duration: 1.5, opacity: 1, repeat: -1});
  tween.play();
}

arrowAnimation();

// STOPS THE ARROW ANIMATION WHEN SCROLL IS DETECTED
const stopArrow = () => {
  arrow.classList.remove("arrow");
  arrow.classList.add("invisible");
  tween.kill();
}

document.addEventListener('scroll', stopArrow);


//GSAP SCROLLING ANIMATIONS
const scrollingAnimations = () => {
  const screenWidth = document.body.clientWidth;
  if(screenWidth < 1024){
    gsap.from(".how-started",{
      scrollTrigger: {
        trigger: ".how-started",
        start:"top center",
        toggleActions:"play none none none",
      },
      opacity: 0,
      x: -screenWidth,
      duration: 1,
    });
    
    gsap.from(".how-works",{
      scrollTrigger: {
        trigger: ".how-works",
        start:"top center",
        toggleActions:"play none none none",
      },
      opacity: 0,
      x: screenWidth,
      duration: 1,
    });
    
    gsap.from(".innovations",{
      scrollTrigger: {
        trigger: ".innovations",
        start:"top center",
        toggleActions:"play none none none",
      },
      opacity: 0,
      x: -screenWidth,
      duration: 1,
    });
    
    gsap.from(".impact",{
      scrollTrigger: {
        trigger: ".impact",
        start: "top center",
        toggleActions:"play none none none"
      },
      opacity: 0,
      x: screenWidth,
      duration: 1
    });
    
    gsap.from(".news",{
      scrollTrigger: {
        trigger: ".news",
        start: "top center",
        toggleActions:"play none none none"
      },
      opacity: 0,
      x: -screenWidth,
      duration: 1
    });
    
    ScrollTrigger.create({
      trigger: ".news",
      start: "top center",
      onEnter: buildNewsSlider
    });
    
    gsap.from(".prototypes",{
      scrollTrigger: {
        trigger:".prototypes",
        start:"top center",
        toggleActions:"play none none none"
      },
      opacity: 0,
      x: screenWidth,
      duration: 1
    });
    
    gsap.from(".work-with-us",{
      scrollTrigger: {
        trigger:".work-with-us",
        start:"top center",
        toggleActions:"play none none none"
      },
      opacity: 0,
      x: -screenWidth,
      duration: 1
    });
  }else{
    gsap.from(".scrolling-lines",{opacity: 0, duration: 4});
  }
}

// LOADS THE ANIMATIONS ON LOAD
window.addEventListener('load', scrollingAnimations);

//IMPACT SECTION --------------------------------------------------//
const carbonMonoxide = document.querySelector('.carbon-monoxide');
const fineParticles = document.querySelector('.fine-particles');
const ammonia = document.querySelector('.ammonia');
const lastUpdate = document.querySelector('.last-update');

const addNewData = async() =>{
    let results = await getNewData();
    const updatedTime = results[3];
    lastUpdate.innerHTML = updatedTime;
    incrementNumber();
}

const getNewData = async() =>{
    try{
        const response = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution?lat=42&lon=-71&appid=53ead80b03f18d24c2addcee35ad45ae');
        const carbonMonoxideEmission = response.data.list[0].components.co;
        const fineParticlesEmission = response.data.list[0].components.pm2_5;
        const ammoniaEmission = response.data.list[0].components.nh3;
        const timeOfUpdate = response.data.list[0].dt;
        const dateInMilliseconds = ((1000 * timeOfUpdate)-3600000);
        const dateObject = new Date(dateInMilliseconds);
        const localTimeHour = dateObject.toLocaleString("en-US", {hour: "numeric"});
        const localTimeDay = dateObject.toLocaleString("en-US", {weekday: "long"});
        const dateOfUpdate = `Last updated on ${localTimeDay} at ${localTimeHour}`;
        return [carbonMonoxideEmission, fineParticlesEmission, ammoniaEmission, dateOfUpdate];
    }catch(e){
        return [0,0,0];
    }
}

async function incrementNumber(){
  const dataPollution = await getNewData();
  const pollutionOutput = [carbonMonoxide, fineParticles, ammonia];
  let polOutIndex = 0;
  for (let i=0; i<pollutionOutput.length; i++){
    let element = pollutionOutput[polOutIndex];
    let finalNumber = dataPollution[polOutIndex];
    if (finalNumber < 1){
      incrementNumberRecursiveFloat(0, finalNumber, element);
    }else{
      incrementNumberRecursive(0, finalNumber, element);
    }
    polOutIndex++;
  }
}

const speed = 15;
const speedFloat = 60;

function incrementNumberRecursive (i, finalNumber, element) {
  if (i <= finalNumber) {
      element.innerHTML = i;
    setTimeout(function() {
      incrementNumberRecursive(i + 1, finalNumber, element);
    }, speed);
  }
}

function incrementNumberRecursiveFloat(i, finalNumber, element) {
  if ((Math.floor(i*100)) < (Math.floor(finalNumber*100))) {
      element.innerHTML = i.toFixed(3);
    setTimeout(function() {
      incrementNumberRecursiveFloat(i + 0.01, finalNumber, element);
    }, speedFloat);
  }
}

// EXECUTES THE IMPACT ANIMATION WHEN THE SCREEN SCROLLS TO TRIGGER IT
ScrollTrigger.create({
  trigger: ".impact",
  start: "top center",
  onEnter: addNewData
});