import Api from "@/services/Api";
export default {
    Add(credential) {
        const token = localStorage.getItem('token')
        return Api().post('api/books/add', credential, {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    },
    ShowAll(){
        const token = localStorage.getItem('token')
        return Api().get('api/books/get',  {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    },
    getBookmarkStatus(songId){
        const token = localStorage.getItem('token')
        return Api().get(`api/books/${songId}/status`,  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    removeBook(songId){
        const token = localStorage.getItem('token')
        console.log(token)
        return Api().delete(`api/books/del/${songId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    },
    CheckUser(songId){
        const token = localStorage.getItem('token')
        console.log(token)
        return Api().get(`api/books/get/${songId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    }

}