const accordion = document.querySelectorAll('.accordion h3');
let mainParent;
let height;
let answer;

/* ----------------------------- begin the loop ----------------------------- */
accordion.forEach(item => {
    /* ------------------------------ click button ------------------------------ */
    item.addEventListener('click', () => {
        /* -------------------------- calculate the height -------------------------- */
        height = item.parentElement.nextElementSibling.firstElementChild.offsetHeight;
        /* -------------------------------- show/hide ------------------------------- */
        answer = item.parentElement.nextElementSibling;
        /* ------------------------------ active toggle ----------------------------- */
        mainParent = item.parentElement.parentElement;
        
        if (mainParent.classList.contains('active')) {
            mainParent.classList.remove('active');
            answer.style.height = `0px`;
        } else { 
            mainParent.classList.add('active');
            answer.style.height = `${height}px`;
        }
    });
});