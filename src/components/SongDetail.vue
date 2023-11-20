<template>
  <div>
    <div>
    <img :src="'http://localhost:8081/' + song.image" class="song-img" alt="Song Cover">
    </div>
    <h1>{{ song.title }}</h1>
    <div>
      <p>Artist: {{ song.artist }}</p>
      <p>genre: {{ song.genre }}</p>
      <p>album: {{ song.album }}</p>
      <p>youtube: {{ song.youtubeId }}</p>
      <p>lyrics: {{ song.lyrics }}</p>
      <p>tab: {{ song.tab }}</p>      <!-- Добавьте другие свойства, которые вы хотите отобразить -->
    </div>
    <div v-if="$store.state.isUserLoggedIn && currentUsername == 'amantayev'">
      <button type="button" @click="Delete" class="btn btn-outline-primary">Delete</button>
    </div>
    <div v-if="$store.state.isUserLoggedIn && !isFav">
      <button type="button" @click="fav" class="btn btn-outline-primary">add_to_fav</button>

    </div>
    <div v-if="$store.state.isUserLoggedIn && isFav">
      <button type="button" @click="remove_fav" class="btn btn-outline-primary">remove_fav</button>
    </div>

  </div>
  <div v-for="book in bookmarks" :key="book.id" class="list-group">
      <div v-if="book.users" class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{book.users.email}}}</h5>
      </div>

    </div>
</template>

<script>
import SongsService from "@/services/SongsService";
import BookMark from "@/services/BookMark";


export default {
  data() {
    return {
      song: {},
      isFav: false,
      bookmarks:{
        users:[]
      }
    }
  },
  methods:{
  async Delete(){
    const songId = this.$route.params.id;
    await SongsService.DeleteSong(songId)
    if(this.$store.state.isUserLoggedIn){
      this.$router.push('/songs');
    }
  },
    async remove_fav() {
      const songId = this.$route.params.id;
      console.log(songId)
      await BookMark.removeBook(songId)
      console.log(`successfully deleted ${songId}`)
      if (this.$store.state.isUserLoggedIn) {
        this.$router.push('/fav');
      }
    },
    async fav() {
      const songId = this.$route.params.id;
      try {
          const response = await BookMark.Add({
            SongId:songId
          })
          console.log(response)
        if(this.$store.state.isUserLoggedIn){
          this.$router.push('/songs');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    try {
      const songId = this.$route.params.id;
      const response = await SongsService.Show(songId);
      console.log(response)
      this.song = response.data;
      const status = await BookMark.getBookmarkStatus(songId)
      this.isFav = status.data.isFavorite
      console.log('isfav is',this.isFav)
      console.log(this.song)
      const users = await BookMark.CheckUser(songId)
      this.bookmarks = users.data
      console.log("users console is: ", this.bookmarks);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  },
  computed: {
    currentUsername() {
      return this.$store.state.user ? this.$store.state.user.email : null;
    }
  }
}
</script>
