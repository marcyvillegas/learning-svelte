<script lang="ts">
	export let label: string;
	export let name: string;
	export let type: string = 'text';
	export let value: string = '';
</script>

<label>
	{label}
	<input class="border border-blue-800 p-2" {...{ type }} {name} autocomplete="off" bind:value />
	<!-- {type} is not working so I used {...{ type }} -->
	<!-- { type } creates an object like { type: "text" }. ... destructures the attributes, that is, applies every property found in the object. -->
</label>
