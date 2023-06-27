$cataloGrid = $(".catalog-grid")
$cataloGrid.imagesLoaded(function () {
  $cataloGrid.masonry({
    horizontalOrder: true,
    gutter: gutterMasonry,
    itemSelector: ".catalog-grid__item",
    columnWidth: '.catalog-grid__item',
    lazyLoad: true,
  });
})
$coolGoods = $(".coll-goods")
$coolGoods.imagesLoaded(function () {
  $coolGoods.masonry({
    horizontalOrder: true,
    gutter: gutterMasonryColl,
    itemSelector: ".coll-goods__item",
    columnWidth: '.coll-goods__item',
    lazyLoad: true,
  });
})
$cardItems = $(".card-items")
$cardItems.imagesLoaded(function () {
  $cardItems.masonry({
    horizontalOrder: true,
    gutter: carditemGutter,
    itemSelector: ".card-item",
    columnWidth: '.card-item',
    lazyLoad: true,
  });
})