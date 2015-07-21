$(document).ready( function() {
  // gives focus to input text box as soon document is ready
  $('#newTaskTextInput').focus();

  // Uncomment the following block to print helpful message(s) to the console (useful for DEBUG)
/*
    console.log("DEBUT TEST DEBUG");
    console.log("When page is first loaded, text input= " + $('input[name=newTaskTextInput]').val());
*/

  /* will fix this bug:
     "when user hits enter key, the page is reloaded"
     with the help of http://stackoverflow.com/a/15488912 */
  $('form').on('submit', function(event) {
      event.preventDefault();
  });

  //watches for the click event on div '#add'
  $('#add').click( function() { 
      addNewTask();
  });

  /* === FUNCTION TO HANDLE WHAT HAPPENS WHEN YOU CLICK THE ADD "BUTTON" 
   Basically, when '#add' button is clicked, the function gets the text 
   typed in the input text box whose name is '#newTaskTextInput' 
   and appends a new "listItem" list entry (li) within the "todoList" div */
  
    function addNewTask () {

    // Uncomment the following block to print helpful messages to the console (useful for DEBUG)
/*
       console.log();
       console.log("NOW ENTERING THE addNewTask FUNCTION");
       console.log("input[name=newTaskTextInput] contains the following string '" + $('input[name=newTaskTextInput]').val() + "'");
*/

        //stores text from text input into the itemText variable
        var itemText = $('input[name=newTaskTextInput]').val(); 
        
        // Uncomment the following block to print helpful messages to the console (useful for DEBUG)
/*
           console.log("Text entered in the input box is passed to variable itemText.");
           console.log("Now, itemText variable contains '" + itemText + "'");
*/

        /* condition to detect if the user has not modified the default textinput value 
           (i.e. still displaying 'enter new task here')
           or if user has clicked (given focus to) text input but not typed text yet; 
           ideal case would be to check for any number of white spaces with a regex */
        if(itemText == '' || itemText == ' ' || itemText == '  ' || itemText == 'enter new task here') { 
        /* prevents from adding a new task if "#add" div is clicked 
           whereas nothing has been typed in the input text box; 
           in this case, there is no subsequent action except displaying an error message 
           that is appended to the ".error-message" class (to control formatting with CSS) */
        
          // Uncomment the following line(s) to print helpful message(s) to the console (useful for DEBUG)
//           console.log("No significant text in input box, so displaying error message");

          // actually displays the error message
          $('.error-message').append('Please enter a new task before clicking the add button!<br/>'); 
        } 

        else { // user has actually typed text in the newTaskTextInput field; 

            // Uncomment the following block to print helpful message to the console (useful for DEBUG)
/*
            console.log();
            console.log("User has entered text in input box");
            console.log("input[name=newTaskTextInput] contains the following string '" + $('input[name=newTaskTextInput]').val() + "'");
            console.log("Text entered is stored in itemText variable");
            console.log("itemText now contains: ' " + itemText +  "'");
*/

          //appends a new list item, containing the text typed by the user, to the '.list' div
          $('.list').append('<li class="item">   ' + itemText + '</li>'); 

          // Uncomment the following line to print helpful message(s) to the console (useful for DEBUG)
//        console.log("This text from the itemText variable has been added to .list div");

          // empties the '.error-message' div because a new task was actually created
          $('.error-message').empty(); 
           
          // Uncomment the following line to print helpful message(s) to the console (useful for DEBUG)
 //          console.log("The .error-message class content has been emptied");

          // clears the input text box; 
          $('input[name=newTaskTextInput]').val(''); 

          // Uncomment the following block to print helpful message to the console (useful for DEBUG)
/*
             console.log("We're at end of the addNewTask function, and itemText variable = " + itemText);
             console.log("And input[name=newTaskTextInput] contains '" + $('input[name=newTaskTextInput]').val() + "'");
*/

        };
        return false; // makes sure pressing Enter will not reload the page
    };
    
  // === END OF FUNCTION HANDLING NEW TASKS ===



  /* The little function below toggles 'itemdone' class 
     on items (from the '.list') that are clicked
     so that the item is greyed out and formatted as strikethrough;
     it also moves the item to the '.listdone' div */
  $(document).on('click', '.item', function() { 
      $(this).toggleClass('itemdone');
      // moves the done item to the 'listdone' div
      $('.listdone').append(this);
  });
  


  /* The little function below does the opposite
     e.g. moving back a "done" item to the "todo" list when clicked */
  $(document).on('click', '.itemdone', function() {
      $(this).removeClass('itemdone');
      // moves back the undone item to the 'list' div
      $('.list').append(this);
  });



  /* The little function below clears all completed tasks 
     when the '#delete' div is clicked */
  $(document).on('click', '#delete', function() {
      confirm("Deleted tasks can't be recovered. Do you really want to DELETE all done tasks?");
    $('.itemdone').hide();
  });



  /* This function marks all tasks from the "To do" list
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



  /* This function "unchecks" all tasks from the "Done" list
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
