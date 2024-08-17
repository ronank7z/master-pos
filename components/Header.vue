<script setup>
import Sidebar from "~/components/Sidebar.vue";

definePageMeta({
	layout: "admin-default",
});

const slideover = useSlideover();
const count = ref(0);
function openSlideover() {
	count.value += 1;
	slideover.open(Sidebar, {
		count: count.value,
		onClose: slideover.close,
	});
}
</script>

<template>
	<div class="flex items-center">
		<h1 class="font-bold text-3xl p-5">Master POS</h1>
		<UButton icon="i-heroicons-bars-3-20-solid" @click="openSlideover" />
	</div>
</template>
