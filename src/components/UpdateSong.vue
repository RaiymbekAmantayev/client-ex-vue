<template>
  <h1>Edit Song</h1>
  <form @submit.prevent="update" enctype="multipart/form-data">
    <div class="input-group mb-3">
      <input v-model="formData.title" type="text" class="form-control" placeholder="title" aria-label="Username" aria-describedby="basic-addon1">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">@</span>
      <input v-model="formData.artist" type="text" class="form-control" placeholder="artist name" aria-label="Recipient's username" aria-describedby="basic-addon2">
    </div>

    <div class="mb-3">
      <label for="basic-url" class="form-label">Genre</label>
      <div class="input-group">
        <span class="input-group-text" id="basic-addon3"></span>
        <input v-model="formData.genre" type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
      </div>
      <div class="form-text" id="basic-addon4">album</div>
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">Напишите альбом песни</span>
      <input v-model="formData.album" type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
    </div>
    <span>Добавьте фото альбома</span>
    <div class="input-group mb-3">
      <div>
        <label for="image">Image:</label>
        <input type="file" v-on:change="handleFileUpload" required>
      </div>
      <span class="input-group-text">@</span>
      <input v-model="formData.youtubeId" type="text" class="form-control" placeholder="youtubeId" aria-label="Server">
    </div>

    <div class="input-group">
      <span class="input-group-text">Lyrics</span>
      <textarea v-model="formData.lyrics" class="form-control" aria-label="With textarea"></textarea>
    </div>
    <div class="input-group">
      <span class="input-group-text">Tab</span>
      <textarea v-model="formData.tab" class="form-control" aria-label="With textarea"></textarea>
    </div>
    <div v-if="$store.state.isUserLoggedIn && currentUsername == 'amantayev'">
      <button type="submit" class="btn btn-outline-primary">Edit</button>
    </div>
  </form>

</template>
<script>
import SongsService from "@/services/SongsService";

export default {
  data() {
    return {
      formData:{
        title: '',
        artist: '',
        genre: '',
        album: '',
        image: null,
        youtubeId: '',
        lyrics: '',
        tab: ''
      }
    }
  },
  async mounted() {
    try {
      const songId = this.$route.params.id;
      const response = await SongsService.Show(songId);
      console.log(response)
      this.formData.title = response.data.title
      this.formData.artist = response.data.artist
      this.formData.genre = response.data.artist
      this.formData.album = response.data.album
      this.formData.image = response.data.image
      this.formData.youtubeId = response.data.youtubeId
      this.formData.lyrics = response.data.lyrics
      this.formData.tab = response.data.tab

    }catch (err){
      console.log(err)
    }
  },
methods:{
  handleFileUpload(event) {
    this.formData.image = event.target.files[0];
  },
  async update(){
    try{
      const formData = new FormData();
      const songId = this.$route.params.id;
      formData.append('title', this.formData.title);
      formData.append('artist', this.formData.artist);
      formData.append('genre', this.formData.genre);
      formData.append('album', this.formData.album);
      formData.append('youtubeId', this.formData.youtubeId);
      formData.append('image', this.formData.image);
      formData.append('lyrics', this.formData.lyrics);
      formData.append('tab', this.formData.tab);

      const response = await SongsService.UpdateSong(songId, formData);
      console.log(response.data)
      this.title = '';
      this.artist = '';
      this.genre = '';
      this.album = '';
      this.youtubeId = '';
      this.lyrics = '';
      this.tab = '';
      this.image = null;
      if(this.$store.state.isUserLoggedIn){
        this.$router.push('/songs');
      }
    }catch (err){
      console.log(err)
    }
  }
},
  computed: {
    currentUsername() {
      return this.$store.state.user ? this.$store.state.user.email : null;
    }
  }
}
</script>