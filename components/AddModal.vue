<script setup lang="ts">
import { format } from "date-fns";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
	name: z
		.string()
		.min(3, "Must be at least 3 character")
		.max(100, "Max character excedeed"),
	email: z.string().email("Invalid email").max(50, "Max character excedeed"),
	dateOfBirth: z.date(),
	address: z
		.string()
		.min(3, "Must be at least 3 character")
		.max(200, "Max character excedeed"),
	phoneNumber: z
		.string()
		.min(10, "Must be at least 10 character")
		.max(20, "Max character excedeed"),
	role: z.string(),
});

type Schema = z.output<typeof schema>;

const prop = defineProps({
	role: {
		type: Array,
	},
});

const loading = ref(false);

const userFormInput = ref({
	name: undefined,
	email: undefined,
	dateOfBirth: new Date(),
	address: undefined,
	phoneNumber: undefined,
	role: prop.role![0] || undefined,
});

const emit = defineEmits(["success", "cancel"]);

async function onSubmit(event: FormSubmitEvent<Schema>) {
	loading.value = true;
	await $fetch("/api/users", {
		method: "post",
		body: event.data,
	});
	onSuccess(event.data);
}

function onSuccess(user: Object) {
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
		<UForm
			:schema="schema"
			:state="userFormInput"
			@submit="onSubmit"
			class="p-4 space-y-6">
			<InputTextField
				label="Name"
				name="name"
				required
				v-model:model="userFormInput.name"
				placeholder="John Doe"
				icon="i-heroicons-user" />
			<InputTextField
				label="Email"
				name="email"
				required
				v-model:model="userFormInput.email"
				placeholder="you@example.com"
				icon="i-heroicons-envelope" />
			<InputDateField
				label="Date of birth"
				name="dateOfBirth"
				required
				v-model:model="userFormInput.dateOfBirth"
				:dateLabel="format(userFormInput.dateOfBirth, 'yyy-MM-dd')"
				icon="i-heroicons-calendar-days-20-solid" />
			<InputTextField
				label="Address"
				name="address"
				required
				v-model:model="userFormInput.address"
				placeholder="St. 123"
				icon="i-heroicons-home" />
			<InputTextField
				label="Phone number"
				name="phoneNumber"
				required
				v-model:model="userFormInput.phoneNumber"
				placeholder="+628xxxxxxxxxxxx"
				icon="i-heroicons-phone" />
			<InputMenuField
				label="Role"
				name="role"
				required
				v-model:model="userFormInput.role"
				:options="role" />
			<div class="flex justify-end space-x-3">
				<UButton
					type="submit"
					label="Confirm"
					color="primary"
					variant="solid"
					size="lg"
					:loading="loading"
					:disabled="loading" />
				<UButton
					label="Cancel"
					color="red"
					variant="soft"
					size="lg"
					:disabled="loading"
					@click="onCancel" />
			</div>
		</UForm>
	</UModal>
</template>
