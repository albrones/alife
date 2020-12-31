<template>
	<transition name="modal-fade">
		<div class="modal-backdrop">
			<div class="modal">
				<!--                 <header class="modal-header">
                    <slot name="header">
                        {{ title }}
                    </slot>
                </header> -->
				<section class="modal-body">
					<slot name="body">
						Etes-vous sur de vouloir supprimer
						<strong> {{ title }} </strong> ?
					</slot>
				</section>
				<footer class="modal-footer">
					<slot name="footer">
						<Button class="btn-green" @click.native="action">
							Parfaitement
						</Button>

						<Button class="btn-close" @click.native="close">
							Close me!
						</Button>
					</slot>
				</footer>
			</div>
		</div>
	</transition>
</template>

<script>
import Button from "@/components/ui/Button";

export default {
	name: "modal",
	components: {
		Button,
	},
	props: {
		title: {
			type: String,
			required: false,
			default: "",
		},
	},
	methods: {
		close() {
			this.$emit("close");
		},
		action() {
			this.$emit("action");
		},
	},
};
</script>

<style>
/* TODO: Design modal & action buttons */
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	background: #ffffff;
	box-shadow: 2px 2px 20px 1px;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
}

.modal-header,
.modal-footer {
	padding: 15px;
	display: flex;
}

.modal-header {
	border-bottom: 1px solid #eeeeee;
	color: #4aae9b;
	justify-content: space-between;
}

.modal-footer {
	border-top: 1px solid #eeeeee;
	justify-content: flex-end;
}

.modal-body {
	position: relative;
	padding: 20px 10px;
}

.btn-close {
	/* border: none; */
	font-size: 20px;
	padding: 20px;
	margin-left: 20px;
	cursor: pointer;
	font-weight: bold;
	color: #4aae9b;
	background: transparent;
}

.btn-green {
	color: white !important;
	background: #4aae9b;
	border: 1px solid #4aae9b;
	border-radius: 2px;
}
.modal-fade-enter,
.modal-fade-leave-active {
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity 0.5s ease;
}
</style>
