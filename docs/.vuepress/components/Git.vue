<template>
    <p>{{ n }}</p>
</template>

<script>
export default {
    name: "Git",
    setup() {
        const n = 123;
        return {
            n
        }
    }
}


</script>

<style scoped>

</style>