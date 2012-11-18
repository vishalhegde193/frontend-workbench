var PLD = window.PLD || {};
	
	PLD.prevYear = new Date().getFullYear();
	PLD.chkBoxClickCounter = 0;
	
	$(function() {
		var currQtr = '';
		var currYear = new Date().getFullYear();
		var yearRange = (currYear + 3);
		console.log('display years from:'+currYear+' to '+yearRange);
		$(".errorMessagePanel").hide();
		$(".jsErrorMessage").remove();
		var monthMapping = [
			'January',
			'February',			
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',			
			'October',
			'November',
			'December'
		];
		
		// Add the dropdown box and populate dropdown box values and populate quarter values
		var yearMonthSelector = $('<select id="yearMonthSelector">').appendTo(".controlBox");
		yearMonthSelector.css({"margin": "0",
							   "display" : "block",
							   "border" : "1px solid #000",
							   "padding" : "2px 0"
							  });
		for ( var yearIndex = currYear; yearIndex <= yearRange; yearIndex++) {
			$.each(monthMapping,function(key,element) {
				yearMonthSelector.append($("<option>").attr('value',parseInt(key+1)).text(element+' '+yearIndex));
			});
		}
		
		//Handle click event for dropdown box to get previous year information
		$("#yearMonthSelector").click(function() {
			if( typeof($("#yearMonthSelector").data('prevQtr')) == 'undefined') {
				$("#yearMonthSelector").data('prevYear',currYear);
			}
			var tempArr = ($("#yearMonthSelector").children("option:selected").text()).split(" ");			
			PLD.prevYear = tempArr[1];
		});
		
		// Handle dropdown box change event
		var mmDDArr = [];
		$("#yearMonthSelector").change(function() {
			$(".errorMessagePanel").hide();
			mmDDArr = ($("#yearMonthSelector").children("option:selected").text()).split(" ");
			currQtr = getQuarter(new Date(mmDDArr[1],$("#yearMonthSelector").children("option:selected").val(),"01"));
			if( typeof($("#yearMonthSelector").data('prevQtr')) == 'undefined') {
				$("#yearMonthSelector").data('prevQtr',currQtr);
			}
			$("#yearMonthSelector").data('prevQtr',currQtr);
			calculateNextQuarters(currQtr, mmDDArr[1]);
		});
		
		var chkBox;
		var controlDivs;
		var checkBoxContainer = $('<div id="checkBoxContainer"/>').appendTo(".controlBox");
		checkBoxContainer.css({"margin-top" : "22px"});
		// Add Check Boxes
		for(var i=1; i < 4; i++) {
			controlDiv = $('<div id="controlDiv' + i + '"/>').appendTo("#checkBoxContainer");
			controlDiv.css({'display' : 'block',
							'margin' : '12px 0 10px'});
			chkBox = $('<input type="checkbox" id="chkQtr' + i + '" value="chkQtr'+ i + '"> <label for="chkQtr'+ i +'" id="lblQtr' + i + '"> Q'+ (i+1) +' '+currYear+' </label>').appendTo("#controlDiv"+i);
			chkBox.css({'display' : 'inline',
			            'font-size' : '12px',
						'margin-left' : '0'
						});
			// Handle click event of checkboxes
			chkBox.change(function() {
				console.log($(this));
				_validateCheckBoxClick($(this));
			});
		}
		
		/* 	This method displays next quarters based on the Month and year selected from the select box */
		function calculateNextQuarters(currQtr,year) {
			var qtrArr = [1,2,3,4];
			var i = 1;
			for(var index = ((currQtr >= 4)? 0 : (qtrArr.indexOf(currQtr) + 1)); ;) {
				if (index < currQtr) {
					$("#lblQtr"+i).html('Q'+qtrArr[index]+' '+(parseInt(year)+1));
				} else {
					$("#lblQtr"+i).html('Q'+qtrArr[index]+' '+year);
				}
				i++;
				index = (index+1)%4;
				if(qtrArr[index] == currQtr) {
					break;
				}
			}
		}
		
		/* This method restricts users to select only two checkboxes in Section 3. Displays an error message as required */
		function _validateCheckBoxClick(checBoxObj) {
			if($(checBoxObj).attr("checked")) {
				PLD.chkBoxClickCounter++;
			} else {
				PLD.chkBoxClickCounter--;
			}
			if(PLD.chkBoxClickCounter > 2) {
				$(".errorMessagePanel").show();
				$(checBoxObj).attr("checked", false);
				PLD.chkBoxClickCounter--;
				return;
			} else {
				$(".errorMessagePanel").hide();
			}
		}
	});