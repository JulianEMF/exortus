// SCROLLING CONTROL---------------------------------------------------------------
function scrollingControl(){
    //FINDS THE PERCENTAGE OF SCROLLING THROUGH THE PAGE
    const header = document.querySelector(".header");
    const lines = document.querySelectorAll(".scroll-line");
    const scrollText = document.querySelector(".scroll-line-text")
    const nextSectionButton = document.querySelector('.next-section-arrow');
    const firstSection = document.querySelector('.first-section');
    const secondSection = document.querySelector('.second-section');
    const thirdSection = document.querySelector('.impact');
    const fourthSection = document.querySelector('.fourth-section');
    const fifthSection = document.querySelector('.subscribe-container');
    const progress = Math.ceil(((window.scrollY)/(document.body.scrollHeight - window.innerHeight)*100));
    let currentSection = '';

    switch(true){
    case (progress<22):
        scrollText.textContent = 'Home';
        // CHANGES THE BACKGROUND COLOR OF THE HEADER WHILE AT THE FIRST SECTION
        gsap.to(header,{background: 'none', duration: 1.5});
        currentSection = 'Home';
        nextSectionButton.onclick = ()=>{secondSection.scrollIntoView()};
        break;
    case (progress>12 && progress<50):
        scrollText.textContent = 'Technology';
        // APPLIES BACKGROUND COLOR TO THE HEADER WHEN LEAVING THE FIRST SECTION
        gsap.to(header,{backgroundColor: "rgba(0,0,0,0.9)", duration: 0.7});
        currentSection = 'Technology';
        nextSectionButton.onclick = ()=>{thirdSection.scrollIntoView()};
        break;
    case (progress>49 && progress<80):
        scrollText.textContent = 'Impact';
        gsap.to(header,{backgroundColor: "rgba(0,0,0,0.9)", duration: 0.7});
        currentSection = 'Impact';
        nextSectionButton.onclick = ()=>{fourthSection.scrollIntoView()};
        break;
    case (progress>79 && progress<99):
        scrollText.textContent = 'Opportunities';
        gsap.to(header,{backgroundColor: "rgba(0,0,0,0.9)", duration: 0.7});
        currentSection = 'Opportunities';
        nextSectionButton.onclick = ()=>{fifthSection.scrollIntoView()};
        break;
    case (progress>99):
        scrollText.textContent = 'Subscribe';
        gsap.to(header,{backgroundColor: "rgba(0,0,0,0.9)", duration: 0.7});
        currentSection = 'Subscribe';
        nextSectionButton.onclick = ()=>{firstSection.scrollIntoView()};
        break;
    default:
        break;
    }

    // SHOWS THE NAME OF THE TARGET SECTION WHEN HOVERING
    lines.forEach(line=>{
        line.addEventListener('mouseenter', ()=>{
            const sections = {
                scrollLine1: "Home",
                scrollLine2: "Technology",
                scrollLine3: "Impact",
                scrollLine4: "Opportunities",
                scrollLine5: "Subscribe"
            }
            scrollText.textContent = `${sections[line.id]}`;
        })
    });
    // RETURNS THE NAME OF THE SECTION WHEN HOVERING ENDS
    lines.forEach(line=>{
        line.addEventListener('mouseleave', ()=>{
            scrollText.textContent = currentSection;
        })
    });
    // CLICK LISTENERS TO NAVIGATE TO THE SELECTED SECTION
    lines.forEach(line=>{
        line.addEventListener('click', (e)=>{
            switch(e.target.id){
                case("scrollLine1"):
                    firstSection.scrollIntoView();
                    break;
                case("scrollLine2"):
                    secondSection.scrollIntoView();
                    break;
                case("scrollLine3"):
                    thirdSection.scrollIntoView();
                    break;
                case("scrollLine4"):
                    fourthSection.scrollIntoView();
                    break;
                case("scrollLine5"):
                    fifthSection.scrollIntoView();
                    break;
            }
        })
    });
};
// EVENT LISTENERS WHEN THE PAGE LOADS AND EVERYTIME A SCROLL HAPPEN
window.addEventListener('scroll', scrollingControl);
window.addEventListener('load', scrollingControl);