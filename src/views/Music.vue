<template>
    <div class="music">
        <h1>Musique</h1>
        <div class="music-list" v-if="isLoaded">
            <div class="item" v-for="(item, index) in music" :key="index">
                <!-- <router-link :to="'/music/' + item.id"> -->
                <div class="title">
                    {{ item.title }}<br />
                    -<br />
                    {{ item.artiste }}
                </div>
                <!-- </router-link>' -->
                <div class="actions">
                    <ButtonRouter :path="'/music/edit/' + item.id">
                        <Edit />
                    </ButtonRouter>
                    <Button asIcon @click.native="showModal(item)">
                        <Remove />
                    </Button>
                </div>
            </div>
            <br />
        </div>
        <ButtonRouter path="music/add">
            <Add />
        </ButtonRouter>
        <Modal
            v-show="isModalVisible"
            @close="closeModal"
            @action="removeItem"
            :title="modalMusicTitle"
        />
    </div>
</template>

<script>
// @ is an alias to /src
import database from '@/firebase/db'
import Button from '@/components/ui/Button'
import ButtonRouter from '@/components/ui/ButtonRouter'
import Edit from '@/components/ui/png/Edit'
import Add from '@/components/ui/png/Add'
import Remove from '@/components/ui/png/Remove'
import Modal from '@/components/ui/Modal'

export default {
    name: 'Music',
    components: {
        Button,
        ButtonRouter,
        Edit,
        Add,
        Remove,
        Modal,
    },
    data() {
        return {
            isLoaded: false,
            music: [],
            isModalVisible: false,
            iMmusicToRemove: null,
            modalMusicTitle: '',
        }
    },
    mounted() {
        this.getSummary()
        this.isLoaded = true
    },
    methods: {
        async getSummary() {
            // TODO: Export db usage in store ???
            await database
                .collection('music')
                .get()
                .then(list => {
                    list.forEach(item =>
                        this.music.push({
                            title: item.get('title'),
                            artiste: item.get('artiste'),
                            id: item.id,
                        })
                    )
                })
        },
        removeItem() {
            database
                .collection('music')
                .doc(this.iMmusicToRemove)
                .delete()
                .then((this.music = []))
                .then(this.getSummary())
        },
        showModal(music) {
            this.isModalVisible = true
            const { id, title } = music
            this.idMusicToRemove = id
            this.modalMusicTitle = title
        },
        closeModal() {
            this.isModalVisible = false
            this.idMusicToRemove = null
            this.modalMusicTitle = null
        },
    },
}
</script>

<style lang="scss" scoped>
.music-list {
    margin: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
}
.item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 16px 16px 16px;
    a,
    .title {
        font-size: 20px;
        font-weight: bold;
        color: #2c3e50;
        flex-grow: 1;
        flex-shrink: 1;
        margin-right: 16px;
        display: flex;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
    .actions {
        flex-grow: 0;
        flex-shrink: 0;
    }
}
</style>
