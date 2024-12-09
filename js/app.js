/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
//stores the ul in nav
const navbar = document.querySelector('#navbar__list');
//stores all section elements
const sections = document.querySelectorAll('section');
//creates a document fragment
const docFrag = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// add class 'active' to navbar li items when relevant section is active
const navActive = (() => {    
    for(i = 0; i < sections.length; i++){
        let id = sections[i].id;
        let nav = document.querySelector(`li a[href='#${id}']`);
        if (sections[i].classList.contains('your-active-class')){ 
            nav.classList.add('active');
            nav.style.cssText = 'background: rgb(82, 163, 124); color: #fff; transition: ease 0.3s all;' // add css for active links 
        } else {
            nav.classList.remove('active'); // remove class 'active' when relevant section is no longer active
            nav.style.cssText = ""; // use stylesheet css
        }
    }
});

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav = (() => {
    for (section of sections){
        let liItem = document.createElement('li');
        let id = section.id;
        let data = section.dataset.nav;
        liItem.innerHTML = `<a href='#${id}' class='menu__link'> ${data}</a>`;
        docFrag.appendChild(liItem); //append list items to document fragment 
    }
});

// add class 'active' to section when near top of viewport 
const activeSection = (() => {
    for(section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top > -(section.offsetHeight*0.6) && top < 200) {
            section.classList.add('your-active-class');
        } else {
            section.classList.remove('your-active-class');
        } //remove class 'active' when no longer in viewport
    }
});

// scroll to anchor ID using scroll function
const scrollTo = (() => {
    const id = event.target.getAttribute('href');
    for (section of sections){                
        if (`#${section.id}` === id){
            const y = section.getBoundingClientRect().top + window.scrollY;
            window.scroll({
                top: y-100,
                behavior: "smooth",
            });
        }
    }
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();
navbar.appendChild(docFrag); //append document fragment to ul stored in variable navbar

// Scroll to section on link click
navbar.addEventListener('click', 
    ((event) => {
        event.preventDefault();
        scrollTo();
        })
);

// Set sections and navbar as active; 
window.addEventListener('scroll', () => {
    activeSection();
    navActive();
});