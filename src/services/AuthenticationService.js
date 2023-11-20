import Api from "@/services/Api";

export default {
    register(credential) {
        return Api().post('api/users/auth', credential)
    },
    login(credential){
        return Api().post('api/users/login', credential)
    },
    change(credential){
        const token = localStorage.getItem('token')
        return Api().put('api/users/login/change', credential,{
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    }
}

// AuthenticationService.register({
//     email: "test@gmail.com",
//     password: "123456"
// })