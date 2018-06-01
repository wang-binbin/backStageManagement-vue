<template>
<div class="homepage">

	<titlee/>
	<tab/>
	<register/>
	<pass/>

	<!--<ceshi/>-->

</div>
</template>

<script>
import titlee from './home/title'
import tab from './home/tab'
import register from './home/register'
import pass from './home/pass'

import ceshi from './ceshi'

export default {
	name:"homepage",
	components: {
    titlee,
    tab,
    register,
    pass,

    ceshi

}
}
</script>

<style>
</style>