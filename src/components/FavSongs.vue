<template>
  <div class="song-list">
    <h1>Songs</h1>
    <div class="song-container">
      <div v-for="book in bookmarks" :key="book.id" class="song-card">
        <div v-if="book.songs">
        <router-link :to="'/songs/' + book.songs.id">
          <img :src="'http://localhost:8081/' + (book.songs ? book.songs.image : '')" class="song-img" alt="Song Cover">
        </router-link>
        </div>
        <div class="song-info" v-if="book.songs">
          <h5 class="song-title">{{ book.songs.title }}</h5>
          <p class="song-artist">{{ book.songs.artist }}</p>
        </div>
        <ul class="song-details" v-if="book.songs">
          <li>Youtube ID: {{ book.songs.youtubeId }}</li>
          <li>Album: {{ book.songs.album }}</li>
          <li>Genre: {{ book.songs.genre }}</li>
        </ul>
        <div class="song-actions" v-if="book.songs">
          <router-link :to="'/songs/' + book.songs.id" class="song-link">Details</router-link>
        </div>
        <div v-if="$store.state.isUserLoggedIn">
          <button type="button" @click="remove_fav(book.songs.id)" class="btn btn-outline-primary">remove_fav</button>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import BookMark from "@/services/BookMark";

export default {
  data() {
    return {
      bookmarks: {
        songs: []
      }
    }
  },
  async mounted() {
    // const token = localStorage.getItem('token');
    try {
      const response = await BookMark.ShowAll();
      this.bookmarks = response.data;
      console.log("bookmark console is: ", this.bookmarks);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  },
  methods:{
    async remove_fav(songId) {
      console.log(songId)
      await BookMark.removeBook(songId)
      console.log(`successfully deleted ${songId}`)
      if (this.$store.state.isUserLoggedIn) {
        this.$router.push('/songs');
      }
    },
  },
  computed: {
    currentUsername() {
      return this.$store.state.user ? this.$store.state.user.email : null;
    }
  },
}
</script>

<style scoped>
.song-list {
  text-align: center;
}

.song-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.song-card {
  margin: 20px;
  max-width: 18rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.song-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.song-info {
  padding: 10px;
}

.song-title {
  font-size: 1.25rem;
  margin: 0;
}

.song-artist {
  font-size: 1rem;
  margin: 0;
  color: #555;
}

.song-details {
  list-style-type: none;
  padding: 0;
}

.song-details li {
  margin-bottom: 5px;
}

.song-actions {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
</style>