<template>
    <div class="article">
        <h1>Titre de recette</h1>
        <h3>Sous-titre traduit</h3>
        <!-- TODO: grisser / mettre en secondaire -->
        <div class="infos-pratiques">
            <!-- TODO: Componenting -->
            <h4>Infos pratiques:</h4>
            <div>
                Temps de préparation:<span><strong>X temps</strong></span>
            </div>
            <div>
                Temps de repos:<span><strong>X temps</strong></span>
            </div>
            <div>
                Temps de cuisson:<span><strong>X temps</strong></span>
            </div>
            <div>
                Difficulté:<span><strong>X X X . .</strong></span>
            </div>
            <!-- TODO: Difficultés en Etoile (svg) -->
            <div>
                Température de repos:<span><strong>X temps</strong></span>
            </div>
            <div>
                Température de cuisson:<span><strong>X temps</strong></span>
            </div>
            <div>
                <h4>Matériel conseillé:</h4>
                <ul>
                    <li>
                        <span><strong>Matériel 1</strong></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span><strong>Matériel 2</strong></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span><strong>Matériel 3</strong></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span><strong>Matériel 4</strong></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span><strong>Matériel 5</strong></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span><strong>Matériel 6</strong></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="image">
            <!-- TODO: Blur image foreground ? Crop automatic ? -->
            <img
                src="https://qph.fs.quoracdn.net/main-qimg-2ace80b379865482e878cb6aca57512d"
                alt="le gateau"
                style="width:500px"
            />
        </div>
        <div class="ingredients">
            <h4>Ingrédients:</h4>
            <ul>
                <li>
                    ingrédient 1: <span><strong>quantité 1</strong></span>
                </li>
                <li>
                    ingrédient 2: <span><strong>quantité 2</strong></span>
                </li>
                <li>
                    ingrédient 3: <span><strong>quantité 3</strong></span>
                </li>
                <li>
                    ingrédient 4: <span><strong>quantité 4</strong></span>
                </li>
                <li>
                    ingrédient 5: <span><strong>quantité 5</strong></span>
                </li>
                <li>
                    ingrédient 6: <span><strong>quantité 6</strong></span>
                </li>
                <li>
                    ingrédient 7: <span><strong>quantité 7</strong></span>
                </li>
                <li>
                    ingrédient 8: <span><strong>quantité 8</strong></span>
                </li>
                <li>
                    ingrédient 9: <span><strong>quantité 9</strong></span>
                </li>
            </ul>
        </div>
        <div class="instructions">
            <h4>Instuctions:</h4>
            <p>
                <span><strong>1)</strong></span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis ea tempora, error itaque nostrum pariatur officiis
                inventore? Beatae perferendis earum, aperiam excepturi enim
                molestias dolor sunt dolores reiciendis quam odit.
            </p>
            <p>
                <span><strong>2)</strong></span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis ea tempora, error itaque nostrum pariatur officiis
                inventore? Beatae perferendis earum, aperiam excepturi enim
                molestias dolor sunt dolores reiciendis quam odit.
            </p>
            <p>
                <span><strong>3)</strong></span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis ea tempora, error itaque nostrum pariatur officiis
                inventore? Beatae perferendis earum, aperiam excepturi enim
                molestias dolor sunt dolores reiciendis quam odit.
            </p>
        </div>
        <div class="astuces-variantes">
            <h4>ASTUCES:</h4>
            <div>
                <router-link to="">Astuce 1</router-link> |
                <router-link to="">Astuce 2</router-link> |
                <router-link to="">Astuce 3</router-link>
            </div>
            <h4>VARIANTES:</h4>
            <div>
                <router-link to="">Variante 1</router-link> |
                <router-link to="">Variante 2</router-link> |
                <router-link to="">Variante 3</router-link>
            </div>
        </div>
        <!-- TODO:
            Autres Photos (galerie)
         -->
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.ingredients,
.infos-pratiques,
.instructions,
.astuces-variantes {
    text-align: initial;
    margin: 0 300px 40px 300px;
}
.image {
    position: absolute;
    top: 250px;
    right: 320px;
}
</style>
