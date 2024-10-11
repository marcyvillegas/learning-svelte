<script lang="ts">
	export let label: string;
	export let name: string;
	export let type: string = 'text';
</script>

<label>
	{label}
	<input {type} {name} autocomplete="off" />
</label>
