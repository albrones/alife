<template>
	<div>
		<div class="music-form-content">
			<div class="header">
				<ButtonRouter class="button-router" path="/music">
					<Chevron />
				</ButtonRouter>
				<div class="title">
					<h1 v-if="!isForEdit">Ajouter une musique</h1>
					<h1 v-if="isForEdit">
						Editer la musique: {{ music.title }}
					</h1>
				</div>
			</div>
			<div class="music-form">
				<InputText name="title" v-model="music.title">
					Titre
				</InputText>
				<InputText name="artiste" v-model="music.artiste">
					Artiste
				</InputText>
				<Button v-if="!isForEdit" @click.native="addMusic()">
					Ajouter
				</Button>
				<Button v-if="isForEdit" @click.native="editMusic()">
					Editer
				</Button>
			</div>
		</div>
	</div>
</template>

<script>
import database from "@/firebase/db";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import Chevron from "@/components/ui/png/Chevron";
import ButtonRouter from "@/components/ui/ButtonRouter";

export default {
	name: "musicForm",
	components: {
		InputText,
		Button,
		Chevron,
		ButtonRouter,
	},
	data() {
		return {
			isForEdit: false,
			idMusic: this.$route.params.id,
			music: {
				title: "",
				artiste: "",
			},
		};
	},
	mounted() {
		if (this.$route.params.id) {
			this.isForEdit = true;
			this.getMusicToEdit(this.idMusic);
		}
	},
	methods: {
		addMusic() {
			const { title, artiste } = this.music;
			if (title !== "") {
				database
					.collection("music")
					.add({
						date: this.setCurrentDate(),
						// id: title,
						title,
						artiste,
					})
					.then((doc) => this.goToMusicFinished(doc.id));
			}
		},
		editMusic() {
			database
				.collection("music")
				.doc(this.idMusic)
				.set({
					...this.music,
					date: this.setCurrentDate(),
				})
				.then(this.goToMusicFinished(this.idMusic));
		},
		async getMusicToEdit() {
			await database
				.collection("music")
				.doc(this.idMusic)
				.get()
				.then((doc) => {
					this.music = doc.data();
				});
		},
		goToMusicFinished() {
			// this.$router.push({ path: `/music/${id}` }) //TODO: add fiche
			this.$router.push({ path: `/music` });
		},
		setCurrentDate() {
			return new Date().toLocaleString();
		},
	},
};
</script>

<style lang="scss" scoped>
/* TODO: use Grid or Flex to design correctly */
.music-form-content {
	display: flex;
	flex-direction: column;
	margin: 0 8px;
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
.music-form div {
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
