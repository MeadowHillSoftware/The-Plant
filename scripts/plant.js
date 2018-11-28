"use strict";

//Based on "The Plant" by Jason Morningstar

//The source code is released under the Apache License

//outline: 219x358 (4 pixels wide)
//card: 203x342

var oPlant = {};

oPlant.aCurrentCard = [];

oPlant.aDetails = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

oPlant.addMainEventListeners = function() {
    $('#body')
        .on('keypress', oPlant.handleKeypress);
};

oPlant.aHand = [];

oPlant.aPlacedCards = [];

oPlant.buildHand = function() {
    var aHand = ["rust card down.png", "rust card down.png", "rust card down.png"];
    var aNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var iSize = (oPlant.iPlantSize - 3);
    for (var i = 0; i < iSize; i++) {
        var iIndex = Math.round(Math.random() * (aNumbers.length - 1));
        var iFaceValue = aNumbers[iIndex];
        aNumbers.splice(iIndex, 1);
        var iCombo = Math.round(Math.random() * 23);
        var sCombo = "";
        if (iCombo === 0) {
            sCombo = "ABCD";
        } else if (iCombo === 1) {
            sCombo = "ABDC";
        } else if (iCombo === 2) {
            sCombo = "ACBD";
        } else if (iCombo === 3) {
            sCombo = "ACDB";
        } else if (iCombo === 4) {
            sCombo = "ADBC";
        } else if (iCombo === 5) {
            sCombo = "ADCB";
        } else if (iCombo === 6) {
            sCombo = "BACD";
        } else if (iCombo === 7) {
            sCombo = "BADC";
        } else if (iCombo === 8) {
            sCombo = "BCAD";
        } else if (iCombo === 9) {
            sCombo = "BCDA";
        } else if (iCombo === 10) {
            sCombo = "BDAC";
        } else if (iCombo === 11) {
            sCombo = "BDCA";
        } else if (iCombo === 12) {
            sCombo = "CABD";
        } else if (iCombo === 13) {
            sCombo = "CADB";
        } else if (iCombo === 14) {
            sCombo = "CBAD";
        } else if (iCombo === 15) {
            sCombo = "CBDA";
        } else if (iCombo === 16) {
            sCombo = "CDAB";
        } else if (iCombo === 17) {
            sCombo = "CDBA";
        } else if (iCombo === 18) {
            sCombo = "DABC";
        } else if (iCombo === 19) {
            sCombo = "DACB";
        } else if (iCombo === 20) {
            sCombo = "DBAC";
        } else if (iCombo === 21) {
            sCombo = "DBCA";
        } else if (iCombo === 22) {
            sCombo = "DCAB";
        } else if (iCombo === 23) {
            sCombo = "DCBA";
        }
        var sNumber = String(iFaceValue);
        if (sNumber.length === 1) {
            sNumber = "0" + sNumber;
        }
        var sCard = "rust card " + sNumber + sCombo + ".png";
        aHand.push(sCard);
    }
    oPlant.aHand = aHand;
};

oPlant.createColumn = function(iLeft, iRight) {
    var iMinX = oPlant.oParameters["x"][0];
    var iMaxX = oPlant.oParameters["x"][1];
    if (iLeft < iMinX) {
        var sDirection = "prepend";
        oPlant.oParameters["x"][0]--;
        var iNumber = iLeft;
    } else {
        var sDirection = "append";
        oPlant.oParameters["x"][1]++;
        var iNumber = iRight;
    }
    var iMinY = oPlant.oParameters["y"][0];
    var iMaxY = oPlant.oParameters["y"][1];
    var sTransparency = "images/plant card transparency.png";
    for (var i = iMinY; i < (iMaxY + 1); i++) {
        var sRowId = "row_" + String(i);
        var oRow = $(('#' + sRowId));
        var oCell = $('<td></td>');
        var sCellId = String(iNumber) + "_" + String(i);
        oCell.attr('id', sCellId);
        var oImage = $('<img></img>');
        oImage.attr('src', sTransparency);
        oCell.append(oImage);
        if (sDirection === "prepend") {
            oRow.prepend(oCell);
        } else {
            oRow.append(oCell);
        }
    }
};

oPlant.createRow = function(iNumber) {
    var oRow = $('<tr></tr>');
    var sNumber = String(iNumber);
    var sRowId = "row_" + sNumber;
    oRow.attr('id', sRowId);
    var iMinX = oPlant.oParameters["x"][0];
    var iMaxX = oPlant.oParameters["x"][1];
    var sTransparency = "images/plant card transparency.png";
    for (var i = iMinX; i < (iMaxX + 1); i++) {
        var oCell = $('<td></td>');
        var sCellId = String(i) + "_" + sNumber;
        oCell.attr('id', sCellId);
        var oImage = $('<img></img>');
        oImage.attr('src', sTransparency);
        oCell.append(oImage);
        oRow.append(oCell);
    }
    return oRow;
};

oPlant.createTextArea = function() {
    var aQuestionless = ["19", "20"];
    var bTextArea = false;
    var sSection = oPlant.sSection;
    var aParts = sSection.split(" ");
    var sEnd = aParts[1];
    aParts = sEnd.split(".");
    var sNumber = aParts[0];
    if (aQuestionless.indexOf(sNumber) === -1) {
        bTextArea = true;
    }
    if (bTextArea === true) {
        var oSpan = $('<span>Type in your answer:</span>');
        var oBreak = $('</br>');
        var oTextArea = $('<textarea/>');
        oTextArea.attr('id', 'text-area');
        var oBreak2 = $('</br>');
        var oButton = $('<button/>');
        oButton.attr('id', 'enter-button');
        oButton.text('Enter');
        oButton.on('click', oPlant.handleEnterButton);
        var oTextDiv = $('<div></div>');
        oTextDiv.attr('id', 'text-div');
        oTextDiv.append(oSpan);
        oTextDiv.append(oBreak);
        oTextDiv.append(oTextArea);
        oTextDiv.append(oBreak2);
        oTextDiv.append(oButton);
        var oSectionDiv = $('#section-div');
        oSectionDiv.append(oTextDiv);
        oTextArea.focus();
    }
};

oPlant.createTotals = function() {
    var sAnger = String(oPlant.iAnger);
    var sFear = String(oPlant.iFear);
    var sAngerImage = "images/" + sAnger + "-text.png";
    var sFearImage = "images/" + sFear + "-text.png";
    var oRow1 = $('<tr></tr>');
    var oCell1 = $('<td></td>');
    var oImage1 = $('<img></img>');
    oImage1.attr('src', 'images/anger-text.png');
    oCell1.append(oImage1);
    oRow1.append(oCell1);
    var oCell2 = $('<td></td>');
    var oImage2 = $('<img></img>');
    oImage2.attr('src', sAngerImage);
    oCell2.append(oImage2);
    oRow1.append(oCell2);
    var oRow2 = $('<tr></tr>');
    var oCell3 = $('<td></td>');
    var oImage3 = $('<img></img>');
    oImage3.attr('src', 'images/fear-text.png');
    oCell3.append(oImage3);
    oRow2.append(oCell3);
    var oCell4 = $('<td></td>');
    var oImage4 = $('<img></img>');
    oImage4.attr('src', sFearImage);
    oCell4.append(oImage4);
    oRow2.append(oCell4);
    var oTable = $('<table></table>');
    oTable.attr('id', 'emotion-table');
    oTable.append(oRow1);
    oTable.append(oRow2);
    var oDiv = $('#section-div');
    oDiv.append(oTable);
};

oPlant.determineEnding = function(bEdge) {
    if (bEdge) {
        var iIndex = 0;
    } else {
        var iIndex = 1;
    }
    if (oPlant.iAnger > oPlant.iFear) {
        var sEmotion = "a";
    } else if (oPlant.iFear > oPlant.iAnger) {
        var sEmotion = "f";
    } else {
        if (oPlant.sRecent === "a") {
            var sEmotion = "a";
        } else if (oPlant.sRecent === "f") {
            var sEmotion = "f";
        } else {
            var iNumber = Math.round(Math.random() * 5);
            iNumber++;
            if (iNumber < 4) {
                var sEmotion = "a";
            } else {
                var sEmotion = "f";
            }
        }
    }
    var iEnding = oPlant.oEndings[sEmotion][iIndex];
    var sSection = "section " + String(iEnding) + ".png";
    oPlant.sCard = sSection;
    var sSource = "images/" + sSection;
    var oImage = $('#section-image');
    oImage.attr('src', sSource);
};

oPlant.drawCard = function() {
    var sCard = oPlant.selectCard();
    var sSource = "images/" + sCard;
    var aLastCard = oPlant.aPlacedCards[(oPlant.aPlacedCards.length - 1)];
    var iX = aLastCard[1];
    var iY = aLastCard[2];
    var sSelector = "#" + String(iX) + "_" + String(iY);
    var oCell = $(sSelector);
    var oImages = oCell.find('img');
    var oImg = oImages[0];
    oImg = $(oImg);
    oImg.attr('src', sSource);
    oPlant.aCurrentCard = [sCard, iX, iY];
};

oPlant.firstCard = function() {
    oPlant.buildHand();
    var sCard = oPlant.selectCard();
    var sTransparency = "images/plant card transparency.png";
    var oTable = $('#card-table');
    var oRow = $('<tr></tr>');
    oRow.attr('id', 'row_1');
    var oCell = $('<td></td>');
    oCell.attr('id', '-1_1');
    var oImage = $('<img></img>');
    oImage.attr('src', sTransparency);
    oCell.append(oImage);
    oRow.append(oCell);
    var oCell = $('<td></td>');
    oCell.attr('id', '0_1');
    var oImage = $('<img></img>');
    oImage.attr('src', sTransparency);
    oCell.append(oImage);
    oRow.append(oCell);
    var oCell = $('<td></td>');
    oCell.attr('id', '1_1');
    var oImage = $('<img></img>');
    oImage.attr('src', sTransparency);
    oCell.append(oImage);
    oRow.append(oCell);
    oTable.append(oRow);
    var oRow = $('<tr></tr>');
    oRow.attr('id', 'row_0');
    var oCell = $('<td></td>');
    oCell.attr('id', '-1_0');
    var oImage = $('<img></img>');
    oImage.attr('src', sTransparency);
    oCell.append(oImage);
    oRow.append(oCell);
    var oCell = $('<td></td>');
    oCell.attr('id', '0_0');
    var sSource = "images/" + sCard;
    var oImage = $('<img></img>');
    oImage.attr('id', 'card_0');
    oImage.attr('src', sSource);
    oCell.append(oImage);
    oRow.append(oCell);
    var oCell = $('<td></td>');
    oCell.attr('id', '1_0');
    var oImage = $('<img></img>');
    oImage.attr('src', sTransparency);
    oCell.append(oImage);
    oRow.append(oCell);
    oTable.append(oRow);
    var oRow = $('<tr></tr>');
    oRow.attr('id', 'row_-1');
    var oCell = $('<td></td>');
    oCell.attr('id', '-1_-1');
    var oImage = $('<img></img>');
    oImage.attr('src', sTransparency);
    oCell.append(oImage);
    oRow.append(oCell);
    var oCell = $('<td></td>');
    oCell.attr('id', '0_-1');
    var oImage = $('<img></img>');
    oImage.attr('src', sTransparency);
    oCell.append(oImage);
    oRow.append(oCell);
    var oCell = $('<td></td>');
    oCell.attr('id', '1_-1');
    var oImage = $('<img></img>');
    oImage.attr('src', sTransparency);
    oCell.append(oImage);
    oRow.append(oCell);
    oTable.append(oRow);
    oPlant.aPlacedCards.push([sCard, 0, 0]);
    oPlant.getSection();
};

oPlant.getDetailCard = function() {
    var aDetails = oPlant.aDetails;
    var iIndex = Math.round(Math.random() * (aDetails.length - 1));
    var sCard = aDetails[iIndex];
    aDetails.splice(iIndex, 1);
    sCard = "detail card " + sCard + ".png";
    return sCard;
};

oPlant.getLetter = function(sCard, iLetter) {
    var sLetter = "";
    if (sCard.indexOf("down") === -1) {
        var aParts = sCard.split(" ");
        var sDesignation = aParts[2];
        var sLetters = sDesignation.slice(2, 6);
        iLetter--;
        var sLetter = sLetters.slice(iLetter, (iLetter + 1));
    }
    return sLetter;
};

oPlant.getSection = function() {
    var iText = oPlant.iText;
    var aLastCard = oPlant.aPlacedCards[(oPlant.aPlacedCards.length - 1)];
    var sFile = aLastCard[0];
    var oSectionDiv = $('#section-div');
    if (sFile === "rust card down.png") {
        oPlant.iText = 0;
        iText = 0;
        //oSectionDiv.removeClass('hidden');
        if (oPlant.aHand.length === 0) {
            oPlant.determineEnding(false);
        }
    } else {
        var aParts = sFile.split(" ");
        var sLastPart = aParts[2];
        var sNumber = sLastPart.slice(0, 2);
        var a2nd = ["detail", "12", "13", "15", "16", "17", "18", "19", "20", "21", "22", "25", "27", "29", "30", "31"];
        var oImage = $('#section-image');
        if (iText === 0) {
            var sSection = "section " + sNumber + ".png";
            var sSource = "images/" + sSection;
            oImage.attr('src', sSource);
            oPlant.iText = 1;
            oSectionDiv.removeClass('hidden');
        } else if (iText === 1) {
            var iNumber = Number(sNumber);
            var aSections = oPlant.oCardPaths[iNumber][0];
            if (aSections.length === 0) {
                var iSecond = oPlant.oCardPaths[iNumber][1][0];
                var sEmotion = oPlant.oResults[iNumber][0];
            } else {
                if (oPlant.aPlacedCards.length === 1) {
                    var sLetters = oPlant.getLetter(sFile, 3);
                } else {
                    var aPenultimateCard = oPlant.aPlacedCards[(oPlant.aPlacedCards.length - 2)];
                    var sPenCard = aPenultimateCard[0];
                    var iLastX = aLastCard[1];
                    var iLastY = aLastCard[2];
                    var iPenX = aPenultimateCard[1];
                    var iPenY = aPenultimateCard[2];
                    if (iLastX === iPenX) {
                        if (iLastY > iPenY) {
                            var sLetters = oPlant.getLetter(sPenCard, 1);
                            sLetters += oPlant.getLetter(sFile, 3);
                        } else {
                            var sLetters = oPlant.getLetter(sPenCard, 3);
                            sLetters += oPlant.getLetter(sFile, 1);
                        }
                    } else {
                        if (iLastX > iPenX) {
                            var sLetters = oPlant.getLetter(sPenCard, 2);
                            sLetters += oPlant.getLetter(sFile, 4);
                        } else {
                            var sLetters = oPlant.getLetter(sPenCard, 4);
                            sLetters += oPlant.getLetter(sFile, 2);
                        }
                    }
                }
                var aEdges = oPlant.oCardPaths[iNumber][0];
                var bEdge = false;
                for (var i = 0; i < aSections.length; i++) {
                    var sEdge = aEdges[i];
                    if (sLetters.indexOf(sEdge) !== -1) {
                        bEdge = true;
                    }
                }
                if (bEdge === true) {
                    var iSecond = oPlant.oCardPaths[iNumber][1][0];
                    var sEmotion = oPlant.oResults[iNumber][0];
                } else {
                    var iSecond = oPlant.oCardPaths[iNumber][1][1];
                    var sEmotion = oPlant.oResults[iNumber][1];
                }
            }
            if (oPlant.aHand.length !== 0) {
                var sSection = "section " + String(iSecond) + ".png";
                var a3rd = [11, 14, 23, 24, 26, 28, 32];
                oPlant.sSection = sSection;
                if (a3rd.indexOf(iSecond) !== -1) {
                    var sCard = oPlant.getDetailCard();
                } else if (iSecond === 27) {
                    var sCard = "section 27a.png";
                    oPlant.sSection = sCard;
                    oPlant.createTextArea();
                } else {
                    var sCard = sSection;
                    oPlant.createTextArea();
                }
                var sSource = "images/" + sCard;
                oImage.attr('src', sSource);
                oPlant.iText = 2;
                oPlant.handleEmotion(sEmotion);
            } else {
                oPlant.determineEnding(bEdge);
                oPlant.iText = 0;
            }
        } else if (iText === 2) {
            var oImage = $('#section-image');
            var sSource = oImage.attr('src');
            if (sSource.indexOf("detail") !== -1) {
                var sCard = "images/" + oPlant.sSection;
                oImage.attr('src', sCard);
                oPlant.createTextArea();
                oPlant.iText = 3;
            } else if (oPlant.sSection === "section 27a.png") {
                var sSection = "section 27b.png";
                oPlant.sSection = sSection;
                var sCard = "images/" + sSection;
                oImage.attr('src', sCard);
                oPlant.createTextArea();
                oPlant.iText = 3;
            } else {
                var sCard = "images/" + oPlant.sEmotion;
                oImage.attr('src', sCard);
                oPlant.iText = 3;
            }
        } else if (iText === 3) {
            var oImage = $('#section-image');
            var sSource = oImage.attr('src')
            if (sSource.indexOf("section") !== -1) {
                var sCard = "images/" + oPlant.sEmotion;
                oImage.attr('src', sCard);
                oPlant.iText = 4;
            } else {
                oImage.removeAttr('src');
                oPlant.createTotals();
                oPlant.iText = 4;
            }
        } else if (iText === 4) {
            var oTable = $('#emotion-table');
            if (oTable.length !== 0) {
                oTable.remove();
                oPlant.iText = 0;
                oSectionDiv.addClass('hidden');
            } else {
                var oImage = $('#section-image');
                oImage.removeAttr('src');
                oPlant.createTotals();
                oPlant.iText = 5;
            }
        } else if (iText === 5) {
            var oTable = $('#emotion-table');
            oTable.remove();
            oPlant.iText = 0;
            oSectionDiv.addClass('hidden');
        }
    }
};

oPlant.handleEmotion = function(sEmotion) {
    var sText = "";
    if (sEmotion === "a") {
        oPlant.iAnger++;
        oPlant.sRecent = "a";
        sText = "anger.png"
    } else if (sEmotion === "f") {
        oPlant.iFear++;
        oPlant.sRecent = "f";
        sText = "fear-1.png"
    } else if (sEmotion === "af") {
        oPlant.iAnger++;
        oPlant.iFear++;
        oPlant.sRecent = "";
        sText = "anger & fear.png"
    } else if (sEmotion === "ff") {
        oPlant.iFear += 2;
        oPlant.sRecent = "f";
        sText = "fear-2.png"
    } else if (sEmotion === "h") {
        if (oPlant.iAnger > oPlant.iFear) {
            oPlant.iAnger++;
            oPlant.sRecent = "a";
            sText = "anger-higher.png"
        } else if (oPlant.iFear > oPlant.iAnger) {
            oPlant.iFear++;
            oPlant.sRecent = "f";
            sText = "fear-higher.png"
        } else {
            if (oPlant.sRecent === "a") {
                oPlant.iAnger++;
                sText = "anger-recent.png"
            } else if (oPlant.sRecent === "f") {
                oPlant.iFear++;
                sText = "fear-recent.png"
            } else {
                oPlant.iAnger++;
                oPlant.iFear++;
                sText = "anger & fear.png"
            }
        }
    } else {
        sText = "neither.png"
    }
    oPlant.sEmotion = sText;
};

oPlant.handleEnterButton = function(event) {
    var sKey = event.key;
    event.stopPropagation();
    var sText = $('#text-area').val();
    $('#text-div').remove();
};

oPlant.handleKeypress = function(event) {
    var sKey = event.key;
    event.stopPropagation();
    var bUnplacedCard = false;
    if (oPlant.aCurrentCard.length !== 0) {
        bUnplacedCard = true;
    }
    var oTextDiv = $('#text-div');
    var oTable = $('#emotion-table');
    if (oTextDiv.length === 0) {
        if (sKey === "d" && oTable.length === 0) {
            if (oPlant.aPlacedCards.length === 0) {
                oPlant.firstCard();
            } else if (bUnplacedCard === false && oPlant.aHand.length > 0) {
                oPlant.drawCard();
            }
        } else if (sKey === "ArrowDown") {
            if (bUnplacedCard === true) {
                oPlant.moveCard(sKey);
            }
        } else if (sKey === "ArrowLeft") {
            if (bUnplacedCard === true) {
                oPlant.moveCard(sKey);
            }
        } else if (sKey === "ArrowRight") {
            if (bUnplacedCard === true) {
                oPlant.moveCard(sKey);
            }
        } else if (sKey === "ArrowUp") {
            if (bUnplacedCard === true) {
                oPlant.moveCard(sKey);
            }
        } else if (sKey === "Enter") {
            if (bUnplacedCard === true) {
                oPlant.placeCard();
                oPlant.getSection();
            } else if (bUnplacedCard === false) {
                if (oPlant.iText !== 0 && oPlant.aPlacedCards.length !== 0) {
                    oPlant.getSection();
                }
            }
        }
    }
};

oPlant.iAnger = 0;

oPlant.iFear = 0;

oPlant.iPlantSize = 10;

oPlant.iText = 0;

oPlant.moveCard = function(sKey) {
    var aLastCard = oPlant.aPlacedCards[(oPlant.aPlacedCards.length - 1)];
    var iLastX = aLastCard[1];
    var iLastY = aLastCard[2];
    if (sKey === "ArrowDown") {
        var iNewY = (iLastY - 1);
        var iNewX = iLastX;
    } else if (sKey === "ArrowLeft") {
        var iNewX = (iLastX - 1);
        var iNewY = iLastY;
    } else if (sKey === "ArrowRight") {
        var iNewX = (iLastX + 1);
        var iNewY = iLastY;
    } else if (sKey === "ArrowUp") {
        var iNewY = (iLastY + 1);
        var iNewX = iLastX;
    }
    var aCurrentCard = oPlant.aCurrentCard;
    var iCurrentX = aCurrentCard[1];
    var iCurrentY = aCurrentCard[2];
    if (iNewX !== iCurrentX || iNewY !== iCurrentY) {
        var sNewId = String(iNewX) + "_" + String(iNewY);
        var sNewSelector = "#" + sNewId;
        var oNewCell = $(sNewSelector);
        var oNewImage = oNewCell.find('img');
        oNewImage = $(oNewImage[0]);
        var sNewSource = oNewImage.attr('src');
        if (sNewSource === "images/plant card transparency.png") {
            var sCurrentCard = aCurrentCard[0];
            var sCurrentSource = "images/" + sCurrentCard;
            oNewImage.attr('src', sCurrentSource);
            var sCurrentId = String(iCurrentX) + "_" + String(iCurrentY);
            oPlant.aCurrentCard[1] = iNewX;
            oPlant.aCurrentCard[2] = iNewY;
            if (iCurrentX === iLastX && iCurrentY === iLastY) {
                var sLastCard = aLastCard[0];
                var sLastSource = "images/" + sLastCard;
                var sLastId = String(iLastX) + "_" + String(iLastY);
                var sLastSelector = "#" + sLastId;
                var oLastCell = $(sLastSelector);
                var oLastImage = oLastCell.find('img');
                oLastImage = $(oLastImage[0]);
                oLastImage.attr('src', sLastSource);
            } else {
                var sCurrentSelector = "#" + sCurrentId;
                var oCurrentCell = $(sCurrentSelector);
                var oCurrentImage = oCurrentCell.find('img');
                oCurrentImage = $(oCurrentImage[0]);
                oCurrentImage.attr('src', sNewSource);
            }
        }
    }
};

oPlant.oCardPaths = {1: [["A", "B"], [15, 24]], 2: [["A", "C"], 
    [12, 23]], 3: [["B", "C"], [27, 20]], 4: [["B", "D"], [14, 18]], 
    5: [["A", "D"], [25, 11]], 6: [[], [19]], 7: [["C", "D"], [28, 16]], 
    8: [[], [27]], 9: [["A", "D"], [26, 29]], 10: [["B", "C"], 
    [30, 32]]};

oPlant.oEndings = {"a": [31, 22], "f": [13, 17]};
    
oPlant.oParameters = {"x": [-1, 1], "y": [-1, 1]};

oPlant.oResults = {1: ["f", "a"], 2: ["a", "ff"], 3: ["af", "f"], 4: 
    ["a", "f"], 5: ["f", "a"], 6: ["-", "-"], 7: ["a", "a"], 8: 
    ["af", "af"], 9: ["f", "a"], 10: ["f", "h"]};

oPlant.placeCard = function() {
    var aLastCard = oPlant.aPlacedCards[(oPlant.aPlacedCards.length - 1)];
    var iLastX = aLastCard[1];
    var iLastY = aLastCard[2];
    var aCurrentCard = oPlant.aCurrentCard;
    var iCurrentX = aCurrentCard[1];
    var iCurrentY = aCurrentCard[2];
    if (iCurrentX !== iLastX || iCurrentY !== iLastY) {
        var sCellId = String(iCurrentX) + "_"  + String(iCurrentY);
        var sSelector = "#" + sCellId;
        var oCell = $(sSelector);
        var oImage = oCell.find('img');
        oImage = $(oImage[0]);
        var iCurrent = oPlant.aPlacedCards.length;
        var sImageId = "card_" + String(iCurrent);
        oImage.attr('id', sImageId);
        var iDown = iCurrentY - 1;
        var iLeft = iCurrentX - 1;
        var iRight = iCurrentX + 1;
        var iUp = iCurrentY + 1;
        var iMinX = oPlant.oParameters["x"][0];
        var iMaxX = oPlant.oParameters["x"][1];
        var iMinY = oPlant.oParameters["y"][0];
        var iMaxY = oPlant.oParameters["y"][1];
        if (iDown < iMinY) {
            var oRow = oPlant.createRow(iDown);
            var oTable = $('#card-table');
            oTable.append(oRow);
            oPlant.oParameters["y"][0]--;
        } else if (iUp > iMaxY) {
            var oRow = oPlant.createRow(iUp);
            var oTable = $('#card-table');
            oTable.prepend(oRow);
            oPlant.oParameters["y"][1]++;
        } else if (iLeft < iMinX || iRight > iMaxX) {
            oPlant.createColumn(iLeft, iRight);
        }
        oPlant.aPlacedCards.push(aCurrentCard);
        oPlant.aCurrentCard = [];
    }
};

oPlant.selectCard = function() {
    var aHand = oPlant.aHand;
    var iIndex = Math.round(Math.random() * (aHand.length - 1));
    var sCard = aHand[iIndex];
    aHand.splice(iIndex, 1);
    return sCard;
};

oPlant.sEmotion = "";

oPlant.sRecent = "";

oPlant.sSection = "";

oPlant.addMainEventListeners();
