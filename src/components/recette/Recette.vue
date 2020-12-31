<template>
	<div class="content-recette" v-if="isLoaded">
		<InfosPrincipales
			:data="recette.infosPrincipales"
			:date="recette.date"
		/>
		<Categories :value="recette.categories" :isDisplay="true" />
		<ImageRecette :data="recette.images" />
		<InfosPratiques :data="recette.infosPratiques" />
		<MaterielConseille :data="recette.materielConseille" />
		<Ingredients :data="recette.ingredients" />
		<Instructions :data="recette.instructions" />
		<Astuces :data="recette.astuces" />
		<Variantes :data="recette.variantes" />
		<Video :data="recette.video" />
		<!-- TODO:
            Autres Photos (galerie)
         -->
		<ButtonRouter
			class="button-edit"
			:path="'/recettes/edit/' + recette.id"
		>
			<Edit />
		</ButtonRouter>
	</div>
</template>

<script>
import database from "@/firebase/db";

import Astuces from "@/components/recette/Astuces";
import ButtonRouter from "@/components/ui/ButtonRouter";
import Categories from "@/components/recette/Categories";
import Edit from "@/components/ui/png/Edit";
import ImageRecette from "@/components/recette/ImageRecette";
import InfosPratiques from "@/components/recette/InfosPratiques";
import InfosPrincipales from "@/components/recette/InfosPrincipales";
import Ingredients from "@/components/recette/Ingredients";
import Instructions from "@/components/recette/Instructions";
import MaterielConseille from "@/components/recette/MaterielConseille";
import Variantes from "@/components/recette/Variantes";
import Video from "@/components/recette/Video";

export default {
	name: "Recette",
	components: {
		Astuces,
		ButtonRouter,
		Categories,
		Edit,
		ImageRecette,
		InfosPratiques,
		InfosPrincipales,
		Ingredients,
		Instructions,
		MaterielConseille,
		Variantes,
		Video,
	},
	data() {
		return {
			isLoaded: false,
			recette: {
				astuces: [],
				categories: [],
				date: "",
				id: this.$route.params.id,
				images: [],
				infosPratiques: { preparation: "", repos: "", cuisson: "" },
				infosPrincipales: { auteur: "", subtitle: "", title: "" },
				ingredients: {
					principaux: [],
					secondaires: {
						data: [],
						title: "",
					},
				},
				instructions: [],
				materielConseille: [],
				variantes: [],
				video: "",
			},
		};
	},
	async created() {
		await this.getRecetteById(); // TODO: Export db usage in store ???
		this.isLoaded = true;
	},
	methods: {
		async getRecetteById() {
			const path = this.$route.params.id;

			await database
				.collection("recettes")
				.doc(path)
				.get()
				.then((doc) => {
					this.recette = { ...this.recette, ...doc.data() };
				});
		},
	},
};
</script>

<style scoped>
/* TODO: use Grid or Flex to design correctly */
@media only screen and (max-width: 1024px) {
	/* For mobile phones: */
	/* .content-recette {
        margin: 0 8px;
    } */
}
.content-recette {
	align-items: unset;
}
.button-edit {
	align-self: center;
	margin: 16px 0;
}
</style>
