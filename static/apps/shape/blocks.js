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
 * @author jimbrown007@gmail.com (Jim Brown)
 */
'use strict';

// Extensions to Blockly's language and JavaScript generator.

Blockly.JavaScript = Blockly.Generator.get('JavaScript');


Blockly.Language.draw_movecursorto = {
  // move drawing point to x,y
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Shape_moveCursorTo'));
    this.appendValueInput("XPOS")
        .setCheck("Number")
        .appendTitle("x");
    this.appendValueInput("YPOS")
        .setCheck("Number")
        .appendTitle("y");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_moveCursorToTooltip'));
  }
};

Blockly.JavaScript.draw_movecursorto = function() {
  // Generate JavaScript for moving to absolute position.
  var xpos = Blockly.JavaScript.valueToCode(this, 'XPOS', Blockly.JavaScript.ORDER_NONE) || '0';
  var ypos = Blockly.JavaScript.valueToCode(this, 'YPOS', Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Shape.moveCursorTo(' + xpos + ',' + ypos + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_lineto = {
  // draw a line from current position to x,y.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Shape_drawLineTo'));
        //.setOutput(true, 'DrawLineTo');
    this.appendValueInput("XPOS")
        .setCheck("Number")
        .appendTitle("x");
    this.appendValueInput("YPOS")
        .setCheck("Number")
        .appendTitle("y");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_drawLineToTooltip'));
  }
};

Blockly.JavaScript.draw_lineto = function() {
  // Generate JavaScript for drawing a line.
  var xp = Blockly.JavaScript.valueToCode(this, 'XPOS', Blockly.JavaScript.ORDER_NONE) || '0';
  var yp = Blockly.JavaScript.valueToCode(this, 'YPOS', Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Shape.drawLineTo(' + xp + ',' + yp + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_setlinewidth = {
  // Block for setting the stroke width.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('WIDTH')
        .setCheck('Number')
        .appendTitle(BlocklyApps.getMsg('Shape_setLineWidth'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_setLineWidthTooltip'));
  }
};

Blockly.JavaScript.draw_setlinewidth = function() {
  // Generate JavaScript for setting the line width.
  var width = Blockly.JavaScript.valueToCode(this, 'WIDTH',
      Blockly.JavaScript.ORDER_NONE) || '1';
  return 'Shape.setLineWidth(' + width + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_rect = {
  // draw a rect from current position with width,height.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Word_Draw')); // draw
	this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'FILLMODE'); // unfilled/filled
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Shape_drawRect')); // rectangle with
    this.appendValueInput("WIDTH")
        .setCheck("Number")
        .appendTitle(BlocklyApps.getMsg('Word_Width')); // width
    this.appendValueInput("HEIGHT")
        .setCheck("Number")
        .appendTitle(BlocklyApps.getMsg('Word_Height')); // height
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_drawRectTooltip'));
  }
};

Blockly.Language.draw_rect.STATE =
    [[BlocklyApps.getMsg('Word_Unfilled'), 'unfilledMode'],
    [BlocklyApps.getMsg('Word_Filled'), 'filledMode']];

Blockly.JavaScript.draw_rect = function() {
  // Generate JavaScript for drawing a rectangle.
  var wd = Blockly.JavaScript.valueToCode(this, 'WIDTH', Blockly.JavaScript.ORDER_NONE) || '1';
  var ht = Blockly.JavaScript.valueToCode(this, 'HEIGHT', Blockly.JavaScript.ORDER_NONE) || '1';
  var filledFlag = false;
  if (this.getTitleValue('FILLMODE') == 'filledMode') { filledFlag = true;}
  return 'Shape.drawRect(' + wd + ',' + ht + ',' + filledFlag + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_ellipse = {
  // draw an unfilled/filled ellipse from x,y with the specified radius width and height.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Word_Draw')); // draw
	this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'FILLMODE'); // unfilled/filled
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Shape_drawEllipse')); // ellipse with radius
    this.appendValueInput("RADWIDTH")
        .setCheck("Number")
        .appendTitle(BlocklyApps.getMsg('Word_Width')); // width
    this.appendValueInput("RADHEIGHT")
        .setCheck("Number")
        .appendTitle(BlocklyApps.getMsg('Word_Height')); // height
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_drawEllipseTooltip'));
  }
};

Blockly.Language.draw_ellipse.STATE =
    [[BlocklyApps.getMsg('Word_Unfilled'), 'unfilledMode'],
    [BlocklyApps.getMsg('Word_Filled'), 'filledMode']];

Blockly.JavaScript.draw_ellipse = function() {
	// Generate JavaScript for drawing a circle.
	var radW = Blockly.JavaScript.valueToCode(this, 'RADWIDTH', Blockly.JavaScript.ORDER_NONE) || '1';
	var radH = Blockly.JavaScript.valueToCode(this, 'RADHEIGHT', Blockly.JavaScript.ORDER_NONE) || '1';
	var filledFlag = false;
	if (this.getTitleValue('FILLMODE') == 'filledMode') { filledFlag = true;}
	return 'Shape.drawEllipse(' + radW + ',' + radH + ',' + filledFlag + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_polygon = {
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Word_Draw')); // draw
	this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'FILLMODE'); // unfilled/filled
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Shape_drawPolygon')); // polygon with
    this.appendStatementInput("LINESTACK")
        .setCheck("draw_line")
        .appendTitle(BlocklyApps.getMsg('Shape_drawPolygonLine')); // lines
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_drawPolygonTooltip'));
  }
};

Blockly.Language.draw_polygon.STATE =
    [[BlocklyApps.getMsg('Word_Unfilled'), 'unfilledMode'],
    [BlocklyApps.getMsg('Word_Filled'), 'filledMode']];

Blockly.JavaScript.draw_polygon = function() {
  // Create the code for a block of draw_line's for polygon rendering.
  var statements = Blockly.JavaScript.statementToCode(this, 'LINESTACK');
  	var filledFlag = false;
	if (this.getTitleValue('FILLMODE') == 'filledMode') { filledFlag = true;}
  var code = 'Shape.beginPolygon(' + filledFlag + ');\n' + statements + 'Shape.endPolygon();\n'
  return code;
};

Blockly.Language.draw_setlinecolour = {
  // Block for setting the line colour.
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendTitle(BlocklyApps.getMsg('Shape_setLineColour'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_setLineColourTooltip'));
  }
};

Blockly.JavaScript.draw_setlinecolour = function() {
  // Generate JavaScript for setting the line colour.
  var colour = Blockly.JavaScript.valueToCode(this, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Shape.setLineColour(' + colour + ', \'block_id_' +
      this.id + '\');\n';
};

Blockly.Language.draw_setsolidfillcolour = {
  // Block for setting the solid fill colour.
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendTitle(BlocklyApps.getMsg('Shape_setSolidFillColour'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_setSolidFillColourTooltip'));
  }
};

Blockly.JavaScript.draw_setsolidfillcolour = function() {
  // Generate JavaScript for setting the solid fill colour.
  var colour = Blockly.JavaScript.valueToCode(this, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Shape.setSolidFillColour(' + colour + ', \'block_id_' +
      this.id + '\');\n';
};

Blockly.Language.draw_setgradientfillcolour = {
  //  BLock for setting gradient fills.
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Word_Set'));
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'GRADIENTDIR');
    this.setTooltip(BlocklyApps.getMsg('Shape_setGradientFillDirectionTooltip'));
    this.appendValueInput("COLOURFROM")
        .setCheck("Colour")
        .appendTitle(BlocklyApps.getMsg('Word_From'));
    this.appendValueInput("COLOURTO")
        .setCheck("Colour")
        .appendTitle(BlocklyApps.getMsg('Word_To'));
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Language.draw_setgradientfillcolour.STATE =
   [[BlocklyApps.getMsg('Shape_setGradientFillVertical'), 'gradientV'],  
   [BlocklyApps.getMsg('Shape_setGradientFillHorizontal'), 'gradientH']];

Blockly.JavaScript.draw_setgradientfillcolour = function() {
  // Generate JavaScript for setting gradient fill colour.
  var gradient_Horiz_Flag = false;
  if (this.getTitleValue('GRADIENTDIR') == 'gradientH') {
	  gradient_Horiz_Flag = true;
  };
  var colour_from = Blockly.JavaScript.valueToCode(this, 'COLOURFROM', Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  var colour_to = Blockly.JavaScript.valueToCode(this, 'COLOURTO', Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Shape.setGradientFillColour(' + colour_from + ',' + colour_to + ',' + gradient_Horiz_Flag +', \'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_settextcolour = {
  // Block for setting the text colour.
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendTitle(BlocklyApps.getMsg('Shape_setTextColour'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_setTextColourTooltip'));
  }
};

Blockly.JavaScript.draw_settextcolour = function() {
  // Generate JavaScript for setting the stroke colour.
  var colour = Blockly.JavaScript.valueToCode(this, 'COLOUR', Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Shape.setTextColour(' + colour + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_setalphalevel = {
  // Block for setting the stroke width.
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendValueInput('ALPHA')
        .setCheck('Number')
        .appendTitle(BlocklyApps.getMsg('Shape_setAlphaLevel'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_setAlphaLevelTooltip'));
  }
};

Blockly.JavaScript.draw_setalphalevel = function() {
  // Generate JavaScript for setting the alpha level
  var alpha = Blockly.JavaScript.valueToCode(this, 'ALPHA',
      Blockly.JavaScript.ORDER_NONE) || '1.0';
  return 'Shape.setAlphaLevel(' + (Math.abs(alpha)/100.0) + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_erasebackground = {
  // Block for erasing the background.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Shape_eraseBackground'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_eraseBackgroundTooltip'));
  }
};

Blockly.JavaScript.draw_erasebackground = function() {
  // Erases the background using the current fill colour.
  return 'Shape.eraseBackground(' + '\'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_getcursorpos = {
  // Block for getting the cursors x or y position.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()    
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'POS');
    this.setOutput(true, "Number");
    this.setTooltip(BlocklyApps.getMsg('Shape_cursorPosTooltip'));
  }
};

Blockly.Language.draw_getcursorpos.STATE =
    [[BlocklyApps.getMsg('Shape_getCursorXPos'), 'getCursorXPos'],
    [BlocklyApps.getMsg('Shape_getCursorYPos'), 'getCursorYPos']];

Blockly.JavaScript.draw_getcursorpos = function() {
  // Generate JavaScript for returning the cursor x or y position.
   if (this.getTitleValue('POS')=='getCursorXPos') {
	  return ['Shape.xPos', Blockly.JavaScript.ORDER_MEMBER];
  } else {
	  return ['Shape.yPos', Blockly.JavaScript.ORDER_MEMBER];
  }
};

 Blockly.Language.draw_getcanvassize = {
  // Block for getting the canvas width of height.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()    
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'SIZE');
    this.setOutput(true, "Number");
    this.setTooltip(BlocklyApps.getMsg('Shape_canvasSizeTooltip'));
  }
};

Blockly.Language.draw_getcanvassize.STATE =
    [[BlocklyApps.getMsg('Shape_canvasWidth'), 'getCanvasWidth'],
     [BlocklyApps.getMsg('Shape_canvasHeight'), 'getCanvasHeight']];

Blockly.JavaScript.draw_getcanvassize = function() {
  // Generate JavaScript for returning the cursor x or y position.
   if (this.getTitleValue('SIZE')=='getCanvasWidth'){
	  return ['Shape.WIDTH', Blockly.JavaScript.ORDER_MEMBER];
  } else {
	  return ['Shape.HEIGHT', Blockly.JavaScript.ORDER_MEMBER];
  }
};
 
Blockly.Language.cursor_visibility = {
  // Block for changing drawing cursors visiblity.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'VISIBILITY');
    this.setTooltip(BlocklyApps.getMsg('Shape_cursorVisibilityTooltip'));
  }
};

Blockly.Language.cursor_visibility.STATE =
    [[BlocklyApps.getMsg('Shape_hideCursor'), 'hideCursor'],
     [BlocklyApps.getMsg('Shape_showCursor'), 'showCursor']];

Blockly.JavaScript.cursor_visibility = function() {
  // Generate JavaScript for changing drawing cursors visibility.
  return 'Shape.' + this.getTitleValue('VISIBILITY') +
      '(\'block_id_' + this.id + '\');\n';
};

Blockly.Language.draw_text = {
  // Block for drawing text.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('TEXT')
        .appendTitle(BlocklyApps.getMsg('Shape_drawText'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_drawTextTooltip'));
  }
};

Blockly.JavaScript.draw_text = function() {
  // Generate JavaScript for drawing text.
  var argument0 = String(Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'');
  return 'Shape.drawText(' + argument0 + ', \'block_id_' +
      this.id + '\');\n';
};

Blockly.Language.draw_font = {
  // Block for setting the font.
  helpUrl: BlocklyApps.getMsg('Shape_fontHelpUrl'),
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Shape_font'))
        .appendTitle(new Blockly.FieldDropdown(this.FONTLIST), 'FONT');
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Shape_fontSize'))
        .appendTitle(new Blockly.FieldTextInput('14',
                     Blockly.FieldTextInput.nonnegativeIntegerValidator),
                     'FONTSIZE');
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.STYLE), 'FONTSTYLE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Shape_fontTooltip'));
  }
};

Blockly.Language.draw_font.FONTLIST =
    // Common font names (intentionally not localized).
    [['Arial', 'Arial'], ['Courier New', 'Courier New'], ['Georgia', 'Georgia'],
     ['Impact', 'Impact'], ['Times New Roman', 'Times New Roman'],
     ['Trebuchet MS', 'Trebuchet MS'], ['Verdana', 'Verdana']];

Blockly.Language.draw_font.STYLE =
    [[BlocklyApps.getMsg('Shape_fontNormal'), 'normal'],
     [BlocklyApps.getMsg('Shape_fontItalic'), 'italic'],
     [BlocklyApps.getMsg('Shape_fontBold'), 'bold']];

Blockly.JavaScript.draw_font = function() {
  // Generate JavaScript for setting the font.
  return 'Shape.drawFont(\'' + this.getTitleValue('FONT') + '\',' +
      Number(this.getTitleValue('FONTSIZE')) + ',\'' +
      this.getTitleValue('FONTSTYLE') + '\', \'block_id_' +
      this.id + '\');\n';
};
