export enum Endpoins {
    //auth
    //api/auth
    regiter = '/register',
    sendOtp = '/otp',
    checkOtp = '/verifyOtp',
    changePassword = '/change',
    changePasswordForget='/change-forget',
    login = '/log',
    logGoogle = '/google',
    logFacebook = '/facebook',
    googleCb = '/google/callback',
    facebookCb = '/auth/facebook/callback',
    //category
    addCategory = '/add',
    allCategories = '/categories',
    phoneByIdCategory = '/phone-category',
    deleteCategory = '/del',
    updateCategory = '/update',
    //discount
    addDiscount = '/add',
    getAlldiscount = '/discounts',
    deleteDiscount = '/del',
    updateDisCount = '/udpate',
    //config
    addConfig = '/add',
    deleteConfig = '/del',
    udpateConfig = 'udpate',
    //phone
    addPhone = '/add',
    allPhone = '/phones',
    phoneDetail = '/phone',
    addPhoneToWarehouse = '/add-to-store',
    getMassiveDiscount= '/massive-discount',
    getColorAndStore = '/color_store/:id',
    //color
    addColor = '/add',
    deleteColor = '/del',
    updateColor = '/update',
    //image
    addImage = '/add',
    updateImage = '/update',
    //storage
    addStorage = '/add',
    deleteStorage = '/del',
    updateStorage = '/update',
    allStorage = '/stores',
    //phoneVariant
    addPhoneVariant = '/add',
    getPriceSelect= '/price',
    //orderItem
    addOrderItemtoCart = '/addtocart',
    updateQuantity = '/update_quantity/:id',
    getOrderItemCart = '/order-item-cart',
    bestSellingPhone = '/best',
    deleteOrderItem = '/delete/:id',
    //slide
    addSlide = '/add',
    getAllSlides = '/slides',
    //orders
    directOrder = '/direct-order',
    updateInfoOrder = '/update',
    cancleOrder = '/cancle',
    allOrders = '/orders',
    detailOrder = '/detail-order',
    //reviews
    addReview = '/add',
    reviewInfo = '/review-info',
    //user 
    getUserLogin = '/get-user-login'
}
