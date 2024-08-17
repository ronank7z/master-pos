<script setup lang="ts">
const prop = defineProps({
	item: {
		type: Object,
	},
});

const loading = ref(false);

const emit = defineEmits(["success", "cancel"]);

async function onDelete() {
	loading.value = true;
	await $fetch(`/api/users/${prop?.item?.id}`, {
		method: "delete",
	});
	onSuccess();
}

function onSuccess() {
	loading.value = false;
	emit("success");
}

function onCancel() {
	emit("cancel");
}
</script>

<template>
	<UModal>
		<UCard>
			<p>
				Confirm delete <span class="font-bold">{{ prop?.item?.name }}</span> ?
			</p>
			<div class="space-x-3 mt-5 flex justify-end">
				<UButton
					variant="solid"
					color="red"
					:loading="loading"
					:disabled="loading"
					@click="onDelete"
					>Delete</UButton
				>
				<UButton variant="soft" :disabled="loading" @click="onCancel"
					>Cancel</UButton
				>
			</div>
		</UCard>
	</UModal>
</template>
