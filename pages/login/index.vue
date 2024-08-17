<script setup>
const visiblePassword = ref(false);

const userLoginInput = ref({
	email: "",
	password: "",
});

function userLoginSubmit() {
	console.log(userLoginInput.value);
}
</script>

<template>
	<UContainer
		:ui="{
			base: 'flex flex-col h-screen justify-center',
			constrained: 'max-w-xl',
		}">
		<div class="py-20 px-10 border rounded-md space-y-6">
			<h1 class="text-3xl">Sign In</h1>
			<UFormGroup
				v-slot="{ error }"
				label="Email"
				required
				:error="
					!userLoginInput.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
					'You must enter an valid email'
				"
				class="space-y-3">
				<UInput
					v-model="userLoginInput.email"
					placeholder="you@example.com"
					icon="i-heroicons-user" />
			</UFormGroup>
			<UFormGroup
				v-slot="{ error }"
				label="Password"
				required
				:error="!userLoginInput.password && 'You must enter a password'"
				class="space-y-3">
				<UButtonGroup orientation="horizontal" class="flex">
					<UInput
						v-model="userLoginInput.password"
						:placeholder="visiblePassword ? 'secretcode' : '••••••••••'"
						icon="i-heroicons-lock-closed"
						:type="visiblePassword ? 'text' : 'password'"
						class="flex-grow" />
					<UButton
						@click="visiblePassword = !visiblePassword"
						:icon="
							visiblePassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'
						"
						color="gray" />
				</UButtonGroup>
			</UFormGroup>
			<UButton
				@click="userLoginSubmit"
				label="Login"
				color="primary"
				variant="solid"
				size="lg"
				block />
		</div>
	</UContainer>
</template>
