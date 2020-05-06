<template>
    <div
        v-if="
            data.preparation !== '' || data.repos !== '' || data.cuisson !== ''
        "
    >
        <h3>Infos pratiques:</h3>
        <div class="infos-pratiques">
            <div v-if="data.preparation !== ''">
                Temps de préparation:
                <span>
                    <strong>
                        {{ data.preparation }}
                    </strong>
                </span>
            </div>
            <div v-if="data.repos !== ''">
                Temps de repos:
                <span>
                    <strong>
                        {{ data.repos }}
                    </strong>
                </span>
            </div>
            <div v-if="data.cuisson !== ''">
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
            required: false,
            default: () => ({ preparation: '', repos: '', cuisson: '' }),
        },
    },
}
</script>

<style lang="scss" scoped>
.infos-pratiques {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 16px;
    div {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-bottom: 8px;
        span {
            margin-left: 8px;
        }
    }
}
</style>
