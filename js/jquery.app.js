$(document).ready(function () {

  // Where did the console.log come from?
  // Where do you put a for loop to loop through that array?


  // GET ALL or ONE
  function retrieveDonuts () {
    $.ajax({
      url: "http://api.doughnuts.ga/doughnuts",
      method: "GET",
      success: function (response, status) {
        // create an <li> and append
        console.log(response);
        for (i = 0; i < response.length; i++) {
          //console.log(response[i]); // {id: 1, style: "Old Fashioned", flavor: "Chocolate"}
          var donut = '' +
          '<li>' +
            '<class="flavor">' + response[i].flavor + " - " +
            '<class="style">' + '<em>' + response[i].style + '</em>' + " - " +
            '<button type="button" class="btn btn-warning edit" data-toggle="modal" data-target="#edit-modal">edit</button>' +
            '<button type="button" class="btn btn-danger delete">delete</button>' +
          '</li>';
          $('#doughnuts').prepend(donut);
          bindDelete();
          bindEdit()
        };
      }, // success
      error: function (response, status) {
        console.log(response);
      } // url
    }); // ajax
  } // retrieveDonuts


  // POST
  function createDonuts () {
    $('#new-doughnut').on("submit", function(e){
    e.preventDefault();

      var flavor = $('#new-doughnut-flavor').val();
      var style = $('#new-doughnut-style').val();

      $.ajax({
        url: "http://api.doughnuts.ga/doughnuts",
        method: "POST",
        data: {
          flavor: flavor,
          style: style
          },
          success: function (response, status) {
          //console.log(response);
            var donut = '' +
            '<li>' +
              '<class="flavor">'+ response.flavor + " - " +
              '<class="style">'+ response.style + " - " +
              '<button type="button" class="btn btn-warning edit">edit</button>' +
              '<button type="button" class="btn btn-danger delete">delete</button>' +
            '</li>';
            $('#doughnuts').prepend(donut);
          },
          error: function (response, status) {
            console.log(response);
          } //
      }); // ajax
    }); // submit
  } // createDonuts

  // DELETE - need donut ID
  function bindDelete () {
    $('.delete').off().on("click", function(){
      $(this).parent().parent().parent().remove();
      $.ajax({
        url: "http://api.doughnuts.ga/doughnuts/1",
        method: "DELETE",
        success: function (response, status) {
          // console.log(status);
        },
        error: function (response, status) {
          console.log(response);
        }
      });
    });
  }

  // PUT // default is style: "Old Fashioned", flavor: "Chocolate"
  function bindEdit () {
    $('.edit').off().on("click", function(){
    console.log("BUM");

      $.ajax({
        url: "http://api.doughnuts.ga/doughnuts/1", // + ID?
        method: "PUT",
        data: {
          style: "Cream",
          flavor: "Chocolate"
        },
        success: function (response, status) {
          console.log(response);
          console.log(status);
        },
        error: function (response, status) {
          console.log(response);
          console.log(status);
        }
      });
    });
  }

  function init() {
    retrieveDonuts();
    createDonuts();
  }

  init()


}); // do not delete
