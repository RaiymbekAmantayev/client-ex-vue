import Api from "@/services/Api";

export default {
    AllSongs() {
        const token = localStorage.getItem('token')
        return Api().get('api/songs/get', {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    },
    Show(songId) {
        const token = localStorage.getItem('token')
        return Api().get(`api/songs/get/${songId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    },
    AddSongs(credential) {
        const token = localStorage.getItem('token')
        return Api().post('api/songs/add', credential, {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    },
    UpdateSong(songId, credential){
        const token = localStorage.getItem('token')
        return Api().put(`api/songs/edit/${songId}`, credential, {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    },
    DeleteSong(songId){
        const token = localStorage.getItem('token')
        return Api().delete(`api/songs/del/${songId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Включаем токен в заголовки запроса
            }
        })
    }
}