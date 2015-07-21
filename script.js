$(document).ready( function() {
  // next line was supposed to give focus to the add button but can't get it to work
  // $('#add').focus();

    // DEBUG
    console.log("DEBUT TEST DEBUG");
    console.log("When page is first loaded, text input= " + $('input[name=newTaskTextInput]').val());

  /* will fix this bug:
     "when user hits enter key, the page is reloaded"
     with the help of http://stackoverflow.com/a/15488912 */
  $('form').on('submit', function(event) {
      event.preventDefault();
  });

  // watches for keypress on return key 
  $(document).keydown( function (key) {
      switch (parseInt(key.which,10)) {
          // Enter key pressed
          case 13:
              addNewTask();
          break;
      }
  }); 

  // pressing the return key should activate the 'add' button

  //watches for the click event on div '#add'
  $('#add').click( function() { 
      addNewTask();
  });

  /* === FUNCTION TO HANDLE WHAT HAPPENS WHEN YOU CLICK THE ADD "BUTTON" (which actually is just a div)
   Basically, when '#add' div is clicked, the function gets the text 
   typed in the input text box whose name is '#newTaskTextInput' 
   and appends a new "listItem" list entry (li) within the "todoList" div */
  
    function addNewTask () {
         // declares a new variable used at the end of this function
        var defaultVal = 'enter new task here'; 
        //stores text from text input into the itemText variable
        var itemText = $('input[name=newTaskTextInput]').val(); 
        
        // DEBUG
           console.log("At beginning of function, itemText = " + itemText);

        /* condition to detect if the user has not modified the default textinput value 
           (i.e. still displaying 'enter new task here')
           or if user has clicked (given focus to) text input but not typed text yet */
        if(itemText == defaultVal || itemText == '' || itemText == ' ' || itemText == 'enter new task here') { 
        /* prevents from adding a new task if "#add" div is clicked 
           whereas nothing has been typed in the input text box; 
           in this case, there is no subsequent action except displaying an error message 
           that is appended to the ".error-message" class (to control formatting with CSS) */
          // DEBUG
             console.log("no significant text in input box, so error message");

          $('.error-message').append('Please enter a new task before clicking the add button!<br/>'); 
        } 
        else { // user has actually typed text in the newTaskTextInput field; 
          //appends a new list item containing the text typed by the user, to the '.list' div
            // DEBUG
            console.log("User has entered text in input box");
            console.log("Text entered is stored in itemText variable");
            console.log("itemText now contains: ' " + itemText +  "'");

          $('.list').append('<li class="item">   ' + itemText + '</li>'); 

          // DEBUG
          console.log("last itemText has been added to .list div");

          // empties the '.error-message' div because a new task was actually created
          $('.error-message').empty(); 
           
          /* restores default value of input text box 
             mainly implemented to prevent the user from inadvertently adding the same task again 
             by clicking several times on the '#add' div */
          $('input[name=newTaskTextInput]').val(defaultVal); 

          // DEBUG
          console.log("We're at end of the addNewTask function, and itemText variable = " + itemText);

        };
        return false;
    };
    
  /* === END OF FUNCTION HANDLING NEW TASKS ===

     little function that toggles 'itemdone' class 
     on items (from the '.list') that are clicked
     so that the item is greyed out and formatted as strikethrough;
     it also moves the item to the '.listdone' div */
  $(document).on('click', '.item', function() { 
      $(this).toggleClass('itemdone');
      // moves the done item to the 'listdone' div
      $('.listdone').append(this);
  });
  /* the little function below does the opposite
     e.g. moving back a "done" item to the "todo" list when clicked */
  $(document).on('click', '.itemdone', function() {
      $(this).removeClass('itemdone');
      // moves back the undone item to the 'list' div
      $('.list').append(this);
  });

  /* this function clear all completed tasks 
     when the '#delete' div is clicked */
  $(document).on('click', '#delete', function() {
      confirm("Deleted tasks can't be recovered. Do you really want to DELETE all done tasks?");
    $('.itemdone').hide();
  });

  /* this function marks all tasks from the "To do" list
     as completed, which moves them to the "Done" list */
  $(document).on('click', '#alldone', function() {
    // stores content (html, including li tags) of the "To do" list
    var $list = $('.list').html();
    // un-comment the line below to print $list to the console for debugging
    // console.log('The $list variable contains: ',$list);
    // appends all the items included in the $list var to the "Done list"
    $('.listdone').append($list); 
    /* adds class '.itemdone' to all these items 
       newly added to the "Done list" */
    $('.item').addClass('itemdone'); 
    // removes all items from the "Todo list"
    $('.list').empty();
  });

  /* this function unchecks all tasks from the "Done" list
     and moves them back to the "To do" list */
  $(document).on('click', '#undo', function() {
    // stores content (html, including li tags) of the "Done" list
    var $listdone = $('.listdone').html();
    // un-comment the line below to print $list to the console for debugging
    // console.log('The $listdone variable contains: ',$listdone);
    
    // appends all the items included in the $listdone var to the "To do" list
    $('.list').append($listdone); 
    /* removes class '.itemdone' from all these items 
       newly added to the "To do" list */
    $('.itemdone').removeClass('itemdone'); 
    // removes all items from the "Done" list
    $('.listdone').empty();
  });

  // makes list items sortable with jQuery UI
      $('ul').sortable();

});
