
(function (global) {
  var dc = {}

  const homeHtmlUrl = 'snippets/home-snippet.html'

  const allCategoriesUrl = 'https://davids-restaurant.herokuapp.com/categories.json'
  const categoriesTitleHtml = 'snippets/categories-title-snippet.html'
  const categoryHtml = 'snippets/category-snippet.html'

  const menuItemUrl = 'https://davids-restaurant.herokuapp.com/menu_items.json?category='
  const menuItemsTitleHtml = 'snippets/menu-items-title.html'
  const menuItemHtml = 'snippets/menu-item.html'

  const showLoading = (selector) => {
    let html = '<div class="text-center">'
    html += '<img src="images/ajax-loader.gif"></div>'
    insertHTML(selector, html)
  }

  const insertHTML = (selector, html) => {
    const targetElem = document.querySelector(selector)
    targetElem.innerHTML = html
  }

  // document.addEventListener('DOMContentLoaded', (event) => {
  //   showLoading('main')
  //   global.$ajaxUtils.sendGetRequest(homeHtmlUrl, (responseText) => {
  //     document.querySelector('#main-content').innerHTML = responseText
  //   },
  //   false)
  // })

  const insertProperty = (string, name, value) => {
    const propToReplace = `{{${name}}}`
    string = string.replace(new RegExp(propToReplace, 'g'), value)
    return string
  }

  const insertItemPrice = (html, pricePropName, priceValue) => {
    if (!priceValue) {
      return insertProperty(html, pricePropName, '')
    }
    priceValue = '$' + priceValue.toFixed(2)
    html = insertProperty(html, pricePropName, priceValue)
    return html
  }
  const insertItemPortionName = (html, portionPropName, portionValue) => {
    // If not specified, return original string
    if (!portionValue) {
      return insertProperty(html, portionPropName, '')
    }

    portionValue = `(${portionValue})`
    html = insertProperty(html, portionPropName, portionValue)
    return html
  }

  const chooseRandomCategory = (categories) => {
    const randomArrayIndex = Math.floor(Math.random() * categories.length)
    console.log(categories[randomArrayIndex])
    console.log('---------------------------')
    return categories[randomArrayIndex]
  }

  function buildAndShowCategoriesHTML (categories) {
    global.$ajaxUtils.sendGetRequest(categoriesTitleHtml, (categoriesTitleHtml) => {
      global.$ajaxUtils.sendGetRequest(categoryHtml, (categoryHtml) => {
        const categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml)
        insertHTML('#main-content', categoriesViewHtml)
      }, false)
    }, false)
  }

  function buildCategoriesViewHtml (categories, categoriesTitleHtml, categoryHtml) {
    let finalHtml = categoriesTitleHtml
    finalHtml += '<section class="row">'
    categories.forEach(category => {
      let html = categoryHtml
      const name = '' + category.name
      const short_name = category.short_name
      html = insertProperty(html, 'name', name)
      html = insertProperty(html, 'short_name', short_name)
      finalHtml += html
    })
    finalHtml += '</section>'
    return finalHtml
  }

  function buildAndShowMenuItemsHTML (categoryMenuItems) {
    global.$ajaxUtils.sendGetRequest(menuItemsTitleHtml, (menuItemsTitleHtml) => {
      global.$ajaxUtils.sendGetRequest(menuItemHtml, (menuItemHtml) => {
        const menuItemsViewHtml = buildMenuItemsViewHTML(categoryMenuItems, menuItemsTitleHtml, menuItemHtml)
        insertHTML('#main-content', menuItemsViewHtml)
      },
      false)
    },
    false)
  }

  function buildMenuItemsViewHTML (categoryMenuItems, menuItemsTitleHtml, menuItemHtml) {
    const name = categoryMenuItems.category.name
    const specialInstructions = categoryMenuItems.category.special_instructions

    menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, 'name', name)
    menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, 'special_instructions', specialInstructions)

    let finalHtml = insertProperty(menuItemsTitleHtml, 'name', name)
    finalHtml = menuItemsTitleHtml
    finalHtml += '<section class="row">'

    const menuItems = categoryMenuItems.menu_items
    const catShortName = categoryMenuItems.category.short_name
    menuItems.forEach(item => {
      let html = menuItemHtml
      html = insertProperty(html, 'short_name', item.short_name)
      html = insertProperty(html, 'catShortName', catShortName)
      html = insertItemPrice(html, 'price_small', item.price_small)
      html = insertItemPrice(html, 'price_large', item.price_large)
      html = insertItemPortionName(html, 'large_portion_name', item.large_portion_name)
      html = insertItemPortionName(html, 'small_portion_name', item.small_portion_name)
      html = insertProperty(html, 'name', item.name)
      html = insertProperty(html, 'description', item.description)

      finalHtml += html
    })
    finalHtml += '</section>'
    return finalHtml
  }

  function buildAndShowHomeHTML (categories) {
    global.$ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      (homeHtml) => {
        const chosenCategoryShortName = chooseRandomCategory(categories)
        const changedHtml = insertProperty(homeHtml, 'randomCategoryShortName', `'${chosenCategoryShortName.short_name}'`)
        console.log(changedHtml)
        insertHTML('#main-content', changedHtml)
      },
      false)
  }

  document.addEventListener('DOMContentLoaded', (event) => {
    showLoading('#main-content')
    global.$ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowHomeHTML, true)
  })

  dc.loadMenuCategories = () => {
    showLoading('#main-content')
    global.$ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML)
  }

  dc.loadMenuItems = (categoryShort) => {
    showLoading('#main-content')
    global.$ajaxUtils.sendGetRequest(
      menuItemUrl + categoryShort,
      buildAndShowMenuItemsHTML
    )
  }
  global.$dc = dc
})(window)
