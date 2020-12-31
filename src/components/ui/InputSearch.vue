<template>
	<div class="input-search">
		<input
			v-model="valueModel"
			name="search"
			id="search"
			placeholder="Rechercher..."
		/>
	</div>
</template>

<script>
export default {
	name: "InputSearch",
	props: {
		value: {
			type: String,
			required: true,
		},
	},
	computed: {
		valueModel: {
			get: function() {
				return this.value;
			},
			set: function(val) {
				this.$emit("input", val);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.input-search {
	width: 100%;
}
input {
	width: 100%;
	border: #42b983 1px solid;
	border-radius: 12px;
	padding: 5px;
}
</style>
