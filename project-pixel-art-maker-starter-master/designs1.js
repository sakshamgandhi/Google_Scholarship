'use strict';
// Declaring variables
let canvasWidth, canvasHeight, color,eraserMode = false, mouseDown = false;
// Defining function used to make grid
function makeGrid() {
  // Removing previous grid if it exists
  $('tr').remove();
  // Setting variables for width and height
  canvasWidth = $('#inputWidth').val();
  canvasHeight = $('#inputHeight').val();
  const color=$('#colorPicker');
  // Actual function making all hard work :)
  for (let i = 0; i < canvasHeight; i++) {
    $('#pixelCanvas').append('<tr></tr>');
    for (let i = 0; i < canvasWidth; i++) {
      $('tr:last-of-type').append('<td></td>');
    }
  }
}
// Defining function for rgb() to hex color conversion
function searchRGB() {
  let i = color.val();
  let rgbValues = i.split("(")[1].split(")")[0].split(", ");
  return rgbValues;
}
function componentToHex(c) {
  let hex = Number(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
// Calling the function makeGrid()
$('#sizePicker').submit(function(evt) {
  evt.preventDefault();
  makeGrid();
});
// Select color input
color = $('#colorPicker').val();
$('#colorPicker').on('change', function() {
  color = $('#colorPicker').val();
});
$('.predefined-colors').on('click', 'div', function(evt) {
  color = $(evt.target).css("background-color");
  $('#colorPicker').val(rgbToHex(searchRGB()[0], searchRGB()[1], searchRGB()[2]));
});
// Preventing default behaviour of context menu
$('.container').contextmenu(function() {
    return false;
});
// Eraser functionality
$('#eraser').on('change', function() {
  if ($(this).is(':checked')) {
    eraserMode = true;
    $('.eraser-label').html('Eraser mode: <span style="color: #f55;"><b>on</b></span>');
  } else {
    eraserMode = false;
    $('.eraser-label').html('Eraser mode: <span style="color: #0f0;"><b>off</b></span>');
  }
});
// Drawing on the canvas stuff (WIP)
$('#pixelCanvas').on('mousedown', function(evt) {
  mouseDown = true;
  evt.preventDefault();
  if ((mouseDown) && (evt.which == 1) && (!eraserMode)) {
    $(evt.target).css('background-color', color.val());
    $(document.body).on('mouseup', function() {
      mouseDown = false;
      $('#pixelCanvas').off('mouseenter');
    });
    $('#pixelCanvas').on('mouseenter', 'td', function(evt) {
      $(evt.target).css('background-color', color.val());
    });
  } else if (((mouseDown) && (evt.which == 3)) || (eraserMode)) {
    $(document.body).on('mouseup', function() {
      mouseDown = false;
      $('#pixelCanvas').off('mouseenter');
    });
    $('#pixelCanvas').on('mouseenter mousedown', 'td', function(evt) {
      $(evt.target).css('background-color', '#fff');
    });
  }
});
