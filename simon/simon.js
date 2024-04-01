document.addEventListener("DOMContentLoaded", () => {
	
	const colorPadColorsSelected = ["#6E9370", "#936E6E", "#92936E", "#6E7F93"];
	const colorPadColors = ["#4E9D4D", "#A22323", "#C6A42D", "#2E4995"];
	
	// START *********************************************
	let strict = false;
	let power = false;
	let count = 0;
	let arr = [];
	let current = 0;
	let audio;
	
	checkTurn();
	
	document.querySelector("#strict-btn-display").style.backgroundColor = "#471313";
	document.querySelector("#count").innerHTML = "--";
	document.querySelector("#count").style.color = "#8E2626";
	document.querySelector("#green").style.backgroundColor = "#4E9D4D";
	document.querySelector("#red").style.backgroundColor = "#A22323";
	document.querySelector("#yellow").style.backgroundColor = "#C6A42D";
	document.querySelector("#blue").style.backgroundColor = "#2E4995";
	
	// UPDATE **********************************************
	document.querySelector("#power-btn").addEventListener("click", () => {
		if(power) {
			strict = false;
			power = false;
			count = 0;
			arr = [];
			current = 0;

			document.querySelector("#strict-btn-display").style.backgroundColor = "#471313";
			document.querySelector("#count").innerHTML = "--";
			document.querySelector("#count").style.color = "#8E2626";
			document.querySelector("#power-btn").style.marginLeft = "-1.5rem";
			document.querySelector("#green").style.backgroundColor = "#4E9D4D";
			document.querySelector("#red").style.backgroundColor = "#A22323";
			document.querySelector("#yellow").style.backgroundColor = "#C6A42D";
			document.querySelector("#blue").style.backgroundColor = "#2E4995";
		} else {
			power = true;
			count = 0;
			arr = [];
			current = 0;
			
			if(strict) {
				document.querySelector("#strict-btn-display").style.backgroundColor = "#C51E1E"
			} else {
				document.querySelector("#strict-btn-display").style.backgroundColor = "#471313";
			}
			
			document.querySelector("#count").innerHTML = "--";
			document.querySelector("#count").style.color = "#C51E1E";
			document.querySelector("#power-btn").style.marginLeft = "0";
		}
	});
	document.querySelector("#strict-btn").addEventListener("click", () => {
		if(!power || strict) {
			strict = false;
			
			document.querySelector("#strict-btn-display").style.backgroundColor = "#471313";
		} else if(!strict && power) {
			strict = true;
			
			document.querySelector("#strict-btn-display").style.backgroundColor = "#C51E1E";
		}
	});
	document.querySelector("#strict-btn").addEventListener("mousedown", () => {
		document.querySelector("#strict-btn").style.marginTop = "7.7rem";
		document.querySelector("#strict-btn").style.boxShadow = "none";
	});
	document.querySelector("#strict-btn").addEventListener("mouseup", () => {
		document.querySelector("#strict-btn").style.marginTop = "7.5rem";
		document.querySelector("#strict-btn").style.boxShadow = "0 0.2rem 0.5rem black";
	});
	document.querySelector("#start-btn").addEventListener("click", () => {
		count = 0;
		arr = [];
		current = 0;

		document.querySelector("#count").innerHTML = "--";
		document.querySelector("#green").style.backgroundColor = "#4E9D4D";
		document.querySelector("#red").style.backgroundColor = "#A22323";
		document.querySelector("#yellow").style.backgroundColor = "#C6A42D";
		document.querySelector("#blue").style.backgroundColor = "#2E4995";
		
		if(power) {
			runGame();
		}
	});
	document.querySelector("#start-btn").addEventListener("mousedown", () => {
		document.querySelector("#start-btn").style.marginTop = "7.7rem";
		document.querySelector("#start-btn").style.boxShadow = "none";
	});
	document.querySelector("#start-btn").addEventListener("mouseup", () => {
		document.querySelector("#start-btn").style.marginTop = "7.5rem";
		document.querySelector("#start-btn").style.boxShadow = "0 0.2rem 0.5rem black";
	});
	
	
	
	
	
	function runGame() {
		if(power) {
			count++;
			
			if(count === 0) {
				document.querySelector("#count").innerHTML = "--";
			} else if(count < 10) {
				document.querySelector("#count").innerHTML = `0${count}`;
			} else {
				document.querySelector("#count").innerHTML = count;
			}
			
			arr.push(Math.floor(Math.random() * 4));
		
			for(let i = 1; i <= arr.length; i++) {
				setTimeout(() => {
					if(power) {
						document.querySelector(`.color-pad-${arr[i - 1] + 1}`).style.backgroundColor = colorPadColorsSelected[arr[i - 1]];
					}
				}, (i - 1) * 1200 + 400);
				
				setTimeout(() => {
							document.querySelector(`.color-pad-${arr[i - 1] + 1}`).style.backgroundColor = colorPadColors[arr[i - 1]];
				}, i * 1200);
			}
		}
	}
	
	
	
	
	
	function checkTurn() {
			document.querySelector("#green").addEventListener("click", () => {
				if(power) {
					audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
					audio.volume = 0.8;
					audio.play();
					
					document.querySelector("#green").style.backgroundColor = colorPadColorsSelected[0];
					
					setTimeout(() => {
						document.querySelector("#green").style.backgroundColor = colorPadColors[0];
					}, 400);
					
					if(arr[current] === 0) {
						if(current < 19) {
							if(current < arr.length - 1) {
								current++;
							} else {
								current = 0;
								runGame();
							}
						} else {
							gameWon();
						}
					} else {
						if(strict) {
							current = 0;
							count = 0;
							arr = [];
							
							if(count === 0) {
								document.querySelector("#count").innerHTML = "--";
							} else if(count < 10) {
								document.querySelector("#count").innerHTML = `0${count}`;
							} else {
								document.querySelector("#count").innerHTML = count;
							}
					
							document.querySelector("#count").innerHTML = "!!";
							
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 400);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 800);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 1200);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 1600);
							
							setTimeout(() => {
								document.querySelector("#count").innerHTML = "--";
								runGame();
							}, 2000);
						} else {
							current = 0;
							
							document.querySelector("#count").innerHTML = "!!";
							
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 400);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 800);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 1200);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 1600);
							
							setTimeout(() => {
								if(count === 0) {
									document.querySelector("#count").innerHTML = "--";
								} else if(count < 10) {
									document.querySelector("#count").innerHTML = `0${count}`;
								} else {
									document.querySelector("#count").innerHTML = count;
								}
								
								repeatGame();
							}, 2000);
						}
					}
				}
			});
			document.querySelector("#red").addEventListener("click", () => {
				if(power) {
					audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
					audio.volume = 0.8;
					audio.play();
					
					document.querySelector("#red").style.backgroundColor = colorPadColorsSelected[1];
					
					setTimeout(() => {
						document.querySelector("#red").style.backgroundColor = colorPadColors[1];
					}, 400);
					
					if(arr[current] === 1) {
						if(current < 19) {
							if(current < arr.length - 1) {
								current++;
							} else {
								current = 0;
								runGame();
							}
						} else {
							gameWon();
						}
					} else {
						if(strict) {
							current = 0;
							count = 0;
							arr = [];
							
							if(count === 0) {
								document.querySelector("#count").innerHTML = "--";
							} else if(count < 10) {
								document.querySelector("#count").innerHTML = `0${count}`;
							} else {
								document.querySelector("#count").innerHTML = count;
							}
					
							document.querySelector("#count").innerHTML = "!!";
							
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 400);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 800);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 1200);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 1600);
							
							setTimeout(() => {
								document.querySelector("#count").innerHTML = "--";
								runGame();
							}, 2000);
						} else {
							current = 0;
							
							document.querySelector("#count").innerHTML = "!!";
							
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 400);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 800);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 1200);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 1600);
							
							setTimeout(() => {
								if(count === 0) {
									document.querySelector("#count").innerHTML = "--";
								} else if(count < 10) {
									document.querySelector("#count").innerHTML = `0${count}`;
								} else {
									document.querySelector("#count").innerHTML = count;
								}
								
								repeatGame();
							}, 2000);
						}
					}
				}
			});
			document.querySelector("#yellow").addEventListener("click", () => {
				if(power) {
					audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
					audio.volume = 0.8;
					audio.play();
					
					document.querySelector("#yellow").style.backgroundColor = colorPadColorsSelected[2];
					
					setTimeout(() => {
						document.querySelector("#yellow").style.backgroundColor = colorPadColors[2];
					}, 400);
					
					if(arr[current] === 2) {
						if(current < 19) {
							if(current < arr.length - 1) {
								current++;
							} else {
								current = 0;
								runGame();
							}
						} else {
							gameWon();
						}
					} else {
						if(strict) {
							current = 0;
							count = 0;
							arr = [];
							
							if(count === 0) {
								document.querySelector("#count").innerHTML = "--";
							} else if(count < 10) {
								document.querySelector("#count").innerHTML = `0${count}`;
							} else {
								document.querySelector("#count").innerHTML = count;
							}
					
							document.querySelector("#count").innerHTML = "!!";
							
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 400);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 800);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 1200);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 1600);
							
							setTimeout(() => {
								document.querySelector("#count").innerHTML = "--";
								runGame();
							}, 2000);
						} else {
							current = 0;
							
							document.querySelector("#count").innerHTML = "!!";
							
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 400);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 800);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 1200);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 1600);
							
							setTimeout(() => {
								if(count === 0) {
									document.querySelector("#count").innerHTML = "--";
								} else if(count < 10) {
									document.querySelector("#count").innerHTML = `0${count}`;
								} else {
									document.querySelector("#count").innerHTML = count;
								}
								
								repeatGame();
							}, 2000);
						}
					}
				}
			});
			document.querySelector("#blue").addEventListener("click", () => {
				if(power) {
					audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
					audio.volume = 0.8;
					audio.play();
					
					document.querySelector("#blue").style.backgroundColor = colorPadColorsSelected[3];
					
					setTimeout(() => {
						document.querySelector("#blue").style.backgroundColor = colorPadColors[3];
					}, 400);
					
					if(arr[current] === 3) {
						if(current < 19) {
							if(current < arr.length - 1) {
								current++;
							} else {
								current = 0;
								runGame();
							}
						} else {
							gameWon();
						}
					} else {
						if(strict) {
							current = 0;
							count = 0;
							arr = [];
							
							if(count === 0) {
								document.querySelector("#count").innerHTML = "--";
							} else if(count < 10) {
								document.querySelector("#count").innerHTML = `0${count}`;
							} else {
								document.querySelector("#count").innerHTML = count;
							}
					
							document.querySelector("#count").innerHTML = "!!";
							
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 400);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 800);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 1200);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 1600);
							
							setTimeout(() => {
								document.querySelector("#count").innerHTML = "--";
								runGame();
							}, 2000);
						} else {
							current = 0;
							
							document.querySelector("#count").innerHTML = "!!";
							
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 400);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 800);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#8E2626";
							}, 1200);
							setTimeout(() => {
								document.querySelector("#count").style.color = "#C51E1E";
							}, 1600);
							
							setTimeout(() => {
								if(count === 0) {
									document.querySelector("#count").innerHTML = "--";
								} else if(count < 10) {
									document.querySelector("#count").innerHTML = `0${count}`;
								} else {
									document.querySelector("#count").innerHTML = count;
								}
								
								repeatGame();
							}, 2000);
						}
					}
				}
			});
	}
	
	
	
	
	
	function gameWon() {
		document.querySelector("#count").innerHTML = "WIN";
		
		setTimeout(() => {
			document.querySelector("#count").style.color = "#8E2626";
		}, 400);
		setTimeout(() => {
			document.querySelector("#count").style.color = "#C51E1E";
		}, 800);
		setTimeout(() => {
			document.querySelector("#count").style.color = "#8E2626";
		}, 1200);
		setTimeout(() => {
			document.querySelector("#count").style.color = "#C51E1E";
		}, 1600);
		
		setTimeout(() => {
			document.querySelector("#count").innerHTML = "--";
			power = false;
		}, 2000);
	}
	
	
	
	
	
	function repeatGame() {
		if(power) {
			if(count === 0) {
				document.querySelector("#count").innerHTML = "--";
			} else if(count < 10) {
				document.querySelector("#count").innerHTML = `0${count}`;
			} else {
				document.querySelector("#count").innerHTML = count;
			}
			
			for(let i = 1; i <= arr.length; i++) {
				setTimeout(() => {
					if(power) {
						document.querySelector(`.color-pad-${arr[i - 1] + 1}`).style.backgroundColor = colorPadColorsSelected[arr[i - 1]];
					}
				}, (i - 1) * 1200 + 400);
				
				setTimeout(() => {
							document.querySelector(`.color-pad-${arr[i - 1] + 1}`).style.backgroundColor = colorPadColors[arr[i - 1]];
				}, i * 1200);
			}
		}
	}
});