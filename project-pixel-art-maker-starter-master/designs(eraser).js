//function to make sure it loads after html 
$(function(){

function makeGrid(evt) {
  const height=$('#inputHeight').val();  
  const width=$('#inputWidth').val();
  const table=$('#pixelCanvas');
  const color=$('#colorPicker');
  (table).children().remove(); //removes any grid created previously
  for (let r=0; r<height; r++) {  //loops for creating grid
    (table).append('<tr></tr>');
    for (let c=0; c<width; c++) {  
      $('tr').last().append('<td></td>'); //adds new cells to last rows
    }
  }
  evt.preventDefault();//prevents reloading page with submit button

//if( eraser.checked){ 


let isDrawing = false;


table.on('mousedown', 'td', function(evt) {  //
  evt.preventDefault();
  isDrawing = true;
  if (isDrawing) {
    $(evt.target).css('background-color', color.val());
  };
});
table.on('mouseenter', 'td', function(evt) {
  if (isDrawing) {
    $(evt.target).css('background-color', color.val());
  }
});
table.on('mouseup', 'td', function(evt) {
  isDrawing = false;
});
table.on('mouseleave', function(evt) {
  isDrawing = false;
});

  (table).on('dblclick', 'td', function(){  //listens to clicks on created (table) and colours tds
      $(this).css('background-color', "#ffffff");
  });
//}//if ending
/*else{
    let isDrawing = false;


table.on('mousedown', 'td', function(evt) {  //
  evt.preventDefault();
  isDrawing = true;
  if (isDrawing) {
    $(evt.target).css('background-color', "#ffffff");
  };
});
table.on('mouseenter', 'td', function(evt) {
  if (isDrawing) {
    $(evt.target).css('background-color', "#ffffff");
  }
});
table.on('mouseup', 'td', function(evt) {
  isDrawing = false;
});
table.on('mouseleave', function(evt) {
  isDrawing = false;
});
}//else ending*/

$("#button").click(function(evt) { //calls the function makeGrid
    
  makeGrid(evt);
});

}//ending of makeGrid

});//main function ending
