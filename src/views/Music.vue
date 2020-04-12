<template>
    <div class="music">
        <h1>Musique</h1>
        <div class="music-list" v-if="isLoaded">
            <div class="item" v-for="(item, index) in music" :key="index">
                <!-- <router-link :to="'/music/' + item.id"> -->
                {{ item.title }}
                <!-- </router-link>' -->
                <div class="actions">
                    <ButtonRouter :path="'/music/edit/' + item.id">
                        <Edit />
                    </ButtonRouter>
                    <Button asIcon @click.native="removeItem(item.id)">
                        <Remove />
                    </Button>
                </div>
            </div>
            <br />
        </div>
        <ButtonRouter path="music/add">
            <Add />
        </ButtonRouter>
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

export default {
    name: 'Music',
    components: {
        Button,
        ButtonRouter,
        Edit,
        Add,
        Remove,
    },
    data() {
        return {
            isLoaded: false,
            music: [],
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
                            id: item.id,
                        })
                    )
                })
        },
        removeItem(id) {
            database
                .collection('music')
                .doc(id)
                .delete()
                .then((this.music = []))
                .then(this.getSummary())
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
    a {
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
