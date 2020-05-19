<template>
    <div class="home">
        <h2>Bienvenue !</h2>
        <h3>Ce blog est en cours de construction.</h3>
        <div class="buttons">
            <div>
                <ButtonRouter class="home-button-router" path="/recettes">
                    <Recettes />
                </ButtonRouter>
                Recettes
            </div>
            <div>
                <ButtonRouter class="home-button-router" path="/cinema">
                    <Cinema />
                </ButtonRouter>
                Cinema
            </div>
            <div>
                <ButtonRouter class="home-button-router" path="/music">
                    <Musique />
                </ButtonRouter>
                Musique
            </div>
            <div>
                <ButtonRouter class="home-button-router" path="/pomodoro">
                    <Pomodoro />
                </ButtonRouter>
                Pomodoro
            </div>
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
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
            >Freepik</a
        >
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com</a
        >
    </div>
</template>

<script>
import ButtonRouter from '@/components/ui/ButtonRouter'
import Musique from '@/components/ui/png/Musique'
import Recettes from '@/components/ui/png/Recettes'
import Cinema from '@/components/ui/png/Cinema'
import Pomodoro from '@/components/ui/png/Pomodoro'

export default {
    name: 'Home',
    components: {
        ButtonRouter,
        Recettes,
        Cinema,
        Musique,
        Pomodoro,
    },
}
</script>

<style lang="scss" scoped>
.buttons {
    margin: 100px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    div {
        display: flex;
        flex-direction: column;
        font-size: 16px;
        font-weight: 600;
    }
}
.home-button-router {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: 2px solid #42b983;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: 600;
    margin: 16px 24px 8px 24px;
}
</style>
