import ElementView from './elementView.js'

export class CategoryView extends ElementView {
  buildElementsViewHtml (elements, elementsTitleHtml, elementsHtml) {
    let finalHtml = elementsTitleHtml
    finalHtml += '<section class="row">'
    elements.forEach(element => {
      let html = elementsHtml
      const name = '' + element.name
      const short_name = element.short_name
      html = this.insertProperty(html, 'name', name)
      html = this.insertProperty(html, 'short_name', short_name)
      finalHtml += html
    })
    finalHtml += '</section>'
    return finalHtml
  }
}

// (function (global) {
//   class CategoryView extends global.ElementView {
//     buildElementsViewHtml (elements, elementsTitleHtml, elementsHtml) {
//       let finalHtml = elementsTitleHtml
//       finalHtml += '<section class="row">'
//       elements.forEach(element => {
//         let html = elementsHtml
//         const name = '' + element.name
//         const short_name = element.short_name
//         html = this.insertProperty(html, 'name', name)
//         html = this.insertProperty(html, 'short_name', short_name)
//         finalHtml += html
//       })
//       finalHtml += '</section>'
//       return finalHtml
// })(window)
