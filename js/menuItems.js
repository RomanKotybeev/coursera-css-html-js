import ElementView from './elementView.js'

export class MenuView extends ElementView {
  buildElementsViewHtml (elements, elementsTitleHtml, elementsHtml) {
    const name = elements.category.name
    const specialInstructions = elements.category.special_instructions

    let menuItemsTitleHtml = this.util.insertProperty(elementsTitleHtml, 'name', name)
    menuItemsTitleHtml = this.util.insertProperty(menuItemsTitleHtml, 'special_instructions', specialInstructions)

    let finalHtml = this.util.insertProperty(menuItemsTitleHtml, 'name', name)
    finalHtml = menuItemsTitleHtml
    finalHtml += '<section class="row">'

    const menuItems = elements.menu_items
    const catShortName = elements.category.short_name
    menuItems.forEach(item => {
      let html = elementsHtml
      html = this.util.insertProperty(html, 'short_name', item.short_name)
      html = this.util.insertProperty(html, 'catShortName', catShortName)
      html = this.util.insertItemPrice(html, 'price_small', item.price_small)
      html = this.util.insertItemPrice(html, 'price_large', item.price_large)
      html = this.util.insertItemPortionName(html, 'large_portion_name', item.large_portion_name)
      html = this.util.insertItemPortionName(html, 'small_portion_name', item.small_portion_name)
      html = this.util.insertProperty(html, 'name', item.name)
      html = this.util.insertProperty(html, 'description', item.description)

      finalHtml += html
    })
    finalHtml += '</section>'
    return finalHtml
  }
}

// (function (global) {
//   class MenuView extends global.ElementView {

//     buildElementsViewHtml (elements, elementsTitleHtml, elementsHtml) {
//       const name = elements.category.name
//       const specialInstructions = elements.category.special_instructions

//       menuItemsTitleHtml = insertProperty(elementsTitleHtml, 'name', name)
//       menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, 'special_instructions', specialInstructions)

//       let finalHtml = insertProperty(menuItemsTitleHtml, 'name', name)
//       finalHtml = menuItemsTitleHtml
//       finalHtml += '<section class="row">'

//       const menuItems = elements.menu_items
//       const catShortName = elements.category.short_name
//       menuItems.forEach(item => {
//         let html = elementsHtml
//         html = this.util.insertProperty(html, 'short_name', item.short_name)
//         html = this.util.insertProperty(html, 'catShortName', catShortName)
//         html = this.util.insertItemPrice(html, 'price_small', item.price_small)
//         html = this.util.insertItemPrice(html, 'price_large', item.price_large)
//         html = this.util.insertItemPortionName(html, 'large_portion_name', item.large_portion_name)
//         html = this.util.insertItemPortionName(html, 'small_portion_name', item.small_portion_name)
//         html = this.util.insertProperty(html, 'name', item.name)
//         html = this.util.insertProperty(html, 'description', item.description)

//         finalHtml += html
//       })
//       finalHtml += '</section>'
//       return finalHtml
// })(window)
