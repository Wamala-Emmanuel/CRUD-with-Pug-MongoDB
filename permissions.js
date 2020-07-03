const user = {
    Administrator : {
        homepage: '/user/administrator',
        actions: ["can_create_customer", "can_view_customer"]
    },
    Employee : {
        homepage: '/user/employee',
        actions: ["can_create_customer", "can_view_customer_profile"]
    }
}

module.exports =  user;