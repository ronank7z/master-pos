<script setup>
import { format } from "date-fns";

const prop = defineProps({
	role: {
		type: Array,
	},
});

const loading = ref(false);

const userFormInput = ref({
	name: "",
	email: "",
	dateOfBirth: new Date(),
	address: "",
	phoneNumber: "",
	role: prop.role[0],
});

const emit = defineEmits(["success", "cancel"]);

async function onSubmit() {
	loading.value = true;
	await $fetch("/api/users", {
		method: "post",
		body: userFormInput.value,
	});
	onSuccess(userFormInput.value);
}

function onSuccess(user) {
	loading.value = false;
	emit("success", user);
}

function onCancel() {
	emit("cancel");
}
</script>

<template>
	<UModal>
		<div class="flex justify-end">
			<UButton
				color="gray"
				variant="soft"
				size="sm"
				icon="i-heroicons-x-mark-20-solid"
				class="rounded-full m-3"
				padded
				@click="onCancel" />
		</div>
		<div class="p-4 space-y-6">
			<UFormGroup label="Name" required class="space-y-3">
				<UInput
					v-model="userFormInput.name"
					placeholder="John Doe"
					icon="i-heroicons-user" />
			</UFormGroup>
			<UFormGroup label="Email" required class="space-y-3">
				<UInput
					v-model="userFormInput.email"
					placeholder="you@example.com"
					icon="i-heroicons-envelope" />
			</UFormGroup>
			<UFormGroup label="Date of birth" required class="space-y-3">
				<UPopover :popper="{ placement: 'bottom-start' }">
					<UButton
						icon="i-heroicons-calendar-days-20-solid"
						:label="format(userFormInput.dateOfBirth, 'yyy-MM-d')" />

					<template #panel="{ close }">
						<DatePicker
							v-model="userFormInput.dateOfBirth"
							is-required
							@close="close" />
					</template>
				</UPopover>
			</UFormGroup>
			<UFormGroup label="Address" required class="space-y-3">
				<UInput
					v-model="userFormInput.address"
					placeholder="St. 123"
					icon="i-heroicons-home" />
			</UFormGroup>
			<UFormGroup label="Phone number" required class="space-y-3">
				<UInput
					v-model="userFormInput.phoneNumber"
					placeholder="+628xxxxxxxxxxxx"
					icon="i-heroicons-phone" />
			</UFormGroup>
			<UFormGroup label="Role" required class="space-y-3">
				<UInputMenu v-model="userFormInput.role" :options="prop.role" />
			</UFormGroup>
			<div class="flex justify-end space-x-3">
				<UButton
					label="Confirm"
					color="primary"
					variant="solid"
					size="lg"
					:loading="loading"
					:disabled="loading"
					@click="onSubmit" />
				<UButton
					label="Cancel"
					color="red"
					variant="soft"
					size="lg"
					:disabled="loading"
					@click="onCancel" />
			</div>
		</div>
	</UModal>
</template>
