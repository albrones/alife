<template>
    <div class="infos-pratiques">
        <h4>Infos pratiques:</h4>
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

<style></style>
