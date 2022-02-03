export let CONFIG: any = {
    //API_ENDPOINT: 'http://162.243.110.92:6018/',////BIT SERVER
    //CHAT_ENDPOINT: 'http://162.243.110.92:6039/',//// BIT SERVER
    //API_ENDPOINT: 'http://nodeserver.brainiuminfotech.com:6082/',

    //API_ENDPOINT: 'http://illtipadmin.com:6018/',/// CLIENT SERVER
// ================================================================================//
   //API_ENDPOINT: 'https://illtipadmin.com:3000/',/// CLIENT LIVE SERVER

    //API_ENDPOINT: 'http://18.191.93.75:6018/',/// CLIENT DEV SERVER
    
    // CHAT_ENDPOINT: 'http://illtipadmin.com:6039/',///CLIENT SERVER
    
    CHAT_ENDPOINT: 'https://illtipadmin.com:3001/',///CLIENT SERVER
    
    PUSH_CONFIG: {
        forceShow: true,
        android: {
            senderID: '320376428042'
        },
        ios: {
            alert: 'true',
            badge: false,
            sound: 'false'
        },
        windows: {}
    },
   
    GEOLOC_CONFIG: { enableHighAccuracy: false, timeout: 5000, maximumAge: 3000 },
    //STRIPE_KEY: 'pk_test_Gei5fDwmyCD2x9bPyonhfyX1'
    STRIPE_KEY:'pk_live_UyLsjCLLGDzrZr5g4YLNvBKS'

};
//# sourceMappingURL=config.js.map