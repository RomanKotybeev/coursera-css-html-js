(function (global) {
  class Utils {
    insertHTML (selector, html) {
      const targetElem = document.querySelector(selector)
      targetElem.innerHTML = html
    }

    insertProperty (string, name, value) {
      const propToReplace = `{{${name}}}`
      string = string.replace(new RegExp(propToReplace, 'g'), value)
      return string
    }

    insertItemPrice (html, pricePropName, priceValue) {
      if (!priceValue) {
        return this.insertProperty(html, pricePropName, '')
      }
      priceValue = '$' + priceValue.toFixed(2)
      html = this.insertProperty(html, pricePropName, priceValue)
      return html
    }

    insertItemPortionName (html, portionPropName, portionValue) {
      // If not specified, return original string
      if (!portionValue) {
        return this.insertProperty(html, portionPropName, '')
      }
      portionValue = `(${portionValue})`
      html = this.insertProperty(html, portionPropName, portionValue)
      return html
    }
  }
  global.Utils = Utils
})(window)
