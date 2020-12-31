<template>
	<div>
		<div class="content-recette-form">
			<div class="header">
				<ButtonRouter class="button-router" path="/recettes">
					<Chevron />
				</ButtonRouter>
				<div class="title">
					<h1 v-if="!isForEdit">Ajouter une recette</h1>
					<h1 v-if="isForEdit">
						Editer la recette: {{ recette.infosPrincipales.title }}
					</h1>
				</div>
			</div>
			<div class="recette-form">
				<InputText
					name="title"
					v-model="recette.infosPrincipales.title"
				>
					Titre
				</InputText>
				<InputText
					name="subtitle"
					v-model="recette.infosPrincipales.subtitle"
					optionnal
				>
					Soustitre
				</InputText>
				<Categories :value="recette.categories" />
				<div v-if="false">
					<label for="image">
						<h3>Image principal <span>(optionnel)</span></h3>
					</label>
					<input
						:value="recette.images[0]"
						type="file"
						name="image"
						id="image"
						v-on:input="searchText = $event.target.value"
					/>
					<!-- TODO:  @change="upload" -->
				</div>
				<div>
					<h3>Infos Pratique</h3>
					<InputText
						name="preparation"
						v-model="recette.infosPratiques.preparation"
					>
						Temps de préparation
					</InputText>
					<InputText
						name="repos"
						v-model="recette.infosPratiques.repos"
						optionnal
					>
						Temps de repos
					</InputText>
					<InputText
						name="cuisson"
						v-model="recette.infosPratiques.cuisson"
						optionnal
					>
						Temps de cuisson
					</InputText>
				</div>
				<InputTextMultiple
					name="materielConseille"
					:value="recette.materielConseille"
					optionnal
				>
					Matériel conseillé
				</InputTextMultiple>
				<div>
					<h3>Ingrédients</h3>
					<InputTextMultiple
						name="principaux"
						:value="recette.ingredients.principaux"
					>
						Principaux
					</InputTextMultiple>

					<Button
						v-if="!hasSecondPart"
						@click.native="addSecondPart()"
					>
						Ajouter deuxième partie
					</Button>
					<div v-if="hasSecondPart" class="ingredients-second-part">
						<InputText
							name="title2"
							v-model="recette.ingredients.secondaires.title"
						>
							Titre deuxième partie
						</InputText>
						<InputTextMultiple
							name="secondaires"
							:value="recette.ingredients.secondaires.data"
						>
							Secondaires
						</InputTextMultiple>
					</div>
				</div>
				<InputTextMultiple
					name="instructions"
					:value="recette.instructions"
				>
					Instructions
				</InputTextMultiple>
				<InputTextMultiple
					name="astuces"
					:value="recette.astuces"
					optionnal
				>
					Astuces
				</InputTextMultiple>
				<InputLinkMultiple
					name="variantes"
					:value="recette.variantes"
					optionnal
				>
					Variantes
				</InputLinkMultiple>
				<InputText name="video" v-model="recette.video">
					Vidéo YouTube
				</InputText>
				<InputText
					name="auteur"
					v-model="recette.infosPrincipales.auteur"
				>
					Auteur
				</InputText>
				<Button v-if="!isForEdit" @click.native="addRecette()">
					Ajouter recette
				</Button>
				<Button v-if="isForEdit" @click.native="editRecette()">
					Editer recette
				</Button>
			</div>
		</div>
	</div>
</template>

<script>
import Button from "@/components/ui/Button";
import ButtonRouter from "@/components/ui/ButtonRouter";
import Categories from "@/components/recette/Categories";
import Chevron from "@/components/ui/png/Chevron";
import database from "@/firebase/db";
import InputLinkMultiple from "@/components/ui/InputLinkMultiple";
import InputText from "@/components/ui/InputText";
import InputTextMultiple from "@/components/ui/InputTextMultiple";

export default {
	name: "RecetteForm",
	components: {
		Button,
		ButtonRouter,
		Categories,
		Chevron,
		InputLinkMultiple,
		InputText,
		InputTextMultiple,
	},
	data() {
		return {
			date: "",
			idRecette: this.$route.params.id,
			isForEdit: false,
			hasSecondPart: false,
			recette: {
				astuces: [],
				categories: [],
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
	async mounted() {
		if (this.$route.params.id) {
			this.isForEdit = true;
			await this.getRecetteToEdit(this.idRecette); // TODO: Export db usage in store ???
			const { secondaires } = this.recette.ingredients;
			if (secondaires && secondaires.title) {
				this.hasSecondPart = true;
			}
		}
	},
	methods: {
		upload(e) {
			//TODO
			e.preventDefault();
			const files = this.$$.avatar.files;
			const data = new FormData();
			// for single file
			data.append("avatar", files[0]);
			// Or for multiple files you can also do
			//  _.each(files, function(v, k){
			//    data.append('avatars['+k+']', v);
			// });

			// this.$http
			//     .post('/avatars/upload', data, function(data, status, request) {
			//         //handling
			//     })
			//     .error(function(data, status, request) {
			//         //handling
			//     })
		},
		addSecondPart() {
			this.hasSecondPart = true;
		},
		addRecette() {
			if (this.recette.title !== "") {
				this.normalizeVideoUrl();
				database
					.collection("recettes")
					.add({
						// id: title, //TODO: Set Title as id ?
						date: this.setCurrentDate(),
						...this.recette,
					})
					.then((doc) => this.goToRecetteFinished(doc.id));
			}
		},
		editRecette() {
			this.normalizeVideoUrl();
			database
				.collection("recettes")
				.doc(this.idRecette)
				.set({
					...this.recette,
					date: this.setCurrentDate(),
				})
				.then(this.goToRecetteFinished(this.idRecette));
		},
		async getRecetteToEdit() {
			await database
				.collection("recettes")
				.doc(this.idRecette)
				.get()
				.then((doc) => {
					this.recette = { ...this.recette, ...doc.data() };
				});
		},
		goToRecetteFinished(id) {
			this.$router.push({ path: `/recettes/${id}` });
		},
		setCurrentDate() {
			return new Date().toLocaleString();
		},
		normalizeVideoUrl() {
			this.recette.video = this.recette.video.replace(
				"watch?v=",
				"embed/"
			);
		},
	},
};
</script>

<style lang="scss" scoped>
/* TODO: use Grid or Flex to design correctly */
.content-recette-form {
	display: flex;
	flex-direction: column;
	margin: 0 8px;
}
.ingredients-second-part {
	width: 100%;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.button-router {
		flex-grow: 0;
	}
	.title {
		flex-grow: 1;
		margin: 0 50px;
	}
}
.recette-form div {
	margin-bottom: 16px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-items: stretch;
}
@media only screen and (max-width: 1024px) {
	/* For mobile phones: */
	.header .title {
		margin: 0 50px 0 0;
	}
}
</style>
