<template>
	<div class="cinema">
		<div class="films">
			<h1>Films</h1>
			<div class="films-list" v-if="isLoaded">
				<div class="item" v-for="(item, index) in films" :key="index">
					<!-- <router-link :to="'/films/' + item.id"> -->
					<div class="title">
						{{ item.title }}
					</div>
					<!-- </router-link>' -->
					<div class="actions">
						<ButtonRouter :path="'/films/edit/' + item.id">
							<Edit />
						</ButtonRouter>
						<Button asIcon @click.native="showModal(item, 'films')">
							<Remove />
						</Button>
					</div>
				</div>
				<br />
			</div>
			<ButtonRouter path="films/add">
				<Add />
			</ButtonRouter>
		</div>
		<div class="series">
			<h1>Séries</h1>
			<div class="series-list" v-if="isLoaded">
				<div class="item" v-for="(item, index) in series" :key="index">
					<!-- <router-link :to="'/series/' + item.id"> -->
					<div class="title">
						{{ item.title }}
					</div>
					<!-- </router-link>' -->
					<div class="actions">
						<ButtonRouter :path="'/series/edit/' + item.id">
							<Edit />
						</ButtonRouter>
						<Button
							asIcon
							@click.native="showModal(item, 'series')"
						>
							<Remove />
						</Button>
					</div>
				</div>
				<br />
			</div>
			<ButtonRouter path="series/add">
				<Add />
			</ButtonRouter>
		</div>
		<Modal
			v-show="isModalVisible"
			@close="closeModal"
			@action="removeItem(itemFamily)"
			:title="modalCinemaTitle"
		/>
	</div>
</template>

<script>
// @ is an alias to /src
import database from "@/firebase/db";
import Button from "@/components/ui/Button";
import ButtonRouter from "@/components/ui/ButtonRouter";
import Edit from "@/components/ui/png/Edit";
import Add from "@/components/ui/png/Add";
import Remove from "@/components/ui/png/Remove";
import Modal from "@/components/ui/Modal";

export default {
	name: "Films",
	components: {
		Button,
		ButtonRouter,
		Edit,
		Add,
		Remove,
		Modal,
	},
	data() {
		return {
			isLoaded: false,
			films: [],
			series: [],
			isModalVisible: false,
			idItemToRemove: null,
			itemFamily: null,
			modalItemTitle: "",
		};
	},
	mounted() {
		this.getSummary();
	},
	methods: {
		async getSummary() {
			this.isLoaded = false;
			// TODO: Export db usage in store ???
			const getFilms = database
				.collection("films")
				.get()
				.then((list) => {
					list.forEach((item) =>
						this.films.push({
							title: item.get("title"),
							id: item.id,
						})
					);
				});

			const getSeries = database
				.collection("series")
				.get()
				.then((list) => {
					list.forEach((item) =>
						this.series.push({
							title: item.get("title"),
							id: item.id,
						})
					);
				});

			await Promise.all([getFilms, getSeries]).then(
				(this.isLoaded = true)
			);
		},

		async removeItem(itemFamily) {
			await database
				.collection(itemFamily)
				.doc(this.idItemToRemove)
				.delete()
				.then((this.films = []))
				.then((this.series = []))
				.then(this.closeModal);
			this.getSummary();
		},
		showModal(item, itemFamily) {
			this.isModalVisible = true;
			const { id, title } = item;
			this.idItemToRemove = id;
			this.itemFamily = itemFamily;
			this.modalItemTitle = title;
		},
		closeModal() {
			this.isModalVisible = false;
			this.idItemToRemove = null;
			this.itemFamily = null;
			this.modalItemTitle = null;
		},
	},
};
</script>

<style lang="scss" scoped>
.films-list,
.series-list {
	margin: 30px;
	display: flex;
	flex-direction: column;
	width: 100%;
}
.series {
	margin-top: 56px;
}
.item {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 0 16px 16px 16px;
	a,
	.title {
		font-size: 20px;
		font-weight: bold;
		color: #2c3e50;
		flex-grow: 1;
		flex-shrink: 1;
		margin-right: 16px;
		display: flex;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
	.actions {
		flex-grow: 0;
		flex-shrink: 0;
	}
}
</style>
