<template>
    <div>
        <h3>Infos pratiques:</h3>
        <div class="infos-pratiques">
            <div>
                Temps de préparation:
                <span>
                    <strong>
                        {{ data.preparation }}
                    </strong>
                </span>
            </div>
            <div>
                Temps de repos:
                <span>
                    <strong>
                        {{ data.repos }}
                    </strong>
                </span>
            </div>
            <div>
                Cuisson:
                <span>
                    <strong>
                        {{ data.cuisson }}
                    </strong>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InfosPratiques',
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style scoped>
.infos-pratiques {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
