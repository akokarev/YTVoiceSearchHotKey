chrome.action.onClicked.addListener((tab) => {
	if (tab.url.includes('https://www.youtube.com/')) {
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			function: clickVoiceAndStartVideo
		});
	}
});



function clickVoiceAndStartVideo () {
	
	console.log('clickVoiceAndStartVideo')

	if (sessionStorage.getItem('YTClickVoice')==='0' || sessionStorage.getItem('YTClickVoice')===null || sessionStorage.getItem('YTClickVoice')==='6' || sessionStorage.getItem('YTClickVoice')==='7' || sessionStorage.getItem('YTClickVoice')==='8') {sessionStorage.setItem('YTClickVoice', '1')}
	else {
		console.log('clickVoiceAndStartVideo exit')
		return
	}

	
	function clickVideo() {
		console.log('clickVideo')
		
		if (sessionStorage.getItem('YTClickVoice')==='8') {sessionStorage.setItem('YTClickVoice', '9')}
		else {
			console.log('whaitMicStateNull exit')
			return
		}
		
		document.querySelector('#contents > ytd-item-section-renderer > div#contents > ytd-video-renderer > div#dismissible > ytd-thumbnail > a#thumbnail').click()
		sessionStorage.setItem('YTClickVoice', '0')		
	}

	
	function whaitProgress100() {
		console.log('whaitProgress100 '+document.querySelector("body > ytd-app > yt-page-navigation-progress").getAttribute("aria-valuenow"))
		
		if (sessionStorage.getItem('YTClickVoice')==='6') {sessionStorage.setItem('YTClickVoice', '7')}
		else {
			console.log('whaitMicStateNull exit')
			return
		}
		
		setTimeout(() => {  
			if (document.querySelector("body > ytd-app > yt-page-navigation-progress").getAttribute("aria-valuenow") === '100') {
				sessionStorage.setItem('YTClickVoice', '8')
				clickVideo()
			}else {
				sessionStorage.setItem('YTClickVoice', '6')
				whaitProgress100()
			}
		}, 100);
	}


	function whaitMicStateNull(){
		console.log('whaitMicStateNull '+document.getElementById('microphone').getAttribute('state'))
		
		if (sessionStorage.getItem('YTClickVoice')==='4') {sessionStorage.setItem('YTClickVoice', '5')}
		else {
			console.log('whaitMicStateNull exit')
			return
		}

		
		setTimeout(() => {  
			if (!document.getElementById('microphone').getAttribute('state')) {
				sessionStorage.setItem('YTClickVoice', '6')
				whaitProgress100()
			} else {
				sessionStorage.setItem('YTClickVoice', '4')
				whaitMicStateNull()
			}
		}, 1000);
	}


	function whaitMicStateNotNull(){
		console.log('whaitMicStateNotNull '+document.getElementById('microphone').getAttribute('state'))
		
		if (sessionStorage.getItem('YTClickVoice')==='2') {sessionStorage.setItem('YTClickVoice', '3')}
		else {
			console.log('whaitMicStateNotNull exit')
			return
		}
		
		setTimeout(() => {  
			if (document.getElementById('microphone')) {
				if (!document.getElementById('microphone').getAttribute('state')) {
					sessionStorage.setItem('YTClickVoice', '4')
					whaitMicStateNull()
				}else {
					if (document.getElementById('microphone').getAttribute('state') != 'try-again')	{
						sessionStorage.setItem('YTClickVoice', '2')
						whaitMicStateNotNull()
					}else{
						sessionStorage.setItem('YTClickVoice', '0')
						return
					}
				}
			}else {
				sessionStorage.setItem('YTClickVoice', '2')
				whaitMicStateNotNull()
				}
		}, 1000);
	}


	document.getElementById('voice-search-button').firstChild.click()
	sessionStorage.setItem('YTClickVoice', '2')
	whaitMicStateNotNull()
}

