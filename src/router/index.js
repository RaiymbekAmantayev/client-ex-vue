
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from  '@/components/HelloWorld.vue'
import RegisterForm from "@/components/RegisterForm.vue";
import LoginForm from "@/components/LoginForm.vue";
import SettingsComponent from "@/components/SettingsComponent.vue";
import SongsComponent from "@/components/SongsComponent.vue";
import CreateSongs from "@/components/CreateSongs.vue";
import SongDetail from "@/components/SongDetail.vue";
import UpdateSong from "@/components/UpdateSong.vue";
import FavSongs from "@/components/FavSongs.vue";


const routes = [{
    path: '/',
    component: HelloWorld
},
    {
        path: '/register',
        component: RegisterForm
    },
    {
        path: '/login',
        component: LoginForm
    },
    {
        path: '/settings',
        component: SettingsComponent
    },
    {
        path: '/songs',
        component: SongsComponent
    },
    {
        path: '/songs/:id',
        component: SongDetail
    },
    {
        path: '/songs/update/:id',
        component: UpdateSong
    },
    {
        path: '/create',
        component: CreateSongs
    },
    {
        path: '/fav',
        component: FavSongs
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})
export default router;
