export enum Endpoins {
    //auth
    //api/auth
    regiter = '/register',
    sendOtp = '/otp',
    checkOtp = '/verifyOtp',
    changePassword = '/change',
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
    //phoneVariant
    addPhoneVariant = '/add',
    //orderItem
    addOrderItemtoCart = '/addtocart',
    getOrderItemCart = '/order-item-cart',
    bestSellingPhone = '/best',
    //slide
    addSlide = '/add',
    getAllSlides = '/slides',
    //orders
    directOrder = '/direct-order',
    updateInfoOrder = '/update',
    cancleOrder = '/cancle',
    //reviews
    addReview = '/add',
}
