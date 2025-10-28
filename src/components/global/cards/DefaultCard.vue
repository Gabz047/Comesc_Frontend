<script setup>
import { selectStatusIcon } from '@/utils/batch';

const props = defineProps({
    invoice: {
        type: [String, Number]
    },
    material_name: {
        type: String
    },
    amount: {
        type: [String, Number]
    },
    is_batch: {
        type: Boolean,
        default: false
    },
    image: {
        type: [String, "@/assets/images/tecido.jpeg"],
        default: null
    },
    status: {
        type: String
    }
})
</script>

<template>
    <div class="card-wrapper group">
        <!-- Badge de Status -->
        <div class="status-badge" v-if="is_batch">
            <i :class="selectStatusIcon(props.status)"></i>
        </div>

        <!-- Imagem do Card -->
        <div class="card-image-container">
            <img class="card-image" :src="image" alt="">
            <div class="card-overlay"></div>
        </div>

        <!-- Informações do Card -->
        <div class="card-info">
            <p class="card-invoice">Nº {{ props.invoice }}</p>
            <p class="card-material">{{ props.material_name }}</p>
            <p class="card-amount" v-if="props.amount">
                {{ props.amount }} {{ props.amount == 1 ? 'Peça' : 'Peças' }}
            </p>
        </div>

        <!-- Indicador de hover -->
        <div class="hover-indicator">
            <i class="mdi mdi-eye text-xl"></i>
        </div>
    </div>
</template>

<style scoped>
.card-wrapper {
    position: relative;
    width: 155px;
    height: 148px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 1024px) {
    .card-wrapper {
        width: 200px;
        height: 220px;
    }
}

.card-wrapper:hover {
    transform: translateY(-8px);
}

.card-wrapper:active {
    transform: translateY(-4px);
}

/* Badge de Status */
.status-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 30;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 8px;
    border-radius: 12px;
    font-size: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
}

.card-wrapper:hover .status-badge {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* Container da Imagem */
.card-image-container {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (min-width: 1024px) {
    .card-image-container {
        border-radius: 24px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
}

.card-wrapper:hover .card-image-container {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
}

/* Imagem */
.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-wrapper:hover .card-image {
    transform: scale(1.08);
}

/* Overlay Gradient */
.card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.3) 50%,
        rgba(0, 0, 0, 0.85) 100%
    );
    z-index: 10;
    transition: opacity 0.3s ease;
}

.card-wrapper:hover .card-overlay {
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        rgba(0, 0, 0, 0.9) 100%
    );
}

/* Informações do Card */
.card-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    padding: 12px;
    color: white;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    transition: transform 0.3s ease;
}

@media (min-width: 1024px) {
    .card-info {
        padding: 16px;
    }
}

.card-invoice {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@media (min-width: 1024px) {
    .card-invoice {
        font-size: 16px;
        margin-bottom: 6px;
    }
}

.card-material {
    font-size: 11px;
    font-weight: 500;
    margin-bottom: 2px;
    opacity: 0.95;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    line-height: 1.3;
}

@media (min-width: 1024px) {
    .card-material {
        font-size: 13px;
        margin-bottom: 4px;
    }
}

.card-amount {
    font-size: 10px;
    font-weight: 400;
    opacity: 0.9;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

@media (min-width: 1024px) {
    .card-amount {
        font-size: 12px;
    }
}

/* Indicador de Hover */
.hover-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 25;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: #261D47;
}

.card-wrapper:hover .hover-indicator {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}
</style>
