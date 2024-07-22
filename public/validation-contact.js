function validateForm(event) {
    /* -------------------------------------------------------------------------- */
    /*                        do not allow empty submission                       */
    /* -------------------------------------------------------------------------- */
    event.preventDefault();
  
    /* -------------------------------------------------------------------------- */
    /*                          get imput from the fields                         */
    /* -------------------------------------------------------------------------- */
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const commentInput = document.getElementById('commentInput');
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const comment = commentInput.value.trim();
  
    /* -------------------------------------------------------------------------- */
    /*                           validation of the input                          */
    /* -------------------------------------------------------------------------- */
    if (!name || !email || !comment) {
        alert('Please input the data');
        return;
    }
  
    /* -------------------------------------------------------------------------- */
    /*                        call insertcomment to submit                        */
    /* -------------------------------------------------------------------------- */
    insertComment(name, email, comment);
  
    /* -------------------------------------------------------------------------- */
    /*                        clear fields after submission                       */
    /* -------------------------------------------------------------------------- */
    nameInput.value = '';
    emailInput.value = '';
    commentInput.value = '';

  }
  

  