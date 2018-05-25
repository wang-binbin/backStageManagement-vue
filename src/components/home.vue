<template>
<div class="homepage">

	<titlee/>
	<tab/>
	<register/>
	<pass/>
</div>
</template>

<script>
import titlee from './home/title'
import tab from './home/tab'
import register from './home/register'
import pass from './home/pass'
export default {
	name:"homepage",
	components: {
    titlee,
    tab,
    register,
    pass,
}
}
</script>

<style>
</style>