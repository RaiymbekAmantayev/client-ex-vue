<template>
  <div class="song-list">
    <h1>Songs</h1>
    <div v-if="songs" class="song-container">
      <div v-for="song in songs" :key="song.id" class="song-card">
        <router-link :to="'/songs/' + song.id"><img :src="'http://localhost:8081/' + song.image" class="song-img" alt="Song Cover"></router-link>
        <div class="song-info">
          <h5 class="song-title">{{ song.title }}</h5>
          <p class="song-artist">{{ song.artist }}</p>
        </div>
        <ul class="song-details">
          <li>Youtube ID: {{ song.youtubeId }}</li>
          <li>Album: {{ song.album }}</li>
          <li>Genre: {{ song.genre }}</li>
        </ul>
        <div class="song-actions">
          <div v-if="$store.state.isUserLoggedIn && currentUsername == 'amantayev'">
          <router-link :to="'/songs/update/' + song.id" class="song-link">Edit</router-link>
          </div>
          <router-link :to="'/songs/' + song.id" class="song-link">Details</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import SongsService from "@/services/SongsService";

export default {
  data() {
    return {
      songs: []
    }
  },
  async mounted() {
    // const token = localStorage.getItem('token');
    try {
      const response = await SongsService.AllSongs();
      this.songs = response.data;
      // console.log(this.songs);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  },
  computed: {
    currentUsername() {
      return this.$store.state.user ? this.$store.state.user.email : null;
    }
  }
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
