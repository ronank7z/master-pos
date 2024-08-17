<script setup>
// import DeleteModal from "~/components/DeleteModal.vue";
// import EditModal from "~/components/EditModal.vue";
// import { format } from "date-fns";

// const date = ref(new Date());

definePageMeta({
	layout: "admin-default",
});

const toast = useToast();
const modal = useModal();
// const columns = [
// 	{
// 		key: "id",
// 		label: "ID",
// 	},
// 	{
// 		key: "name",
// 		label: "Name",
// 		sortable: true,
// 	},
// 	{
// 		key: "email",
// 		label: "Email",
// 		sortable: true,
// 	},
// 	{
// 		key: "dateOfBirth",
// 		label: "Date Of Birth",
// 		sortable: true,
// 	},
// 	{
// 		key: "address",
// 		label: "Address",
// 		sortable: true,
// 	},
// 	{
// 		key: "phoneNumber",
// 		label: "Phone Number",
// 		sortable: true,
// 	},
// 	{
// 		key: "role",
// 		label: "Role",
// 	},
// 	{
// 		key: "action",
// 	},
// ];

// const {
// 	data: {
// 		value: { user },
// 	},
// } = await useFetch("/api/users");

// const dataUser = ref(user);

// watchEffect(() => {
// 	console.log("table changed");
// });

// const items = (row) => [
// 	[
// 		{
// 			label: "Edit",
// 			icon: "i-heroicons-pencil-square-20-solid",
// 			click: () => editModal(role, row),
// 		},
// 		{
// 			label: "Delete",
// 			icon: "i-heroicons-trash-20-solid",
// 			click: () => deleteModal(row),
// 		},
// 	],
// ];

// const userFormInput = ref({
// 	name: "",
// 	email: "",
// 	dateOfBirth: "",
// 	address: "",
// 	phone: "",
// 	role: role[0],
// });
const isOpenAdd = ref(false);
const searchValue = ref("");

// function deleteModal(user) {
// 	modal.open(DeleteModal, {
// 		user: user,
// 		onSuccess() {
// 			modal.close();
// 			toast.add({
// 				title: "Success !",
// 				id: "modal-success",
// 				description: `Delete ${user.name}`,
// 			});
// 		},
// 		onCancel() {
// 			modal.close();
// 		},
// 	});
// }

// function editModal(role, user) {
// 	modal.open(EditModal, {
// 		role: role,
// 		user: user,
// 		onSuccess() {
// 			modal.close();
// 			toast.add({
// 				title: "Success",
// 				id: "modal-success",
// 				description: `User ${user.name} edited!`,
// 			});
// 		},
// 		onCancel() {
// 			modal.close();
// 		},
// 	});
// }

// const filteredRows = computed(() => {
// 	if (!searchValue.value) {
// 		return dataUser.value;
// 	}

// 	return dataUser.value.filter((user) => {
// 		return Object.values(user).some((value) => {
// 			return String(value)
// 				.toLowerCase()
// 				.includes(searchValue.value.toLowerCase());
// 		});
// 	});
// });

// async function onSubmit() {
// 	const { body } = await $fetch("/api/users", {
// 		method: "post",
// 		body: userFormInput.value,
// 	});
// }
</script>

<template>
	<UContainer
		:ui="{
			constrained: 'max-w-7xl',
		}">
		<h1 class="py-5 text-3xl font-bold">Warehouse</h1>
		<div class="flex justify-between py-3">
			<UInput
				v-model="searchValue"
				name="searchValue"
				placeholder="Search..."
				icon="i-heroicons-magnifying-glass-20-solid"
				autocomplete="off"
				:ui="{ icon: { trailing: { pointer: '' } } }">
				<template #trailing>
					<UButton
						v-show="searchValue !== ''"
						color="gray"
						variant="link"
						icon="i-heroicons-x-mark-20-solid"
						:padded="false"
						@click="searchValue = ''" />
				</template>
			</UInput>
			<UButton label="Add" class="px-5" @click="isOpenAdd = true" />
		</div>
		<UTable :columns="columns" :rows="filteredRows">
			<template #action-data="{ row }">
				<UDropdown :items="items(row)">
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-ellipsis-horizontal-20-solid" />
				</UDropdown>
			</template>
		</UTable>
		<UModal v-model="isOpenAdd" :prevent-close="true">
			<div class="flex justify-end">
				<UButton
					color="gray"
					variant="soft"
					size="sm"
					icon="i-heroicons-x-mark-20-solid"
					class="rounded-full m-3"
					padded
					@click="isOpenAdd = false" />
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
							:label="format(date, 'd MMM, yyy')" />

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
						v-model="userFormInput.phone"
						placeholder="+628xxxxxxxxxxxx"
						icon="i-heroicons-phone" />
				</UFormGroup>
				<UFormGroup label="Role" required class="space-y-3">
					<UInputMenu v-model="userFormInput.role" :options="role" />
				</UFormGroup>
				<div class="flex justify-end space-x-3">
					<UButton
						label="Confirm"
						color="primary"
						variant="solid"
						size="lg"
						@click="onSubmit" />
					<UButton
						label="Cancel"
						color="red"
						variant="soft"
						size="lg"
						@click="isOpenAdd = false" />
				</div>
			</div>
		</UModal>
	</UContainer>
</template>
