<template>
    <div class="cards-container">
        <slot></slot>
    </div>
</template>

<style scoped>
.cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 32px 16px;
    margin: 0 auto;
    max-width: 100%;
    justify-content: center;
}

/* Desktop - Aumenta o espaçamento */
@media (min-width: 1024px) {
    .cards-container {
        gap: 32px;
        padding: 48px 32px;
    }
}

/* Desktop grande - Ainda mais espaçamento */
@media (min-width: 1536px) {
    .cards-container {
        gap: 40px;
        padding: 56px 48px;
    }
}
</style>
