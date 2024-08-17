<script setup>
import AddModal from "~/components/AddModal.vue";
import DeleteModal from "~/components/DeleteModal.vue";
import EditModal from "~/components/EditModal.vue";

definePageMeta({
	layout: "admin-default",
});

const role = ["Operator", "Staff", "Manager", "Leader"];
const toast = useToast();
const modal = useModal();
const columns = [
	{
		key: "id",
		label: "ID",
	},
	{
		key: "name",
		label: "Name",
		sortable: true,
	},
	{
		key: "email",
		label: "Email",
		sortable: true,
	},
	{
		key: "dateOfBirth",
		label: "Date Of Birth",
		sortable: true,
	},
	{
		key: "address",
		label: "Address",
		sortable: true,
	},
	{
		key: "phoneNumber",
		label: "Phone Number",
		sortable: true,
	},
	{
		key: "role",
		label: "Role",
	},
	{
		key: "action",
	},
];

async function fetchUsers() {
	return await $fetch("/api/users");
}

const dataUser = ref(null);
dataUser.value = await fetchUsers();

const items = (row) => [
	[
		{
			label: "Edit",
			icon: "i-heroicons-pencil-square-20-solid",
			click: () => editModal(role, row),
		},
		{
			label: "Delete",
			icon: "i-heroicons-trash-20-solid",
			click: () => deleteModal(row),
		},
	],
];
const searchValue = ref("");

function addModal(role) {
	modal.open(AddModal, {
		role: role,
		async onSuccess(item) {
			modal.close();
			toast.add({
				title: "Success !",
				id: "modal-success",
				description: `User ${item.name} added`,
			});
			dataUser.value = await fetchUsers();
		},
		onCancel() {
			modal.close();
		},
	});
}

function deleteModal(item) {
	modal.open(DeleteModal, {
		item: item,
		async onSuccess() {
			modal.close();
			toast.add({
				title: "Success !",
				id: "modal-success",
				description: `User ${item.name} deleted`,
			});
			dataUser.value = await fetchUsers();
		},
		onCancel() {
			modal.close();
		},
	});
}

function editModal(role, item) {
	modal.open(EditModal, {
		role: role,
		item: item,
		async onSuccess() {
			modal.close();
			toast.add({
				title: "Success",
				id: "modal-success",
				description: `User ${item.name} edited!`,
			});
			dataUser.value = await fetchUsers();
		},
		onCancel() {
			modal.close();
		},
	});
}

const filteredRows = computed(() => {
	if (!searchValue.value) {
		return dataUser.value;
	}

	return dataUser.value.filter((user) => {
		return Object.values(user).some((value) => {
			return String(value)
				.toLowerCase()
				.includes(searchValue.value.toLowerCase());
		});
	});
});
</script>

<template>
	<UContainer
		:ui="{
			constrained: 'max-w-7xl',
		}">
		<h1 class="py-5 text-3xl font-bold">Users</h1>
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
			<UButton label="Add" class="px-5" @click="addModal(role)" />
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
	</UContainer>
</template>
