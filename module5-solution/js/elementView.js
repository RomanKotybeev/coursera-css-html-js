export class ElementView {
  constructor (elementUrl, elementTitle, elementHtml) {
    this.util = new global.Util()
    this.elementUrl = elementUrl
    this.elementsTitleHtml = elementTitle
    this.elementHtml = elementHtml
  }

  buildAndShowElementsHTML (elements, to) {
    global.$ajaxUtils.sendGetRequest(this.elementsTitleHtml, (elementsTitleHtml) => {
      global.$ajaxUtils.sendGetRequest(this.elementHtml, (elementHtml) => {
        const elementsViewHtml = this.buildElementsViewHtml(elements, elementsTitleHtml, elementHtml)
        this.util.insertHTML(to, elementsViewHtml)
      }, false)
    }, false)
  }

  buildElementsViewHtml (elements, elementsTitleHtml, elementsHtml) {
    throw new Error('You have to implement the method doSomething!')
  };
}

// (function (global) {
//   class ElementView {
//     constructor (elementUrl, elementTitle, elementHtml) {
//       this.util = new global.Util()
//       this.elementUrl = elementUrl
//       this.elementsTitleHtml = elementTitle
//       this.elementHtml = elementHtml
//     }

//     buildAndShowElementsHTML (elements, to) {
//       global.$ajaxUtils.sendGetRequest(this.elementsTitleHtml, (elementsTitleHtml) => {
//         global.$ajaxUtils.sendGetRequest(this.elementHtml, (elementHtml) => {
//           const elementsViewHtml = this.buildElementsViewHtml(elements, elementsTitleHtml, elementHtml)
//           this.util.insertHTML(to, elementsViewHtml)
//         }, false)
//       }, false)
//     }

//     buildElementsViewHtml (elements, elementsTitleHtml, elementsHtml) {
//       throw new Error('You have to implement the method doSomething!')
//     };
//   }
//   global.ElementView = ElementView
// })(window)
