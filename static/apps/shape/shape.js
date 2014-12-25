/**
 * Blockly Apps: Shape Graphics
 *
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @author Jim Brown
 * @version 1.04
 */
'use strict'

/**
 * Create a namespace for the application.
 */
var Shape = {};

// Supported languages.
BlocklyApps.LANGUAGES = {
  // Format: ['Language name', 'direction', 'XX_compressed.js']
  en: ['English', 'ltr', 'en_compressed.js'],
};
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="generated/' +
               BlocklyApps.LANG + '.js"></script>\n');

Shape.WIDTH = 400;
Shape.HEIGHT = 400;
Shape.xPos = Shape.WIDTH / 2;
Shape.yPos = Shape.HEIGHT / 2;
// type of fill - 0=Solid 1=Vertical gradient 2=Horizontal gradient
Shape.fillMethod = 0;
// fill colours -- start and end. For solid fill 'Start' is used.
Shape.fillColourStart = '#FF0000';
Shape.fillColourEnd = '#FF0000';
// Polygon drawing mode - 0=off 1=poly line mode 2=poly fill mode
Shape.polyDrawingMode = 0;
// variables for polygon bounding box area.
Shape.polyMinX = 0;
Shape.polyMinY = 0;
Shape.polyMaxX = 0;
Shape.polyMaxY = 0;
// Whether or not the drawing cursor is rendered.
Shape.cursorVisible = true;

/**
 * PID of animation task currently executing.
 */
Shape.pid = 0;

/**
 * Initialize Blockly and the shapes. Called on page load.
 */
Shape.init = function() {
  BlocklyApps.init();

  var rtl = BlocklyApps.LANGUAGES[BlocklyApps.LANG][1] == 'rtl';
  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('blockly'),
      {path: '../../',
       rtl: rtl,
       toolbox: toolbox,
       trashcan: true});

  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  BlocklyApps.checkTimeout(%1);\n';

  // Add to reserved word list: API, local variables in execution evironment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Shape,code');

  window.addEventListener('beforeunload', function(e) {
    if (Blockly.mainWorkspace.getAllBlocks().length > 2) {
      e.returnValue = BlocklyApps.getMsg('Shape_unloadWarning');  // Gecko.
      return BlocklyApps.getMsg('Shape_unloadWarning');  // Webkit.
    }
    return null;
  });
  var blocklyDiv = document.getElementById('blockly');
  var visualization = document.getElementById('visualization');
  var onresize = function(e) {
    var top = visualization.offsetTop;
    blocklyDiv.style.top = Math.max(10, top - window.scrollY) + 'px';
    blocklyDiv.style.left = rtl ? '10px' : '420px';
    blocklyDiv.style.width = (window.innerWidth - 440) + 'px';
  };
  window.addEventListener('scroll', function() {
      onresize();
      Blockly.fireUiEvent(window, 'resize');
    });
  window.addEventListener('resize', onresize);
  onresize();
  Blockly.fireUiEvent(window, 'resize');

  // Hide download button if browser lacks support
  // (http://caniuse.com/#feat=download).
  if (!(goog.userAgent.GECKO ||
       (goog.userAgent.WEBKIT && !goog.userAgent.SAFARI))) {
    document.getElementById('captureButton').className = 'disabled';
  }

  // Initialize the slider.
  var sliderSvg = document.getElementById('slider');
  Shape.speedSlider = new Slider(10, 35, 130, sliderSvg);

  var defaultXml =
	  '<xml>' +
	  '		<block type="draw_polygon" x="62" y="40">' +
	  ' 		<statement name="LINESTACK">' +
	  '				<block type="draw_lineto">' +
      '					<value name="XPOS"><block type="math_number"><title name="NUM">140</title></block></value>' +
      '					<value name="YPOS"><block type="math_number"><title name="NUM">160</title></block></value>' +
      '					<next>' +
	  '						<block type="draw_lineto">' +
      '							<value name="XPOS"><block type="math_number"><title name="NUM">70</title></block></value>' +
      '							<value name="YPOS"><block type="math_number"><title name="NUM">232</title></block></value>' +
      '						</block>' +
      '					</next>' +
      '				</block>' +
      '			</statement>' +
      '		</block>' +
      '</xml>';
  BlocklyApps.loadBlocks(defaultXml);

  Shape.ctxDisplay = document.getElementById('display').getContext('2d');
  Shape.ctxScratch = document.getElementById('scratch').getContext('2d');
  Shape.reset();

  // Lazy-load the syntax-highlighting.
  window.setTimeout(BlocklyApps.importPrettify, 1);
};

window.addEventListener('load', Shape.init);

/**
 * Reset to start position, clear the display, and kill any
 * pending tasks.
 */
Shape.reset = function() {
  // Starting location (middle of display)
  Shape.xPos = Shape.WIDTH / 2;
  Shape.yPos = Shape.HEIGHT / 2;
  
  // Reset modes
  Shape.fillMethod = 0;
  Shape.fillColourStart = '#FF0000';
  Shape.fillColourEnd = '#FF0000';
  Shape.lineColourValue = '#000000';
  Shape.textColourValue = '#000066';
  Shape.ctxScratch.globalAlpha = 1.0;
  Shape.polyDrawingMode = 0;
  Shape.showCursor = true;

  // Clear the display.
  Shape.ctxScratch.canvas.width = Shape.ctxDisplay.canvas.width;
  Shape.ctxScratch.canvas.height = Shape.ctxDisplay.canvas.height;
  Shape.ctxScratch.strokeStyle = Shape.lineColourValue;
  Shape.ctxScratch.fillStyle = Shape.fillColourStart;
  Shape.ctxScratch.moveTo(Shape.xPos,Shape.yPos);
  Shape.ctxScratch.lineWidth = 2;
  Shape.ctxScratch.lineCap = 'round';
  Shape.ctxScratch.font = 'normal 14pt Arial';
  Shape.display();

  // Kill any task.
  if (Shape.pid) {
    window.clearTimeout(Shape.pid);
  }
  Shape.pid = 0;
};

/**
 * Copy the scratch canvas to the display canvas. Add drawing cursor (cross hairs).
 */
Shape.display = function() {
  Shape.ctxDisplay.globalCompositeOperation = 'copy';
  Shape.ctxDisplay.drawImage(Shape.ctxScratch.canvas, 0, 0);
  Shape.ctxDisplay.globalCompositeOperation = 'source-over';
  // Draw the crosshairs.
  if (Shape.showCursor) {
	var chSize=8;
    // Draw the lower drawing cursor (cross hairs)
    Shape.ctxDisplay.strokeStyle = '#000055';
    Shape.ctxDisplay.lineWidth = 4;
    Shape.ctxDisplay.beginPath();
    Shape.ctxDisplay.moveTo(Shape.xPos-chSize, Shape.yPos);
    Shape.ctxDisplay.lineTo(Shape.xPos+chSize, Shape.yPos);
    Shape.ctxDisplay.moveTo(Shape.xPos, Shape.yPos-chSize);
    Shape.ctxDisplay.lineTo(Shape.xPos, Shape.yPos+chSize);
    Shape.ctxDisplay.stroke();
    // Draw the upper drawing cursor (cross hairs)
    Shape.ctxDisplay.strokeStyle = '#999900';
    Shape.ctxDisplay.lineWidth = 2;
    Shape.ctxDisplay.beginPath();
    Shape.ctxDisplay.moveTo(Shape.xPos-chSize, Shape.yPos);
    Shape.ctxDisplay.lineTo(Shape.xPos+chSize, Shape.yPos);
    Shape.ctxDisplay.moveTo(Shape.xPos, Shape.yPos-chSize);
    Shape.ctxDisplay.lineTo(Shape.xPos, Shape.yPos+chSize);
    Shape.ctxDisplay.stroke();
  }
};

/**
 * Click the run button.  Start the program.
 */
Shape.runButtonClick = function() {
  var runButton = document.getElementById('runButton');
  var resetButton = document.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = runButton.offsetWidth + 'px';
  }
  runButton.style.display = 'none';
  resetButton.style.display = 'inline';
  document.getElementById('spinner').style.visibility = 'visible';
  Blockly.mainWorkspace.traceOn(true);
  Shape.execute();
};

/**
 * Click the reset button.
 */
Shape.resetButtonClick = function() {
  document.getElementById('runButton').style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  document.getElementById('spinner').style.visibility = 'hidden';
  Blockly.mainWorkspace.traceOn(false);
  Shape.reset();
};


/**
 * Execute the user's code.
 */
Shape.execute = function() {
  BlocklyApps.log = [];
  BlocklyApps.ticks = 1000000;
  // Reset the graphic.
  Shape.reset();

  var code = Blockly.Generator.workspaceToCode('JavaScript');
  try {
    eval(code);
  } catch (e) {
    // Null is thrown for infinite loop.
    // Otherwise, abnormal termination is a user error.
    if (e !== Infinity) {
      alert(e);
    }
  }

  // BlocklyApps.log now contains a transcript of all the user's actions.
  // Animate the transcript.
  Shape.pid = window.setTimeout(Shape.animate, 100);
};

/**
 * Iterate through the recorded path and animate the shape drawing actions.
 */
Shape.animate = function() {
  // All tasks should be complete now.  Clean up the PID list.
  Shape.pid = 0;

  var tuple = BlocklyApps.log.shift();
  if (!tuple) {
    document.getElementById('spinner').style.visibility = 'hidden';
    Blockly.mainWorkspace.highlightBlock(null);
    return;
  }
  var command = tuple.shift();
  BlocklyApps.highlight(tuple.pop());
  Shape.step(command, tuple);
  Shape.display();

  // Scale the speed non-linearly, to give better precision at the fast end.
  var stepSpeed = 1000 * Math.pow(Shape.speedSlider.getValue(), 2);
  Shape.pid = window.setTimeout(Shape.animate, stepSpeed);
};

/**
 * Execute one step.
 * @param {string} command (e.g. 'RECT').
 * @param {!Array} values List of arguments for the command.
 */
Shape.step = function(command, values) {
  switch (command) {
    case 'MOVETO': // Move drawing point to new position
		Shape.xPos=values[0] ; Shape.yPos=values[1];
		Shape.ctxScratch.moveTo(Shape.xPos,Shape.yPos);
		break;
    case 'LINETO': // Draw line to x/y (also move drawing cursor to this point)
		Shape.ctxScratch.lineTo(values[0],values[1]);
		Shape.xPos=values[0] ; Shape.yPos=values[1];
		if (Shape.polyDrawingMode > 0 ) {
			// update polygon bounding box to accomodate polygon fill
			if (Shape.xPos < Shape.polyMinX) { Shape.polyMinX = Shape.xPos; }
			if (Shape.xPos > Shape.polyMaxX) { Shape.polyMaxX = Shape.xPos; }
			if (Shape.yPos < Shape.polyMinY) { Shape.polyMinY = Shape.yPos; }
			if (Shape.yPos > Shape.polyMaxY) { Shape.polyMaxY = Shape.yPos; }
		 } else {
			Shape.ctxScratch.stroke();
		}
		break;
    case 'RECT': // Draw rect (either filled or unfilled)
		if (values[2]) { // filled
			Shape.CreateFill(Shape.xPos,Shape.yPos,values[0],values[1]);
			Shape.ctxScratch.fillRect(Shape.xPos,Shape.yPos,values[0],values[1]);
		} else {
			Shape.ctxScratch.strokeRect(Shape.xPos,Shape.yPos,values[0],values[1]);
		}
		break;
	case 'ERASEBACKGROUND': // Erases the background using the current fill colour/gradient
	    Shape.CreateFill(0,0,Shape.WIDTH,Shape.HEIGHT);
		Shape.ctxScratch.fillRect(0,0,Shape.WIDTH,Shape.HEIGHT);
		break;
	case 'ELLIPSE': // Draw an ellipse (filled or unfilled)
		for (var i = 0 ; i < 2 * Math.PI+0.1; i += 0.1 ) {
			var xPos = Shape.xPos - (values[0] * Math.sin(i));
			var yPos = Shape.yPos + (values[1] * Math.cos(i));
			if (i == 0) {
				Shape.ctxScratch.beginPath();
				Shape.ctxScratch.moveTo(xPos, yPos);
			} else {
				Shape.ctxScratch.lineTo(xPos, yPos);
			}
		}
		Shape.ctxScratch.closePath();
		if (values[2]) { // filled
			var hWidth=values[0]/2 ; var hHeight=values[1]/2;
			Shape.CreateFill(Shape.xPos-hWidth,Shape.yPos-hHeight,values[0]+hWidth,values[1]+hHeight);
			Shape.ctxScratch.fill();
		} else { //unfilled
			Shape.ctxScratch.stroke();
		}
		break;
    case 'DRAWTEXT':  // Draw text
      Shape.ctxScratch.save();
      Shape.ctxScratch.translate(Shape.xPos, Shape.yPos);
      Shape.ctxScratch.fillStyle = Shape.textColourValue;
      Shape.ctxScratch.fillText(values[0], 0, 0);
      Shape.ctxScratch.restore();
      break;
    case 'DRAWFONT':  // Font settings
		Shape.ctxScratch.font = values[2] + ' ' + values[1] + 'pt ' + values[0];
		break;
    case "POLYBEGIN": // Begin polygon drawing mode
		Shape.polyDrawingMode = 1; // unfilled poly mode
		if (values[0]) {Shape.polyDrawingMode = 2;} // // filled poly mode
		Shape.ctxScratch.beginPath();
		Shape.ctxScratch.moveTo(Shape.xPos,Shape.yPos);
		// Set the polygon bounding box to a small rect
		Shape.polyMinX=Shape.xPos-4; 
		Shape.polyMaxX=Shape.xPos+4;
		Shape.polyMinY=Shape.yPos-4;
		Shape.polyMaxY=Shape.yPos+4;
		break;
    case "POLYEND": // End polygon drawing mode
		Shape.ctxScratch.closePath();
		if (Shape.polyDrawingMode == 2) { // filled poly
			Shape.CreateFill(Shape.polyMinX,Shape.polyMinY,Shape.polyMaxX,Shape.polyMaxY);
			Shape.ctxScratch.fill();
		} else { // unfilled poly
			Shape.ctxScratch.stroke();
		}
		Shape.polyDrawingMode = 0;
		break;
    case 'LINEWIDTH':  // Set line Width
      Shape.ctxScratch.lineWidth = values[0];
      break;
    case 'LINECOL':  // Set line Colour
      Shape.lineColourValue = values[0];
      Shape.ctxScratch.strokeStyle = values[0];
      break;
    case 'SOLIDFILLCOL':  // Set solid fill Colour
      Shape.fillColourStart = values[0];
      Shape.fillColourEnd = values[0];
      Shape.fillMethod=0;
      break;
    case 'GRADFILLCOL':  // Set gradient fill Colour (start,end,dir)
		Shape.fillColourStart = values[0];
		Shape.fillColourEnd = values[1];
		if (values[2]) {
			Shape.fillMethod = 2; // horizontal gradient
		} else {
			Shape.fillMethod = 1; // vertical gradient
		};
      break;
    case 'TEXTCOL':  // Set text Colour
      Shape.textColourValue = values[0];
      break;
    case 'ALPHALEVEL': // Set alpha level
		Shape.ctxScratch.globalAlpha  = values[0];
		break;
    case 'HIDECURSOR':  // Hide drawing cursor
      Shape.showCursor = false;
      break;
    case 'SHOWCURSOR':  // Show drawing cursor
      Shape.showCursor = true;
      break;
  }
};

/**
* Create the fill gradient patten or solid fill colour
*/
Shape.CreateFill = function(x1,y1,x2,y2) {
	if (Shape.fillMethod==1) { // vertical gradient
		var gradient=Shape.ctxScratch.createLinearGradient(0,y1,0,y2+y1);
		gradient.addColorStop(0,Shape.fillColourStart);
		gradient.addColorStop(1,Shape.fillColourEnd);
		Shape.ctxScratch.fillStyle=gradient;
	} else if (Shape.fillMethod==2) { // horizontal gradient
			var gradient=Shape.ctxScratch.createLinearGradient(x1,0,x2+x1,0);
			gradient.addColorStop(0,Shape.fillColourStart);
			gradient.addColorStop(1,Shape.fillColourEnd);
			Shape.ctxScratch.fillStyle=gradient;
	} else { // solid fill
		Shape.ctxScratch.fillStyle = Shape.fillColourStart;
	}
};

/**
* Save an image of the SVG canvas.
*/
Shape.createImageLink = function() {
  var imgLink = document.getElementById('downloadImageLink');
  imgLink.setAttribute('href',
      document.getElementById('display').toDataURL('image/png'));
  var temp = window.onbeforeunload;
  window.onbeforeunload = null;
  imgLink.click();
  window.onbeforeunload = temp;
};

Shape.debug = function(msg) {
	msg=msg + ': ' + Shape.xPos + ',' + Shape.yPos + ' polyMode=' + Shape.polyDrawingMode;
	console.log(msg);
};


// Shapes API.

Shape.moveCursorTo = function(xPosition, yPosition, id) {
  BlocklyApps.log.push(['MOVETO', xPosition, yPosition, id]);
};

Shape.drawLineTo = function(xPosition, yPosition, id) {
  BlocklyApps.log.push(['LINETO', xPosition, yPosition, id]);
};

Shape.drawRect = function(width, height, filled, id) {
  BlocklyApps.log.push(['RECT', width, height, filled, id]);
};

Shape.drawEllipse = function(radiusW, radiusH, filled, id) {
  BlocklyApps.log.push(['ELLIPSE', radiusW, radiusH, filled, id]);
};

Shape.setLineWidth = function(width, id) {
  BlocklyApps.log.push(['LINEWIDTH', Math.max(width, 1), id]);
};

Shape.setLineColour = function(colour, id) {
  BlocklyApps.log.push(['LINECOL', colour, id]);
};

Shape.setSolidFillColour = function(colour, id) {
  BlocklyApps.log.push(['SOLIDFILLCOL', colour, id]);
};

Shape.setGradientFillColour = function(colourfrom, colourto, horizontalflag, id) {
  BlocklyApps.log.push(['GRADFILLCOL', colourfrom, colourto, horizontalflag, id]);
};

Shape.setTextColour = function(colour, id) {
  BlocklyApps.log.push(['TEXTCOL', colour, id]);
};

Shape.setAlphaLevel = function(alpha, id) {
  BlocklyApps.log.push(['ALPHALEVEL', alpha, id]);
};

Shape.eraseBackground = function(id) {
  BlocklyApps.log.push(['ERASEBACKGROUND', id]);
};

Shape.hideCursor = function(id) {
  BlocklyApps.log.push(['HIDECURSOR', id]);
};

Shape.showCursor = function(id) {
  BlocklyApps.log.push(['SHOWCURSOR', id]);
};

Shape.beginPolygon = function(filled, id) {
  BlocklyApps.log.push(['POLYBEGIN', filled, id]);
};

Shape.endPolygon = function(id) {
  BlocklyApps.log.push(['POLYEND', id]);
};

Shape.drawText = function(text, id) {
  BlocklyApps.log.push(['DRAWTEXT', text, id]);
};

Shape.drawFont = function(font, size, style, id) {
  BlocklyApps.log.push(['DRAWFONT', font, size, style, id]);
};
