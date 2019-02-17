$(document).ready(() => {
  let browserId; let socket; let
    id;
  id = parseInt(localStorage.getItem('id'));
  if (id) {
    	showDownloading();
  } else {
    	hideDownloading();
  }
  Fingerprint2.get((components) => {
    const key = components[2].value + components[3].value + components[4].value + components[7].value + components[8].value + components[14].value + components[15].value + components[27].value;
    browserId = CryptoJS.MD5(key).toString();
    socket = io(`/?browserId=${browserId}`);
    socket.on('connected', () => {
      hideLoader();
    });
    socket.on('downloaded', (data) => {
      id = parseInt(localStorage.getItem('id'));
      console.log(data);
      console.log(id);
        	if (id === data.id) {
        		cancel();
        		window.location.href = data.url;
        	}
      hideLoader();
    });
  });

  $('#btn-download').on('click', download);
  $('#txt-url').on('keypress', (e) => {
    if (e.which == 13) {
      download();
    }
  });
  $('#btn-cancel').on('click', cancel);

  function download() {
    const link = document.getElementById('txt-url').value;
    showLoader();
    fetch('/api/download', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link,
        browserId
      })
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
                	localStorage.setItem('id', data.id);
                	showDownloading();
        });
      } else if (response.status === 422) {
        response.json().then((data) => {
          alert(data.message);
        });
      }
      hideLoader();
    });
  }

  function cancel() {
    	localStorage.clear();
    	hideDownloading();
  }

  function showLoader() {
    $('#loader').show();
  }

  function hideLoader() {
    $('#loader').hide();
  }

  function showDownloading() {
    	$('#downloading').show();
  }

  function hideDownloading() {
    	$('#downloading').hide();
  }
});
