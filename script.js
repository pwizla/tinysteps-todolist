// BEGIN SCRIPT.JS FILE
//
    // stores content (html, including li tags) of the "To do" list
    var $list = $('.list').html();
    // stores content (html, including li tags) of the "Done" list
    var $listdone = $('.listdone').html();

    var itemTooltip = "Click to mark the task as completed";
    var itemdoneTooltip = "Click to move the task back to the To Do list, Shift-Click to DELETE the task";
    var alldoneTooltip = "Click to mark all tasks as completed";
    var undoTooltip = "Click to move all tasks back to the To do list";
    var deleteTooltip = "Click to DELETE all completed tasks";

    var shiftClickDeletesCompletedItem = false;
    var showListSelector = false;

$(document).ready( function() {

    $('#circle-add-panel').addClass('circle-active');
  
    var $list = localStorage.getItem('todolist');
    var $listdone = localStorage.getItem('donelist');
    console.log("after localStorage call, $list is:", $list);
    console.log("after localStorage recall, $listdone is", $listdone);

    updateTooltipsContent();

    // displays the content of "To do" and "Done" lists as recalled from LocalStorage
    $('.list').val($list);
    $('.listdone').val($listdone);
    if ( $list == undefined) { 
        // do nothing 
        }
    else { 
        document.querySelector('.list').innerHTML = $list;
    }

    if ( $listdone == undefined) {
        // do nothing
    } else {
        document.querySelector('.listdone').innerHTML = $listdone;
    }

  // gives focus to input text box as soon document is ready
  $('#new-task-input').focus();

  // Uncomment the following block to print helpful message(s) to the console (useful for DEBUG)
/*
    console.log("DEBUT TEST DEBUG");
    console.log("When page is first loaded, text input= " + $('input[name=new-task-input]').val());
*/

  /* will fix this bug:
     "when user hits enter key, the page is reloaded"
     with the help of http://stackoverflow.com/a/15488912 */
  $('form').on('submit', function(event) {
      event.preventDefault();
  });

  //watches for the click event on div '#add'
  $('input#add').click( function() { 
      addNewTask();
  });


  if ( $('#show-tooltips-checkbox').is(':checked') ) {
    console.log("#show-tooltips-checkbox is checked");
  } else {
    console.log("#show-tooltips-checkbox is NOT checked");
  }
  

  function updateTooltipsContent () {
    if ( $('#show-tooltips-checkbox').is(':checked') ) {
      itemTooltip = "Click to mark the task as completed";
      itemdoneTooltip = "Click to move the task back to the To Do list, Shift-Click to DELETE the task";
      alldoneTooltip = "Click to mark all tasks as completed";
      undoTooltip = "Click to move all tasks back to the To do list";
      deleteTooltip = "Click to DELETE all completed tasks";
    } else {
      itemTooltip = "";
      itemdoneTooltip = "";
      alldoneTooltip = "";
      undoTooltip = "";
      deleteTooltip = "";  
    }

    $('.item').prop('title', itemTooltip);
    $('.itemdone').prop('title', itemdoneTooltip);
    $('#alldone').prop('title', alldoneTooltip);
    $('#undo').prop('title', undoTooltip);
    $('#delete').prop('title', deleteTooltip);

  };    


  
  /* === FUNCTION TO HANDLE WHAT HAPPENS WHEN YOU CLICK THE ADD "BUTTON" 
   Basically, when '#add' button is clicked, the function gets the text 
   typed in the input text box whose name is '#new-task-input' 
   and appends a new "listItem" list entry (li) within the "todoList" div */
  
    function addNewTask () {

    // Uncomment the following block to print helpful messages to the console (useful for DEBUG)
/*
       console.log();
       console.log("NOW ENTERING THE addNewTask FUNCTION");
       console.log("input[name=new-task-input] contains the following string '" + $('input[name=new-task-input]').val() + "'");
*/

        //stores text from text input into the itemText variable
        var itemText = $('input[name=new-task-input]').val(); 
        
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

        else { // user has actually typed text in the new-task-input field; 

            // Uncomment the following block to print helpful message to the console (useful for DEBUG)
/*
            console.log();
            console.log("User has entered text in input box");
            console.log("input[name=new-task-input] contains the following string '" + $('input[name=new-task-input]').val() + "'");
            console.log("Text entered is stored in itemText variable");
            console.log("itemText now contains: ' " + itemText +  "'");
*/

          //appends a new list item, containing the text typed by the user, to the '.list' div
          $('.list').append('<li class="item" title="' + itemTooltip +  '"> ' + itemText + '</li>'); 

          // Uncomment the following line to print helpful message(s) to the console (useful for DEBUG)
//        console.log("This text from the itemText variable has been added to .list div");

          // empties the '.error-message' div because a new task was actually created
          $('.error-message').empty(); 
           
          // Uncomment the following line to print helpful message(s) to the console (useful for DEBUG)
 //          console.log("The .error-message class content has been emptied");

          // clears the input text box; 
          $('input[name=new-task-input]').val(''); 

          // Uncomment the following block to print helpful message to the console (useful for DEBUG)
/*
             console.log("We're at end of the addNewTask function, and itemText variable = " + itemText);
             console.log("And input[name=new-task-input] contains '" + $('input[name=new-task-input]').val() + "'");
*/

        };

        // reflect changes to $list and $listdone and saves them to LocalStorage
        updateTodoList();
        updateDoneList();
        saveToLocalStorage();

        return false; // makes sure pressing Enter will not reload the page
    };
    
  // === END OF FUNCTION HANDLING NEW TASKS ===


  /* The little function below toggles 'itemdone' class 
     on items (from the '.list') that are clicked
     so that the item is greyed out and formatted as strikethrough;
     it also moves the item to the '.listdone' div */
  $(document).on('click', '.item', function() { 
      $(this).toggleClass('itemdone');
      $(this).prop('title', itemdoneTooltip);
      // moves the done item to the 'listdone' div
      $('.listdone').append(this);
      // reflects changes to $list and $listdone
      updateTodoList();
      updateDoneList();
      saveToLocalStorage();
  });
  


  /* The little function below does the opposite
     e.g. moving back a "done" item to the "todo" list when clicked.
     IF SHIFT CLICK, item is DELETED. */
  $(document).on('click', '.itemdone', function(e) {
      if (e.shiftKey && shiftClickDeletesCompletedItem === true) { // if Shift-Click instead of a simple Click (and option is not disabled in Settings)
        $(this).remove(); 
      } else {
        $(this).removeClass('itemdone');
        $(this).prop('title', itemTooltip);
        // moves back the undone item to the 'list' div
        $('.list').append(this);
      }
      // reflects changes to $list and $listdone
      updateTodoList();
      updateDoneList();
      saveToLocalStorage();
  });



  /* The little function below clears all completed tasks 
     when the '#delete' div is clicked */
  $(document).on('click', '#delete', function() {

      // makes sure $listdone is properly set
      updateDoneList();
      /* warns the user of irreversible changes
         and stores user's answer to dialog;
         such as clicking OK returns true
         and clicking Cancel returns false */
      var deleteConfirm = confirm("Deleted tasks can't be recovered.\n\nYou are going to DELETE all done tasks.");
      if (deleteConfirm == true) {
            $('.listdone').empty();
            // reflects changes to $listdone
            updateDoneList();
            saveToLocalStorage();
      } else { // do nothing 
      }
  });



  /* This function marks all tasks from the "To do" list
     as completed, which moves them to the "Done" list */
  $(document).on('click', '#alldone', function() {

    // makes sure $list is properly set
    updateTodoList();
    // appends all the items included in the $list var to the "Done list"
    $('.listdone').append($list); 
    // reflects changes to $listdone content
    updateDoneList();  
    updateTodoList();
    /* adds class '.itemdone' to all these items 
       newly added to the "Done list" */
    $('.item').addClass('itemdone'); 
    // removes all items from the "Todo list"
    $('.list').empty();
    // reflects changes to $list content
    updateTodoList();
    updateDoneList();
    saveToLocalStorage();
  });



  /* This function "unchecks" all tasks from the "Done" list
     and moves them back to the "To do" list */
  $(document).on('click', '#undo', function() {

    // makes sure $listdone is properly set
    updateDoneList();
    // appends all the items included in the $listdone var to the "To do" list
    $('.list').append($listdone); 
    /* removes class '.itemdone' from all these items 
       newly added to the "To do" list */
    $('.itemdone').removeClass('itemdone'); 
    // reflects changes to $list content
    updateTodoList();
    // removes all items from the "Done" list
    $('.listdone').empty();
    // reflects changes to $listdone content
    updateDoneList();
    saveToLocalStorage();
  });

  // makes list items sortable with jQuery UI
      $('ul').sortable({
          /* reflects changes to $list and $listdone
             when dragging is finished, as explained in
             http://stackoverflow.com/a/26192283/5139147
             except that I don't need "start:" here
             or it would trigger two updates,
             one of them being useless.
             I choose to update the lists when items are dragged
             so that the result of re-ordering is saved in the variables.
             It will be useful for localStorage retrieval. */
          update: function() {
                      updateTodoList();
                      updateDoneList();
                      saveToLocalStorage();
                  },
      });



    function updateTodoList () { // updates the $list global variable
        $list = $('.list').html();
        // prints out the complete $list if needed (uncomment for debugging sessions)
        console.log("$list is: ",$list);
    };



    function updateDoneList () { // updates the $listdone global variable
        $listdone = $('.listdone').html();
        // prints out the complete $listdone if needed (uncomment for debugging sessions)
        console.log("$listdone is: ",$listdone);
    };



    function saveToLocalStorage() {
        localStorage.setItem ('todolist', $list);
        // prints out localStorage for todolist
        console.log("localStorage item 'todolist' is:",localStorage.getItem ('todolist'));

        localStorage.setItem ('donelist', $listdone);
        // prints out localStorage for donelist
        console.log("localStorage item 'donelist' is:",localStorage.getItem ('donelist'));
    };

    // Clicking the "Hide Done" button toggles display 
    $('#show-done-checkbox').change( function() {
      $('#donelist').toggle();
    });

    // Handles clicks on the "Show Tooltips" checkbox in Settings
    $('#show-tooltips-checkbox').change( function () {
      console.log("#show-tooltips-checkbox has changed");
      if ( $('#show-tooltips-checkbox').is(':checked')) {
        console.log("checkbox is now checked");
      } else { console.log("checkbox is now UNCHECKED");
      }
      updateTooltipsContent();
    });

    // Turns on/off the "Shift-Click to delete" behavior
    $('#shiftclick-delete-checkbox').change ( function() {
        console.log("#shiftclick-delete-checkbox has changed");
        shiftClickDeletesCompletedItem = !shiftClickDeletesCompletedItem;
        console.log("var shiftClickDeletesCompletedItem = " + shiftClickDeletesCompletedItem);
        if ( $('#shiftclick-delete-checkbox').is(':checked')) {
            console.log("#shiftclick-delete-checkbox is now Checked");
        } else { 
            console.log("#shiftclick-delete-checkbox is now UNchecked");
        }
    });

    $('.settings-button').click( function() {
      $('#rightpanel').toggle('slide', { direction: 'right'}, 200);
      $('.settings-button-text').toggleClass('settings-button-text-active');
      $('.hamburger-menu').toggleClass('hamburger-menu-active');
    });

/*
    // Gives the ability to resize the todolist and donelist divs
    // (because I added the "resizable-list" class to these two divs
    $('.resizable').resizable({
      helper: "resizing-helper" // adds class for CSS
    }); 
*/

    $('#use-darktheme-checkbox').change( function() {
      var stylesheet = "";
      console.log("#use-darktheme-checkbox has changed");
      if ($('#use-darktheme-checkbox').is(':checked')) {
        console.log("#use-darktheme-checkbox is now Checked");
        stylesheet = "stylesheet-dark.css";
      } else { 
        console.log("#use-darktheme-checkbox is now UNchecked"); 
        stylesheet = "stylesheet.css";
      }
      console.log("applying " + stylesheet);
      $('#theme').attr("href", stylesheet); 
    });

    $('#list-selector .close-button').click( function() {
      $('#list-selector').hide();
    });

    $('#show-list-selector').change( function() {
      console.log("#show-list-selector has changed");
      if ($('#show-list-selector').is(':checked')) {
        console.log("#show-list-selector is now Checked");
        $('#list-selector').show();
        console.log("showing list-selector");
      } else {
        console.log("#show-list-selector is now UNchecked");
        $('#list-selector').hide();
        console.log("hiding list-selector");
      }
      });

    $('.circle').click( function() {
      console.log("click registered on button");
      $('.circle-active').removeClass('circle-active');
      $(this).addClass('circle-active');
    });

    $('#circle-todo-panel').click( function() {
      $('.add-panel').hide();
      $('.todo-panel').show();
      $('.done-panel').hide();
      $('.settings-panel').hide();
    });

    $('#circle-add-panel').click( function() {
      $('.add-panel').show();
      $('.todo-panel').hide();
      $('.done-panel').hide();
      $('.settings-panel').hide();
      $('#new-task-input').focus();
    });

    $('#circle-done-panel').click( function() {
      $('.add-panel').hide();
      $('.todo-panel').hide();
      $('.done-panel').show();
      $('.settings-panel').hide();
    });

    $('#circle-settings-panel').click( function() {
      $('.add-panel').hide();
      $('.todo-panel').hide();
      $('.done-panel').hide();
      $('.settings-panel').show();
    });


});

// END "SCRIPT.JS" file
