(function (global) {
  var ajaxUtils = {}

  // Returns an HTTP request object
  function getRequestObject () {
    if (global.XMLHttpRequest) {
      return new global.XMLHttpRequest()
    } else {
      global.alert('Ajax is not supported!')
      return null
    }
  }
  // Makes an Ajax GET request to 'requestUrl'
  ajaxUtils.sendGetRequest = (requestUrl, responseHandler, isJsonResponse) => {
    const request = getRequestObject()
    request.onreadystatechange = () => handleResponse(request, responseHandler, isJsonResponse)
    request.open('GET', requestUrl, true)
    request.send(null) // for POST only
  }

  // Only calls user provided 'responseHandler'
  // function if response is ready
  // and not an error
  function handleResponse (request, responseHandler, isJsonResponse) {
    if ((request.readyState === 4) && (request.status === 200)) {
      if (isJsonResponse === undefined) {
        isJsonResponse = true
      }
      if (isJsonResponse) {
        responseHandler(JSON.parse(request.responseText))
      } else {
        responseHandler(request.responseText)
      }
    }
  }

  global.$ajaxUtils = ajaxUtils
})(window)
