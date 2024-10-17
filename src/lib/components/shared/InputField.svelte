<script lang="ts">
	export let label: string;
	export let name: string;
	export let type: string = 'text';
</script>

<label>
	{label}
	<input class="border border-blue-800 p-2" {type} {name} autocomplete="off" />
</label>
