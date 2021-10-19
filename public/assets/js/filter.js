

$(document).ready(function() {
    var type = "";
    var priceMin = 0;
    var priceMax = 100000000;
    var products;
    $.ajax({
        url: `/filter/`,
        method:'POST',
        data: {type}
    }).then(res => {
        products = res.products;
    }).catch(err => console.log(err))
    $(document).find('.filter-checkbox').each(function() {
        $(this).on('click', ()=> {
                type = $(this).val()
                $.ajax({
                    url: `/filter/`,
                    method:'POST',
                    data: {type}
                }).then(res => {
                    products = res.products;
                    render()
                }).catch(err => console.log(err))
                
        })
    });
    $(document).find('.price-checkbox').each(function() {
        $(this).on('click', ()=> {
            priceMin = $(this).attr("min")
            priceMax = $(this).attr("max")
            render();
        })
    })

    function render(){
        $('.filter-product-results').empty()
                        for(var i = 0; i < products.length; i++){    
                            var price = products[i].price.slice(0,products[i].price.length-1).replace(/,/g,'')
                            if ( parseInt(price) <= priceMax && parseInt(price) >= priceMin){
                                var productItem = `
                                <div class="filter-col filter-col-3 currProduct" type="${products[i].prd_key}" price="${products[i].price}">   
                                    <div class="product-filter__card">
                                        <div class="product-filter-card__top">
                                            <img src="${products[i].img[0]}" alt="">
                                        </div>
                                        <div class="product-filter-card__bottom">
                                            <div class="product-filter-card__name">${products[i].name}</div>
                                            <div class="product-filter-card__price">${products[i].price}</div>
                                        </div>
                                    </div>          
                                </div>
                                `
                                $('.filter-product-results').append(productItem)
                            }                    
                        }
    }
})

