<template>
    <div class="home">
        <h2>Bienvenue !</h2>
        <h3>Ce blog est en cours de construction.</h3>
        <div class="buttons">
            <ButtonRouter class="home-button-router" path="/recettes">
                Recettes
            </ButtonRouter>
            <ButtonRouter class="home-button-router" path="/films">
                Films
            </ButtonRouter>
            <ButtonRouter class="home-button-router" path="/series">
                Séries
            </ButtonRouter>
            <ButtonRouter class="home-button-router" path="/musique">
                Musique
            </ButtonRouter>
        </div>
        <h3>
            Merci de suivre les instructions suivantes:
        </h3>
        <ol>
            <li>
                <b
                    >Vider le cache navigateur manuellement pour avoir la
                    dernière version:</b
                >
                Si vous êtes sur Mac il y a le raccourci "Cmd+Shift+R" (sur
                Windows Ctrl+Shift+R)
            </li>
        </ol>
    </div>
</template>

<script>
import ButtonRouter from '@/components/ui/ButtonRouter'

export default {
    name: 'Home',
    components: {
        ButtonRouter,
    },
}
</script>

<style lang="scss" scoped>
.buttons {
    margin: 100px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.home-button-router {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: 2px solid #42b983;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: 600;
    margin: 16px 16px;
}
</style>
