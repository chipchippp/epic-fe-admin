const getBaseUrl = (service) => {
    switch (service) {
        case 'user':
            return process.env.REACT_APP_BASE_URL_USER;
        case 'product':
            return process.env.REACT_APP_BASE_URL_PRODUCT;
        case 'order':
            return process.env.REACT_APP_BASE_URL_ORDER;
        case 'inventory':
            return process.env.REACT_APP_BASE_URL_INVENTORY;
        case 'design':
            return process.env.REACT_APP_BASE_URL_DESIGN;
        case 'gateway':
            return process.env.REACT_APP_BASE_URL_GATEWAY;
        default:
            return process.env.REACT_APP_BASE_URL;
    }
};
 
export default getBaseUrl;