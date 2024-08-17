<script setup>
const model = defineModel("model");
const prop = defineProps([
	"label",
	"name",
	"required",
	"model",
	"placeholder",
	"icon",
]);
const emit = defineEmits(["update:model"]);
</script>

<template>
	<UFormGroup :label="label" :name="name" :required="required">
		<UInput v-model="model" :placeholder="placeholder" :icon="icon" />
	</UFormGroup>
</template>
