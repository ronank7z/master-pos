<script setup>
const model = defineModel("model");

const prop = defineProps(["label", "name", "required", "icon", "dateLabel"]);
const emit = defineEmits(["update:model"]);

const date = computed({
	get: () => prop.model,
	set: (value) => {
		emit("update:model", value);
		emit("close");
	},
});

const maxDate = ref(new Date());
</script>

<template>
	<UFormGroup :label="label" :name="name" :required="required">
		<UPopover :popper="{ placement: 'bottom-start' }">
			<UButton :icon="icon" :label="dateLabel" />

			<template #panel="{ close }">
				<DatePicker
					v-model="date"
					:max-date="maxDate"
					is-required
					@close="close" />
			</template>
		</UPopover>
	</UFormGroup>
</template>
