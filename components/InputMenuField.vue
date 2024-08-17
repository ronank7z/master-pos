<script setup>
const model = defineModel("model");
const prop = defineProps(["label", "name", "required", "model", "options"]);
const emit = defineEmits(["update:model"]);
</script>

<template>
	<UFormGroup :label="label" :name="name" :required="required">
		<UInputMenu v-model="model" :options="options" />
	</UFormGroup>
</template>
