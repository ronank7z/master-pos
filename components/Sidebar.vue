<script setup>
const props = defineProps({
	open: Boolean,
});

const emit = defineEmits(["close"]);

const links = [
	[
		{
			label: "Profile",
			avatar: {
				src: "https://avatars.githubusercontent.com/u/739984?v=4",
			},
			badge: 100,
		},
		{
			label: "Dashboard",
			icon: "i-heroicons-home",
			to: "/admin",
		},
		{
			label: "Analytics",
			icon: "i-heroicons-chart-bar",
			to: "/admin/analytics",
		},
		{
			label: "Users",
			icon: "i-heroicons-command-line",
			to: "/admin/users",
		},
		{
			label: "Warehouse",
			icon: "i-heroicons-light-bulb",
			to: "/admin/warehouse",
		},
	],
	[
		{
			label: "Examples",
			icon: "i-heroicons-light-bulb",
		},
		{
			label: "Help",
			icon: "i-heroicons-question-mark-circle",
		},
	],
];
</script>

<template>
	<USlideover side="left">
		<header class="p-5 flex items-center justify-between">
			<h1 class="text-2xl font-bold">Master POS</h1>
			<UButton
				color="gray"
				variant="ghost"
				x
				size="sm"
				icon="i-heroicons-x-mark-20-solid"
				class="flex"
				square
				padded
				@click="emit('close', false)" />
		</header>
		<UDivider />
		<div class="mt-5 flex-1">
			<UVerticalNavigation
				:links="links"
				:ui="{
					padding: 'px-5 py-4',
				}" />
		</div>
		<UDivider />
		<footer class="px-5 py-3 flex space-x-3 items-center">
			<UAvatar
				size="lg"
				src="https://avatars.githubusercontent.com/u/51354849?v=4"
				alt="Avatar" />
			<div class="flex-1">
				<p class="text-sm">Ronan Kitten</p>
				<p class="text-sm">ronan@masterpos.com</p>
			</div>
			<UButton
				color="red"
				variant="ghost"
				class="p-3"
				icon="i-heroicons-arrow-right-on-rectangle-20-solid" />
		</footer>
	</USlideover>
</template>
