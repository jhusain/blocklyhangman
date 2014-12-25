// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">See generated JavaScript code.</span><span id="linkTooltip">Save and link to blocks.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Run Program</span><span id="resetProgram">Reset</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">There was a problem with the request.</span><span id="linkAlert">Share your blocks with this link:\\n\\n%1</span><span id="hashError">Sorry, \'%1\' doesn\'t correspond with any saved program.</span><span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof shapepage == 'undefined') { var shapepage = {}; }


shapepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Word_Set">set</span><span id="Word_From">from</span><span id="Word_To">to</span><span id="Word_Width">width</span><span id="Word_Height">height</span><span id="Word_Draw">draw</span><span id="Word_Unfilled">unfilled</span><span id="Word_Filled">filled</span><span id="Shape_moveCursorToTooltip">Moves the drawing cursor to the x and y position.</span><span id="Shape_moveCursorTo">move cursor to</span><span id="Shape_drawLineToTooltip">Draws a line from the cursor position to the specifed x and y position.\\nThe drawing cursor postion will be moved to the lines end point.</span><span id="Shape_drawLineTo">draw line to</span><span id="Shape_drawPolygonTooltip">Draws a filled or unfilled polygon from a series of connected \'draw line to\' blocks.</span><span id="Shape_drawPolygon">polygon with</span><span id="Shape_drawPolygonLine">lines</span><span id="Shape_drawRectTooltip">Draws a filled or unfilled rectangle from the current cursor position\\nwith the specifed width and height.\\nNote that origin is the rectangles top/left point.</span><span id="Shape_drawRect">rectangle with</span><span id="Shape_drawEllipseTooltip">Draws a filled or unfilled ellipse at the current cursor postion with the specifed width and height radiuses.\\nNote that the origin is the ellipses center point.</span><span id="Shape_drawEllipse">ellipse with radius</span><span id="Shape_setLineWidthTooltip">Sets the line width for all future outline type drawings.</span><span id="Shape_setLineWidth">set line width to</span><span id="Shape_setLineColourTooltip">Sets the line colour for all future outline type drawings.</span><span id="Shape_setLineColour">set line colour to</span><span id="Shape_setSolidFillColourTooltip">Sets solid fill mode using the connected colour.\\nApplies to all future filled shapes.</span><span id="Shape_setSolidFillColour">set solid fill colour to</span><span id="Shape_setGradientFillDirectionTooltip">Sets gradient fill mode using the colour range.\\nApplies to all future filled shapes.</span><span id="Shape_setGradientFillVertical">vertical gradient fill</span><span id="Shape_setGradientFillHorizontal">horizontal gradient fill</span><span id="Shape_setTextColourTooltip">Set the text colour for all future drawn text.</span><span id="Shape_setTextColour">set text colour to</span><span id="Shape_setAlphaLevelTooltip">Sets the alpha level for all future drawings.\\n0 is fully transparent and 100 is fully opaque.</span><span id="Shape_setAlphaLevel">set alpha level to</span><span id="Shape_eraseBackgroundTooltip">Erases the background using the current fill method. This clears all existing drawings.</span><span id="Shape_eraseBackground">erase background</span><span id="Shape_cursorPosTooltip">Returns the drawing cursors x or y position.</span><span id="Shape_getCursorXPos">cursor X</span><span id="Shape_getCursorYPos">cursor Y</span><span id="Shape_canvasSizeTooltip">Returns the canvas width or height.</span><span id="Shape_canvasWidth">canvas width</span><span id="Shape_canvasHeight">canvas height</span><span id="Shape_cursorVisibilityTooltip">Makes the drawing cursor visible or invisible.</span><span id="Shape_hideCursor">hide drawing cursor</span><span id="Shape_showCursor">show drawing cursor</span><span id="Shape_drawTextTooltip">Draws text at the current cursor drawing position.\\nNote that the origin is the text strings bottom/left point.</span><span id="Shape_drawText">draw text</span><span id="Shape_fontHelpUrl">http://en.wikipedia.org/wiki/Font</span><span id="Shape_fontTooltip">Sets the font used by the print block.</span><span id="Shape_font">font</span><span id="Shape_fontSize">font size</span><span id="Shape_fontNormal">normal</span><span id="Shape_fontBold">bold</span><span id="Shape_fontItalic">italic</span><span id="Shape_unloadWarning">Leaving this page will result in the loss of your work.</span></div>';
};


shapepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return shapepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Shape Graphics</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select></td></tr></table><div id="visualization"><canvas id="scratch" width="400" height="400" style="display: none"></canvas><canvas id="display" width="400" height="400"></canvas></div><table style="padding-top: 1em;"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><script type="text/javascript" src="../slider.js"><\/script><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /><!-- Fast icon. --><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td style="width: 190px; text-align: center"><button id="runButton" class="primary" onclick="Shape.runButtonClick();" title="Makes the turtle do what the blocks say."><img src="../../media/1x1.gif" class="run icon21">Run Program</button><button id="resetButton" class="primary" onclick="Shape.resetButtonClick();" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Reset</button></td></tr></table><div id="toolbarDiv"><button class="notext" title="See generated JavaScript code." onclick="BlocklyApps.showCode(this);"><img src=\'../../media/1x1.gif\' class="code icon21"></button><button id="linkButton" class="notext" title="Save and link to blocks." onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link icon21"></button><button class="notext" id="captureButton" title="Save the drawing." onclick="Shape.createImageLink();"><img src=\'../../media/1x1.gif\' class="img icon21"></button><a id="downloadImageLink" download="drawing.png"></a></div><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + shapepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


shapepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="Shape"><block type="draw_movecursorto"><value name="XPOS"><block type="math_number"><title name="NUM">50</title></block></value><value name="YPOS"><block type="math_number"><title name="NUM">50</title></block></value></block><block type="draw_lineto"><value name="XPOS"><block type="math_number"><title name="NUM">150</title></block></value><value name="YPOS"><block type="math_number"><title name="NUM">150</title></block></value></block><block type="draw_rect"><value name="WIDTH"><block type="math_number"><title name="NUM">64</title></block></value><value name="HEIGHT"><block type="math_number"><title name="NUM">64</title></block></value></block><block type="draw_ellipse"><value name="RADWIDTH"><block type="math_number"><title name="NUM">32</title></block></value><value name="RADHEIGHT"><block type="math_number"><title name="NUM">32</title></block></value></block><block type="draw_setlinewidth"><value name="WIDTH"><block type="math_number"><title name="NUM">2</title></block></value></block><block type="draw_erasebackground"></block><block type="draw_polygon"></block><block type="draw_getcanvassize"></block><block type="cursor_visibility"></block></category><category name="Colour"><block type="draw_setlinecolour"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="draw_setsolidfillcolour"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="draw_setgradientfillcolour"><value name="COLOURFROM"><block type="colour_picker"></block></value><value name="COLOURTO"><block type="colour_picker"></block></value></block><block type="draw_settextcolour"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="draw_setalphalevel"><value name="ALPHA"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="colour_picker"></block><block type="colour_random"></block><block type="colour_rgb"></block></category><category name="Text"><block type="draw_text"><value name="TEXT"><block type="text"></block></value></block><block type="draw_font"></block></category><category name="Logic"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_ternary"></block></category><category name="Loops"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">10</title></block></value><value name="BY"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="Math"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><title name="NUM">1</title></block></value><value name="HIGH"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_float"></block></category><category name="Lists"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><title name="NUM">5</title></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><title name="VAR">list</title></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><title name="VAR">list</title></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><title name="VAR">list</title></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><title name="VAR">list</title></block></value></block></category><category name="Variables" custom="VARIABLE"></category><category name="Procedures" custom="PROCEDURE"></category></xml>';
};
