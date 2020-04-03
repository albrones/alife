<template>
    <div>
        <h3>Matériel conseillé:</h3>
        <div class="materiel-conseille">
            <ul>
                <li>
                    <span><strong>Matériel 1</strong></span>
                </li>
                <li>
                    <span><strong>Matériel 2</strong></span>
                </li>
                <li>
                    <span><strong>Matériel 3</strong></span>
                </li>
                <li>
                    <span><strong>Matériel 4</strong></span>
                </li>
                <li>
                    <span><strong>Matériel 5</strong></span>
                </li>
                <li>
                    <span><strong>Matériel 6</strong></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MaterielConseille',
}
</script>

<style scoped>
.materiel-conseille {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
li {
    text-align: initial;
}
li > span {
    margin-left: 20px;
}
</style>
