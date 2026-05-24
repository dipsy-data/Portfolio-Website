'use strict';


/* ============================================================
   UTILITY
============================================================ */
const elementToggleFunc = (elem) => elem.classList.toggle('active');


/* ============================================================
   SIDEBAR — mobile expand/collapse
============================================================ */
const sidebar    = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));


/* ============================================================
   THEME TOGGLE — dark / light
============================================================ */
const themeToggle = document.getElementById('themeToggle');
const root        = document.documentElement;

const THEME_KEY  = 'dipsy-portfolio-theme';
const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
});


/* ============================================================
   PORTFOLIO FILTER
============================================================ */
const select      = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterBtns  = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

select.addEventListener('click', () => elementToggleFunc(select));

const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    if (selectedValue === 'all' || selectedValue === item.dataset.category) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

selectItems.forEach((item) => {
  item.addEventListener('click', function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

let lastClickedBtn = filterBtns[0];

filterBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove('active');
    this.classList.add('active');
    lastClickedBtn = this;
  });
});


/* ============================================================
   CONTACT FORM — enable submit when valid
============================================================ */
const form       = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn    = document.querySelector('[data-form-btn]');

formInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute('disabled');
    } else {
      formBtn.setAttribute('disabled', '');
    }
  });
});


/* ============================================================
   PAGE NAVIGATION
============================================================ */
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages    = document.querySelectorAll('[data-page]');

navLinks.forEach((link, i) => {
  link.addEventListener('click', function () {
    pages.forEach((page, j) => {
      if (this.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add('active');
        navLinks[j].classList.add('active');
        window.scrollTo(0, 0);
      } else {
        page.classList.remove('active');
        navLinks[j].classList.remove('active');
      }
    });
  });
});
