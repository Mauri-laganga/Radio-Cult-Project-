'use strict';



const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

navbarToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
    navbarToggler.classList.remove("active");
  });
}



/**
 * search toggle
 */

const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchBox = document.querySelector("[data-search-box]");

for (let i = 0; i < searchTogglers.length; i++) {
  searchTogglers[i].addEventListener("click", function () {
    searchBox.classList.toggle("active");
  });
}



/**
 * header
 */

const playButton = document.querySelector('.play');

playButton.addEventListener('click', function() {
  this.classList.toggle('paused');
});


const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * hero
 */

const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const sliderDotsContainer = document.querySelector('.slider-dots');
let currentIndex = 0;
let dragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function showSlide(index) {
  sliderContainer.style.transform = `translateX(-${index * 100}%)`;
}

function createSliderDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
      updateSliderDots();
    });
    sliderDotsContainer.appendChild(dot);
  });
}

function updateSliderDots() {
  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextSlide() {
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
  updateSliderDots();
}

createSliderDots();
setInterval(nextSlide, 5000);

// Agregar control manual del slider mediante arrastre del mouse
sliderContainer.addEventListener('mousedown', dragStart);
sliderContainer.addEventListener('touchstart', dragStart);
sliderContainer.addEventListener('mouseup', dragEnd);
sliderContainer.addEventListener('touchend', dragEnd);
sliderContainer.addEventListener('mousemove', drag);
sliderContainer.addEventListener('touchmove', drag);

function dragStart(event) {
  if (event.type === 'touchstart') {
    startPos = event.touches[0].clientX;
  } else {
    startPos = event.clientX;
  }
  dragging = true;
}

function drag(event) {
  if (dragging) {
    let currentPosition = 0;
    if (event.type === 'touchmove') {
      currentPosition = event.touches[0].clientX;
    } else {
      currentPosition = event.clientX;
    }
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function dragEnd() {
  dragging = false;
  prevTranslate = currentTranslate;

  // Determinar si se debe cambiar de slide
  const threshold = sliderContainer.clientWidth / 5;
  if (currentTranslate > threshold && currentIndex > 0) {
    currentIndex--;
  } else if (currentTranslate < -threshold && currentIndex < slides.length - 1) {
    currentIndex++;
  }

  // Volver a mostrar el slide actual
  showSlide(currentIndex);
  updateSliderDots();
}


/**
 * Live section
 * 
 */

document.addEventListener("DOMContentLoaded", function() {
  var messageInput = document.getElementById("message-input");
  var messageContainer = document.getElementById("message-container");
  var sendButton = document.getElementById("send-button");

  sendButton.addEventListener("click", function() {
    var message = messageInput.value;
    if (message) {
      var messageElement = document.createElement("div");
      messageElement.classList.add("message");
      messageElement.textContent = message;

      var deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.innerHTML = "&#10006;"; // Puedes ajustar el contenido del botón de eliminación según tus preferencias

      messageElement.appendChild(deleteButton);
      messageContainer.appendChild(messageElement);

      messageInput.value = "";

      deleteButton.addEventListener("click", function() {
        messageElement.remove();
      });
    }
  });

  var deleteButtons = document.getElementsByClassName("delete-button");

  for (var i = 0; i < deleteButtons.length; i++) {
    var button = deleteButtons[i];

    button.addEventListener("click", function() {
      var messageElement = this.parentElement;
      messageElement.remove();
    });
  }
});

