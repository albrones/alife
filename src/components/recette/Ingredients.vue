<template>
	<div>
		<h3>Ingrédients:</h3>
		<div class="ingredients">
			<ul>
				<li v-for="(ingredient, index) in data.principaux" :key="index">
					<span>{{ ingredient }}</span>
				</li>
			</ul>
		</div>
		<div v-if="hasSecondIngredientsListe">
			<h3>{{ data.secondaires.title }}</h3>
			<div class="ingredients">
				<ul>
					<li
						v-for="(ingredient, index) in data.secondaires.data"
						:key="index"
					>
						<span>{{ ingredient }}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Ingredients",
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	computed: {
		hasSecondIngredientsListe() {
			return Object.keys(this.data.secondaires).length > 0;
		},
	},
};
</script>

<style scoped>
.ingredients {
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
