// ==UserScript==
// @name         Krunker Market Tools
// @version      0.1
// @description  Tools for krunker market
// @author       hitthemoney x yeehow
// @match        *://*.krunker.io/*
// ==/UserScript==

//Ignore all errors, it is just my bad coding
//Please dont steal or your a bad person

let url = document.URL;

if (url.slice(0, 30) == "https://krunker.io/social.html" || url.slice(0, 29) == "http://krunker.io/social.html") {

	var injectScript = document.createElement("div");
	injectScript.id = "toolsScripts";
	document.body.appendChild(injectScript)

	var script = document.createElement("script"),
		code = document.createTextNode(function toolsScript() {

			var url = document.URL;
			var urlNew = new URL(url)

			function setCookie(name, value, days) {
				var d = new Date();
				d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "expires=" + d.toUTCString();
				document.cookie = name + "=" + value + ";" + expires + ";path=/";
			}

			function getCookie(name) {
				var name = name + "=";
				var decodedCookie = decodeURIComponent(document.cookie);
				var ca = decodedCookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') {
						c = c.substring(1);
					}
					if (c.indexOf(name) == 0) {
						return c.substring(name.length, c.length);
					}
				}
				return "";
			}

			var showPing = getCookie("showPing"),
				darkMode = getCookie("darkMode"),
				showEstVal = getCookie("showEstVal"),
				UIScale = getCookie("UIScale"),
				UIVol = getCookie("UIVol"),
				musicVol = getCookie("musicVol");
			if (showPing == "") setCookie("showPing", "true", 365);
			if (darkMode == "") setCookie("darkMode", "false", 365);
			if (showEstVal == "") setCookie("darkMode", "true", 365);
			if (UIScale == "") setCookie("UIScale", "1", 365);
			if (UIVol == "") setCookie("UIVol", "1", 365);
			if (musicVol == "") setCookie("musicVol", "1", 365);

			function stringToBool(string) {
				if (string == "false") {
					var boolToReturn = false;
				} else if (string == "true") {
					var boolToReturn = true;
				} else {
					var boolToReturn = undefined;
				};
				return boolToReturn;
			};
			var injectStyle = document.createElement("style");
			injectStyle.id = "toolsStyles";
			document.body.appendChild(injectStyle)

			var injectStyle2 = document.createElement("style");
			injectStyle2.id = "toolsStyles2";
			document.body.appendChild(injectStyle2)
			injectStyle2.innerHTML = `
body {
	zoom: 1;
	-moz-transform: scale(1);
    -moz-transform-origin: 0 0;
}
			`
			window.changeUIScale = function (scale) {
				let injectStyle2 = document.getElementById("toolsStyles2");
				injectStyle2.innerHTML = `
body {
	zoom: ${scale};
	-moz-transform: scale(${scale});
    -moz-transform-origin: 0 0;
}
			`;
				setCookie("UIScale", scale.toString(), 365);
			}

			function darkModeFunc() {
				if (blackStyleCheckbox.checked == true) {
					setCookie("darkMode", "true", 365)
					injectStyle.innerHTML = `
					html {
						background-image: url();
						background-color: #000;
					}
					#navBar {
						background-color: #000;
						background-image: url();
					}
					#profileKR {
						color: #fff;
					}
					`
				} else {
					setCookie("darkMode", "false", 365)
					injectStyle.innerHTML = `

					`
				}
			}

			window.changeVol = function (v, m) {
				if (m == "music") {
					setCookie("musicVol", v.toString(), 365)
					this.soundVol1 = parseFloat(v)
					let musicBtn = document.getElementById("musicBtn");
					SOUND.stop("ambient_4");
					SOUND.play("ambient_4", .07, !0)
					if (parseFloat(v) == 0) {
						saveVal("mrkt_music", "0")
						musicBtn.innerText = "volume_off"
					} else {
						saveVal("mrkt_music", "1")
						musicBtn.innerText = "volume_up"
					}
				} else {
					setCookie("UIVol", v.toString(), 365)
					this.soundVol2 = parseFloat(v)
				}
			}

			var pingHolder = document.createElement("span")
			document.getElementById("navButtons").insertBefore(pingHolder, document.getElementById("navButtons").childNodes[0])
			pingHolder.outerHTML = `<span id="pingHolder" style="color: white; display: inline-block; margin-top: 10px; margin-right: 10px; font-size: 20px;">Loading</span`

			function showPingFunc() {
				let pingHolder = document.getElementById("pingHolder")
				if (pingStyleCheckbox.checked == false) {
					pingHolder.style.display = "none"
					setCookie("showPing", "false", 365);
				} else {
					pingHolder.style = "color: white; display: inline-block; margin-top: 10px; margin-left: 250px; font-size: 20px;"
					setCookie("showPing", "true", 365);
				};
			};

			function showEstValFunc() {
				if (estValStyleCheckbox.checked == true) {
					st.innerHTML = `
.marketPrice {
    top: 178px !important;
}`
					setCookie("showEstVal", "true", 365)
				} else {
					st.innerHTML = `
.estVal2 {
    display: none;
}`
					setCookie("showEstVal", "false", 365);
				}
			}

			function getItemNum(skinName) {
				let num = 0;
				const arrayLength = skins.length;
				let itemNum = 0;
				while (num < arrayLength) {
					if (skins[num].name.toLowerCase() === skinName.toLowerCase())
						itemNum = num;
					num++;
				}
				if (itemNum === 0 && skinName.toLowerCase() !== 'arctic hunt')
					return;
				return itemNum;
			}

			function commaPrice(price) {
				return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			};

			var toolsHolder = document.createElement("div")
			document.body.appendChild(toolsHolder)
			toolsHolder.style.display = "none"
			toolsHolder.id = "toolsHolder";
			toolsHolder.innerHTML = `
			</div><span id="settingsTitle" style="color: white; display: inline-block; margin-top: 20px; font-size: 60px;">Settings</span><br>

			<div id="settingSliders">
			<div id="blackStyleSwitch"><label class="switch"><input type="checkbox" id="blackStyleCheckbox"><span
            class="slider"></span></label><span id="blackStyleSliderText" style="">Dark Mode</span>
</div>
<div id="pingStyleSwitch"><label class="switch"><input type="checkbox" id="pingStyleCheckbox"><span
			class="slider"></span></label><span id="pingStyleSliderText" style="">Show Ping</span></div>
			<div id="estValStyleSwitch"><label class="switch"><input type="checkbox" id="estValStyleCheckbox"><span
			class="slider"></span></label><span id="estValStyleSliderText" style="">Show Estimated Values</span></div>

			<div><span id="UIScaleText">UI Scale</span><input type="number" class="sliderVal" id="UIScaleInput" min="0.75" max="1" value="${getCookie("UIScale")}" onkeypress="document.getElementById('UIScaleSlider').value = this.value; changeUIScale(this.value);" style="margin-right: 0px;border-width:0px">
				<div class="slidecontainer">
				<input type="range" id="UIScaleSlider" min="0.75" max="1" step="0.05" value="${getCookie("UIScale")}" class="sliderM" oninput="document.getElementById('UIScaleInput').value = this.value; changeUIScale(this.value);"></div></div>

			<div><span id="MusicVolText">Music Volume</span><input type="number" class="sliderVal" id="MusicVolInput" min="0" max="1" value="${getCookie("musicVol")}" onkeypress="document.getElementById('MusicVolSlider').value = this.value; changeVol(this.value, 'music');" style="margin-right: 0px;border-width:0px">
				<div class="slidecontainer">
				<input type="range" id="MusicVolSlider" min="0" max="1" step="0.1" value="${getCookie("musicVol")}" class="sliderM" oninput="document.getElementById('MusicVolInput').value = this.value; changeVol(this.value, 'music');"></div></div>

			<div><span id="UIVolText">UI Volume</span><input type="number" class="sliderVal" id="UIVolInput" min="0" max="1" value="${getCookie("UIVol")}" onkeypress="document.getElementById('UIVolSlider').value = this.value; changeVol(this.value);" style="margin-right: 0px;border-width:0px">
				<div class="slidecontainer">
				<input type="range" id="UIVolSlider" min="0" max="1" step="0.1" value="${getCookie("UIVol")}" class="sliderM" oninput="document.getElementById('UIVolInput').value = this.value; changeVol(this.value);"></div></div>
			<span id="pingHolder2" style="text-align: center; display: block; margin-top: 20px; font-size: 40px;">Ping: Loading</span><br>
			</div>
</div>
			`;
			changeUIScale(getCookie("UIScale"));
			var st = document.createElement("style");
			document.head.appendChild(st);

			var blackStyleCheckbox = document.getElementById("blackStyleCheckbox");
			var pingStyleCheckbox = document.getElementById("pingStyleCheckbox");
			var estValStyleCheckbox = document.getElementById("estValStyleCheckbox");
			blackStyleCheckbox.checked = stringToBool(getCookie("darkMode"));
			darkModeFunc();
			pingStyleCheckbox.checked = stringToBool(getCookie("showPing"));
			showPingFunc();
			estValStyleCheckbox.checked = stringToBool(getCookie("showEstVal"));
			showEstValFunc();
			blackStyleCheckbox.onclick = (function () {
				darkModeFunc();
			});
			pingStyleCheckbox.onclick = (function () {
				showPingFunc();
			});
			estValStyleCheckbox.onclick = (function () {
				showEstValFunc();
			});
			this.soundVol1 = parseFloat(getCookie("musicVol"))
			this.soundVol2 = parseFloat(getCookie("UIVol"))
			this.SOUND.play2 = this.SOUND.play;
			this.SOUND.play = function (e, t, r, n) {
				if (e == "ambient_4") {
					if (soundVol1 !== 0) {
						SOUND.play2(e, (t) * soundVol1, r, n)
					}
				} else {
					if (soundVol2 !== 0) {
						SOUND.play2(e, (t) * soundVol2, r, n)
					}
				}
			};
			window.checkMusic = function (c) {
				let musicBtn = document.getElementById("musicBtn");
				if (musicBtn.innerText == "volume_off") {
					setCookie("musicVol", "0", 365);
					document.getElementById("MusicVolInput").value = "0";
					document.getElementById("MusicVolSlider").value = "0";
				} else if (musicBtn.innerText == "volume_up" && c == true) {
					setCookie("musicVol", "1", 365);
					document.getElementById("MusicVolInput").value = "1";
					document.getElementById("MusicVolSlider").value = "1";
				} else {
					musicBool = null;
				}
			}

			var musicBtn = document.getElementById("musicBtn");
			musicBtn.addEventListener('click', function () {
				checkMusic(true);
			})
			checkMusic();

			var navButtons = document.getElementById("navButtons")
			var settingsButton = document.createElement("div");
			navButtons.insertBefore(settingsButton, document.getElementById("blackm"));
			settingsButton.outerHTML = `<div onmouseover="SOUND.play('tick_0',0.1)" onclick="updateWindow('settings')" id="settings" class="material-icons mic1 menuBtn" style="opacity: 0.5;">settings</div>`
			let pParam = urlNew.searchParams.get('p');

			let settings = document.getElementById("settings")
			settings.style = "opacity: 1;"

			window.showSettings = function () {
				let toolsHolder = document.getElementById("toolsHolder");
				let settings = document.getElementById("settings");
				let buttons = ["leaders", "profile", "maps", "market", "tourney", "blackm"];
				let holders = ["leader", "profile", "maps", "market", "tourney", "blackm]
				for (i = 0; i < buttons.length; i++) {
					document.getElementById(buttons[i]).style = "opacity: 1;";
					document.getElementById(`${holders[i]}Holder`).style.display = "none";
				}
				settings.style = "opacity: 0.5;"
				toolsHolder.style.display = ""
				document.getElementById("loadMessage").style.display = "none"
			}

			pm = function() {
				let musicOn = parseInt(getSavedVal("mrkt_music") || 0);
				if (musicOn == 1) {
					SOUND.stop("ambient_4");
					SOUND.play("ambient_4", .07, !0)
				}
			}

			if (pParam == "market") pm()

			window.updateWindow2 = window.updateWindow;
			window.updateWindow = function (e, t, a, o, d, c) {
				if (e == "market") pm();
				if (e == "settings") {
					updateWindow2("settings")
					showSettings();
					pm();
				} else {
					let toolsHolder = document.getElementById("toolsHolder");
					toolsHolder.style.display = "none";
					let settings = document.getElementById("settings")
					settings.style = "opacity: 1;"
					window.updateWindow2(e, t, a, o, d, c);
				}
			};

			if (pParam == 'settings') {
				updateWindow("settings")
			}
			this.ws = new WebSocket('wss://krunker_social.krunker.io/ws');

			var pingEncoded = msgpack.serialize(['po']).buffer;

			this.ws.onopen = () => {
				console.log('connected');
				pong();
			};

			this.ws.onmessage = async function (event) {
				var blob = event.data;
				var arrayBuffer = null;

				arrayBuffer = await new Response(blob).arrayBuffer();

				var data = msgpack.deserialize(arrayBuffer);

				if (data[0] == 'pi') {
					pong();
				} else if (data[0] == 'pir') {
					const ping = data[1];
					displayPing(ping);
				}
			};

			function pong() {
				this.ws.send(pingEncoded);
			}

			function displayPing(value) {
				let pingValue = `Ping: ${value}ms`;
				document.getElementById('pingHolder').textContent = pingValue;
				document.getElementById('pingHolder2').textContent = pingValue;
			}

            var runStyle = document.createElement("style")
	runStyle.appendChild(document.createTextNode(`.sliderVal{float:right;position:relative;width:45px;height:25px;color:#fff;line-height:24px;font-size:18px;text-align:center;background:#2196f3;padding:5px 10px;margin-left:8px;margin-right:-10px;border-radius:6px}.sliderM{-webkit-appearance:none;appearance:none;width:45%;height:15px;background-color:#a8a8a8;outline:0;border-radius:4px}.sliderM::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:15px;height:25px;border-radius:4px;background:#2196f3;cursor:pointer}.sliderM::-moz-range-thumb{width:15px;height:25px;border-radius:4px;background:#2196f3;cursor:pointer}.switch{float:right;position:relative;margin-bottom:5px;width:65px;height:34px}.switch input{display:none}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#a8a8a8;-webkit-transition:.4s;transition:.4s;border-radius:6px}.slider:before{position:absolute;content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:#fff;-webkit-transition:.4s;transition:.4s;border-radius:4px}input:checked+.slider{background-color:#2196f3}input:focus+.slider{box-shadow:0 0 1px #2196f3}input:checked+.slider:before{-webkit-transform:translateX(30px);-ms-transform:translateX(30px);transform:translateX(30px)}#toolsHolder{width:100%;text-align:center;position:absolute;top:110px;bottom:150px;height:auto;overflow-y:auto}#blackStyleSwitch{display:block;margin-top:-6px}#blackStyleSliderText{display:block;font-size:22px;text-align:left;margin-top:7px}#estValStyleSwitch,#pingStyleSwitch{display:block;margin-top:-7px}#estValStyleSliderText,#pingStyleSliderText{display:block;font-size:22px;text-align:left;margin-top:17px}#MusicVolText,#UIScaleText,#UIVolText{display:block;font-size:22px;text-align:left;margin-top:10px}#MusicVolSlider,#UIScaleSlider,#UIVolSlider{display:block;margin-top:-24px;margin-left:145px}#UIScaleSlider{margin-bottom:21px}#MusicVolInput,#UIScaleInput,#UIVolInput{display:block;margin-top:-30px}#MusicVolText,#UIVolText{margin-top:17px}#MusicVolSlider{margin-left:225px;margin-top:-20px}#UIVolSlider{margin-left:170px;margin-top:-20px}#settingSliders{display:block;margin:auto;margin-top:20px;width:550px;height:315px;border:solid #353535 5px;background-color:#fff;color:#353535;border-radius:20px;padding:10px}`));
	document.getElementById("toolsScripts").appendChild(runStyle);

			const observer = new MutationObserver(mutations => {
				mutations.forEach(mutation => {
					mutation.addedNodes.forEach(node => {
						if (node.className !== undefined && node.id !== undefined) {
							if (node.className.slice(0, 10) === 'marketCard' && node.id.slice(0, 17) !== "itemCardinventory") {
								var itemName = node.childNodes[0].textContent;
								node.innerHTML = node.innerHTML + `<div class="marketPrice estVal2" style="margin-top: 28px;">~ ${commaPrice(avgPrices[getItemNum(itemName)])}<span style="color:#fff"> KR</span></div>`;
							}
						};
					});
				});
			});

			observer.observe(document.documentElement, {
				childList: true,
				subtree: true
			});

		});


	script.appendChild(code);
	script.type = "text/javascript";
	document.getElementById("toolsScripts").appendChild(script);

	var runScript = document.createElement("script")
	runScript.appendChild(document.createTextNode(`
	!function(){"use strict";function e(e){const t=4294967296;let r,n,i=new Uint8Array(128),o=0;return f(e),i.subarray(0,o);function f(e){switch(typeof e){case"undefined":a(e);break;case"boolean":!function(e){u(e?195:194)}(e);break;case"number":!function(e){if(isFinite(e)&&Math.floor(e)===e)if(e>=0&&e<=127)u(e);else if(e<0&&e>=-32)u(e);else if(e>0&&e<=255)c([204,e]);else if(e>=-128&&e<=127)c([208,e]);else if(e>0&&e<=65535)c([205,e>>>8,e]);else if(e>=-32768&&e<=32767)c([209,e>>>8,e]);else if(e>0&&e<=4294967295)c([206,e>>>24,e>>>16,e>>>8,e]);else if(e>=-2147483648&&e<=2147483647)c([210,e>>>24,e>>>16,e>>>8,e]);else if(e>0&&e<=0x10000000000000000){let r=e/t,n=e%t;c([211,r>>>24,r>>>16,r>>>8,r,n>>>24,n>>>16,n>>>8,n])}else e>=-0x8000000000000000&&e<=0x8000000000000000?(u(211),s(e)):c(e<0?[211,128,0,0,0,0,0,0,0]:[207,255,255,255,255,255,255,255,255]);else n||(r=new ArrayBuffer(8),n=new DataView(r)),n.setFloat64(0,e),u(203),c(new Uint8Array(r))}(e);break;case"string":!function(e){let t=function(e){let t=!0,r=e.length;for(let n=0;n<r;n++)if(e.charCodeAt(n)>127){t=!1;break}let n=0,i=new Uint8Array(e.length*(t?1:4));for(let t=0;t!==r;t++){let o=e.charCodeAt(t);if(o<128)i[n++]=o;else{if(o<2048)i[n++]=o>>6|192;else{if(o>55295&&o<56320){if(++t>=r)throw new Error("UTF-8 encode: incomplete surrogate pair");let f=e.charCodeAt(t);if(f<56320||f>57343)throw new Error("UTF-8 encode: second surrogate character 0x"+f.toString(16)+" at index "+t+" out of range");o=65536+((1023&o)<<10)+(1023&f),i[n++]=o>>18|240,i[n++]=o>>12&63|128}else i[n++]=o>>12|224;i[n++]=o>>6&63|128}i[n++]=63&o|128}}return t?i:i.subarray(0,n)}(e),r=t.length;r<=31?u(160+r):c(r<=255?[217,r]:r<=65535?[218,r>>>8,r]:[219,r>>>24,r>>>16,r>>>8,r]);c(t)}(e);break;case"object":null===e?a(e):e instanceof Date?function(e){let r=e.getTime()/1e3;if(0===e.getMilliseconds()&&r>=0&&r<4294967296)c([214,255,r>>>24,r>>>16,r>>>8,r]);else if(r>=0&&r<17179869184){let n=1e6*e.getMilliseconds();c([215,255,n>>>22,n>>>14,n>>>6,n<<2>>>0|r/t,r>>>24,r>>>16,r>>>8,r])}else{let t=1e6*e.getMilliseconds();c([199,12,255,t>>>24,t>>>16,t>>>8,t]),s(r)}}(e):Array.isArray(e)?l(e):e instanceof Uint8Array||e instanceof Uint8ClampedArray?function(e){let t=e.length;c(t<=15?[196,t]:t<=65535?[197,t>>>8,t]:[198,t>>>24,t>>>16,t>>>8,t]);c(e)}(e):e instanceof Int8Array||e instanceof Int16Array||e instanceof Uint16Array||e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array?l(e):function(e){let t=0;for(let r in e)t++;t<=15?u(128+t):c(t<=65535?[222,t>>>8,t]:[223,t>>>24,t>>>16,t>>>8,t]);for(let t in e)f(t),f(e[t])}(e)}}function a(e){u(192)}function l(e){let t=e.length;t<=15?u(144+t):c(t<=65535?[220,t>>>8,t]:[221,t>>>24,t>>>16,t>>>8,t]);for(let r=0;r<t;r++)f(e[r])}function u(e){if(i.length<o+1){let e=2*i.length;for(;e<o+1;)e*=2;let t=new Uint8Array(e);t.set(i),i=t}i[o]=e,o++}function c(e){if(i.length<o+e.length){let t=2*i.length;for(;t<o+e.length;)t*=2;let r=new Uint8Array(t);r.set(i),i=r}i.set(e,o),o+=e.length}function s(e){let r,n;e>=0?(r=e/t,n=e%t):(e++,r=~(r=Math.abs(e)/t),n=~(n=Math.abs(e)%t)),c([r>>>24,r>>>16,r>>>8,r,n>>>24,n>>>16,n>>>8,n])}}function t(e){const t=4294967296;let r=0;if(e instanceof ArrayBuffer&&(e=new Uint8Array(e)),"object"!=typeof e||void 0===e.length)throw new Error("Invalid argument type: Expected a byte array (Array or Uint8Array) to deserialize.");if(!e.length)throw new Error("Invalid argument: The byte array to deserialize is empty.");e instanceof Uint8Array||(e=new Uint8Array(e));let n=i();return e.length,n;function i(){const t=e[r++];if(t>=0&&t<=127)return t;if(t>=128&&t<=143)return u(t-128);if(t>=144&&t<=159)return c(t-144);if(t>=160&&t<=191)return s(t-160);if(192===t)return null;if(193===t)throw new Error("Invalid byte code 0xc1 found.");if(194===t)return!1;if(195===t)return!0;if(196===t)return l(-1,1);if(197===t)return l(-1,2);if(198===t)return l(-1,4);if(199===t)return d(-1,1);if(200===t)return d(-1,2);if(201===t)return d(-1,4);if(202===t)return a(4);if(203===t)return a(8);if(204===t)return f(1);if(205===t)return f(2);if(206===t)return f(4);if(207===t)return f(8);if(208===t)return o(1);if(209===t)return o(2);if(210===t)return o(4);if(211===t)return o(8);if(212===t)return d(1);if(213===t)return d(2);if(214===t)return d(4);if(215===t)return d(8);if(216===t)return d(16);if(217===t)return s(-1,1);if(218===t)return s(-1,2);if(219===t)return s(-1,4);if(220===t)return c(-1,2);if(221===t)return c(-1,4);if(222===t)return u(-1,2);if(223===t)return u(-1,4);if(t>=224&&t<=255)return t-256;throw console.debug("msgpack array:",e),new Error("Invalid byte value '"+t+"' at index "+(r-1)+" in the MessagePack binary data (length "+e.length+"): Expecting a range of 0 to 255. This is not a byte array.")}function o(t){let n=0,i=!0;for(;t-- >0;)if(i){let t=e[r++];n+=127&t,128&t&&(n-=128),i=!1}else n*=256,n+=e[r++];return n}function f(t){let n=0;for(;t-- >0;)n*=256,n+=e[r++];return n}function a(t){let n=new DataView(e.buffer,r,t);return r+=t,4===t?n.getFloat32(0,!1):8===t?n.getFloat64(0,!1):void 0}function l(t,n){t<0&&(t=f(n));let i=e.subarray(r,r+t);return r+=t,i}function u(e,t){e<0&&(e=f(t));let r={};for(;e-- >0;){r[i()]=i()}return r}function c(e,t){e<0&&(e=f(t));let r=[];for(;e-- >0;)r.push(i());return r}function s(t,n){t<0&&(t=f(n));let i=r;return r+=t,function(e,t,r){let n=t,i="";r+=t;for(;n<r;){let t=e[n++];if(t>127)if(t>191&&t<224){if(n>=r)throw new Error("UTF-8 decode: incomplete 2-byte sequence");t=(31&t)<<6|63&e[n++]}else if(t>223&&t<240){if(n+1>=r)throw new Error("UTF-8 decode: incomplete 3-byte sequence");t=(15&t)<<12|(63&e[n++])<<6|63&e[n++]}else{if(!(t>239&&t<248))throw new Error("UTF-8 decode: unknown multibyte start 0x"+t.toString(16)+" at index "+(n-1));if(n+2>=r)throw new Error("UTF-8 decode: incomplete 4-byte sequence");t=(7&t)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++]}if(t<=65535)i+=String.fromCharCode(t);else{if(!(t<=1114111))throw new Error("UTF-8 decode: code point 0x"+t.toString(16)+" exceeds UTF-16 reach");t-=65536,i+=String.fromCharCode(t>>10|55296),i+=String.fromCharCode(1023&t|56320)}}return i}(e,i,t)}function d(e,n){e<0&&(e=f(n));let i=f(1),a=l(e);switch(i){case 255:return function(e){if(4===e.length){let t=(e[0]<<24>>>0)+(e[1]<<16>>>0)+(e[2]<<8>>>0)+e[3];return new Date(1e3*t)}if(8===e.length){let r=(e[0]<<22>>>0)+(e[1]<<14>>>0)+(e[2]<<6>>>0)+(e[3]>>>2),n=(3&e[3])*t+(e[4]<<24>>>0)+(e[5]<<16>>>0)+(e[6]<<8>>>0)+e[7];return new Date(1e3*n+r/1e6)}if(12===e.length){let t=(e[0]<<24>>>0)+(e[1]<<16>>>0)+(e[2]<<8>>>0)+e[3];r-=8;let n=o(8);return new Date(1e3*n+t/1e6)}throw new Error("Invalid data length for a date value.")}(a)}return{type:i,data:a}}}let r={serialize:e,deserialize:t,encode:e,decode:t};"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=r:window[window.msgpackJsName||"msgpack"]=r}();toolsScript()
	const avgPrices = [15, 2, 40, 40, 480, 5, 3, 10, 7, 2, 379, 1, 9, 2, 59, 2, 697, 5, 3, 9, 10, 10, 7, 5, 2, 15, 3, 2, 1, 4, 8, 3, 1, 2, 3, 15, 1, 1, 3, 2, 1, 3, 9, 10, 5, 47, 1, 15, 1, 15, 15, 6, 1, 2, 2, 10, 1, 2, 2, 2, 2, 2, 2, 10, 12, 75, 1, 5, 5, 10, 10, 15, 3, 15, 2, 1, 10, 2, 2, 1, 2, 1, 3, 1, 300, 1, 2, 60, 3, 5, 1, 2, 1, 2, 4, 15, 1, 2, 1, 10, 2, 2, 5, 2, 5, 10, 19, 1, 9, 2, 3498, 70, 300, 10, 8850, 42, 398, 60, 4759, 169, 25, 10, 390, 40, 5, 5, 40, 9, 3149, 45, 9, 8, 50, 9, 15, 5, 3, 20, 5, 14, 1, 3, 17, 2, 25, 30, 14, 43, 2, 1, 1, 10, 2, 100, 5, 10, 99, 15, 10, 4, 2, 8, 2, 430, 5, 2, 10, 35, 3890, 350, 40, 11, 7, 5, 3, 49, 30, 5300, 650, 65, 5, 2, 5, 3, 19, 30, 2999, 500, 19, 2, 1, 1, 1, 20, 19, 270, 160, 10, 1, 1, 2, 1, 47, 65, 3989, 579, 79, 1, 1, 3, 2, 9, 9, 1700, 179, 19, 1, 199, 5, 1, 99, 100, 5999, 950, 99, 13, 1, 1, 1, 10, 10, 1500, 115, 10, 1, 1, 11, 198, 250, 69, 25, 450, 15, 10, 50, 59, 5500, 373, 1249, 900, 949, 490, 14499, 598, 1099, 89, 198, 369, 50, 22, 90, 4500, 90, 565, 39, 11, 398, 135, 230, 300, 4200, 999, 2490, 2699, 290, 300, 309, 69, 79, 150, 287, 148, 249, 38, 6299, 12900, 60, 58, 259, 3150, 350, 3800, 4e3, 4e3, 999, 200, 200, 600, 237, 199, 399, 265, 270, 7500, 3e3, 3899, 3850, 4110, 30, 40, 40, 15e3, 28999, 5e4, 19498, 2, 17, 10, 7, 4, 3, 2, 2, 3, 4, 1, 5, 15, 1, 3, 1, 40, 50, 25, 40, 50, 30, 2, 15, 3, 2, 25, 20, 19, 36, 3, 10, 14, 20, 13, 5, 10, 28, 25, 10, 15, 50, 55, 69, 89, 97, 55, 10, 85, 2, 10, 20, 20, 19, 30, 15, 16, 30, 18, 15, 16, 18, 20, 19, 19, 15, 100, 100, 100, 110, 70, 95, 15, 19, 20, 15, 925, 15, 20, 130, 58999, 9999, 500, 17500, 739, 588, 479, 199, 65, 75, 60, 100, 200, 899, 193, 3999, 4599, 14e3, 4750, 4800, 3500, 3799, 5300, 12699, 1100777, 5, 1, 9, 1, 10, 1, 3, 2, 4, 1, 1, 2, 5, 17, 1, 2, 10, 3, 4, 9, 4, 10, 15, 93, 1400, 24999, 27999, 15e3, 8200, 17, 1, 2, 1, 2, 15, 2, 3, 2, 5, 10, 239, 2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 3, 1, 1, 4, 2, 30, 45, 3, 4, 10, 15, 25, 40, 199, 2, 37, 3, 2, 2, 200, 1, 20, 20, 1, 1, 1, 2, 2300, 2222, 33, 3850, 205, 175, 40, 290, 3, 250, 30, 14, 400, 25, 2, 2, 2, 2, 3, 3, 10, 2, 5, 20, 443, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 25, 410, 2, 5, 40, 15, 24, 30, 2, 4, 4, 2, 3, 20, 40, 2, 2, 2, 2, 5540, 5660, 300, 3737, 40, 50, 13999, 7, 1, 1, 1, 1, 10, 1, 1, 1, 2, 10, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 9, 1, 2, 10, 8, 3, 10, 1, 2, 1, 1, 1, 10, 3, 1, 1, 2, 1, 11, 420, 239, 2888, 20, 15, 1, 1, 12, 10, 7, 10, 1, 3, 1, 1, 1, 9, 10, 1, 1, 1, 1, 225, 200, 1850, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 10, 139, 1, 1, 1, 6, 100, 1, 1, 5, 6, 5, 5, 1, 1, 1, 1, 1, 5, 9, 1, 1, 1, 1, 294, 300, 5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1499, 1, 1, 1, 7, 4, 1, 4, 5, 4, 9, 7, 1, 1, 1, 1, 1, 5, 10, 1, 1, 1, 1, 5, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 100, 1e3, 30, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 56, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 10, 1, 1, 5, 6, 4, 7, 50, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 750, 850, 80, 899, 100, 800, 1599, 4600, 4900, 14798, 13333, 16500, 2, 5, 5, 7, 10, 5, 25, 20, 20, 149, 5, 10, 225, 500, 500, 125, 20, 15, 169, 999, 4e3, 3999, 499, 200, 49, 120, 40, 196, 39, 15, 30, 190, 10, 19, 5, 50, 35, 189, 5490, 420, 469, 50, 50, 247, 589, 55, 200, 2350, 14200, 1e4, 5, 90, 6400, 4899, 200, 14, 100, 15, 9, 10, 59, 29, 10, 95, 100, 16900, 20999, 10800, 8380, 4500, 0, 260, 2699, 10, 7, 400, 2498, 1, 2, 1, 1, 1, 2, 1, 2, 5, 9, 2, 7, 10, 5, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 10, 9, 10, 8, 1, 1, 2, 247, 43, 2795, 401, 339, 205, 120, 51999, 200, 45, 42, 44, 2300, 220, 780, 2500, 7499, 230, 266666, 65999, 11999, 39e3, 2946, 79, 2899, 56, 750, 9600, 2299, 200, 2995, 199, 20, 16999, 49, 270, 2280, 2300, 255, 49, 99, 350, 220, 15, 299, 36, 250, 15, 3150, 48, 30, 449, 399, 19, 44, 59, 40, 6e3, 2300, 48, 210, 2129, 219, 400, 260, 7, 10, 80, 496, 470, 5111, 2250, 15500, 12999, 29999, 6999, 3450, 2e3, 190, 23, 3288, 18999, 4100, 275, 444, 400, 7999, 3500, 1399, 900, 1e3, 550, 897, 430, 1150, 899, 2450, 1799, 2269, 53e3, 2e4, 190, 400, 250, 300, 170, 250, 505, 14777, 400, 320, 329, 359, 128, 270, 500, 5750, 1599, 2288, 100, 100, 600, 320, 150, 99, 200, 999, 499, 105, 299, 279, 100, 1130, 777, 100, 90, 190, 179, 850, 179, 1e4, 17998, 38555, 35e4, 16999, 519019, 12e3];
	const skins = eval(((document.body.innerHTML).split("e.exports.skins="))[1].split("]")[0] + "]")
`));
	runScript.type = "text/javascript";
	document.getElementById("toolsScripts").appendChild(runScript);

}
