<template>
    <div class="tv">
        <h1>Films &amp; Série</h1>
        <div class="tv-list" v-if="isLoaded">
            <div class="item" v-for="(item, index) in watch" :key="index">
                <!-- <router-link :to="'/TV/' + item.id"> -->
                {{ item.title }}
                <!-- </router-link>' -->
                <div class="actions">
                    <ButtonRouter :path="'/TV/edit/' + item.id">
                        <Edit />
                    </ButtonRouter>
                    <Button asIcon @click.native="removeItem(item.id)">
                        <Remove />
                    </Button>
                </div>
            </div>
            <br />
        </div>
        <ButtonRouter path="TV/add">
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
    name: 'TV',
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
            watch: [],
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
                .collection('tv')
                .get()
                .then(list => {
                    list.forEach(item =>
                        this.watch.push({
                            title: item.get('title'),
                            id: item.id,
                        })
                    )
                })
        },
        removeItem(id) {
            database
                .collection('tv')
                .doc(id)
                .delete()
                .then((this.watch = []))
                .then(this.getSummary())
        },
    },
}
</script>

<style lang="scss" scoped>
.tv-list {
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
