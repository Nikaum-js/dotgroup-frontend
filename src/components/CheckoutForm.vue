<template>
  <div>
    <form @submit.prevent="handleSubmit" class="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-900/50 rounded-lg sm:rounded-xl border border-gray-800/50">
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-100 mb-4 sm:mb-6">Finalizar Compra</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div class="space-y-3 sm:space-y-4">
          <h3 class="text-base sm:text-lg font-medium text-gray-200 pb-1.5 sm:pb-2 border-b border-gray-700">Dados Pessoais</h3>
          
          <div>
            <label for="fullName" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
            <input
              v-model="form.fullName"
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Digite seu nome completo"
              class="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              :class="{ 'border-red-500': errors.fullName }"
            />
            <p v-if="errors.fullName" class="mt-1 text-xs sm:text-sm text-red-400">{{ errors.fullName }}</p>
          </div>

          <div>
            <label for="email" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              name="email"
              placeholder="exemplo@email.com"
              class="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-xs sm:text-sm text-red-400">{{ errors.email }}</p>
          </div>

          <div>
            <label for="phone" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Celular</label>
            <input
              v-model="form.phone"
              type="tel"
              id="phone"
              name="phone"
              maxlength="15"
              placeholder="(00) 00000-0000"
              @input="clearFieldError('phone')"
              class="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              :class="{ 'border-red-500': errors.phone }"
            />
            <p v-if="errors.phone" class="mt-1 text-xs sm:text-sm text-red-400">{{ errors.phone }}</p>
          </div>

          <div>
            <label for="cpf" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1">CPF</label>
            <input
              v-model="form.cpf"
              type="text"
              id="cpf"
              name="cpf"
              maxlength="14"
              placeholder="000.000.000-00"
              @input="clearFieldError('cpf')"
              class="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              :class="{ 'border-red-500': errors.cpf }"
            />
            <p v-if="errors.cpf" class="mt-1 text-xs sm:text-sm text-red-400">{{ errors.cpf }}</p>
          </div>
        </div>

        <div class="space-y-3 sm:space-y-4">
          <h3 class="text-base sm:text-lg font-medium text-gray-200 pb-1.5 sm:pb-2 border-b border-gray-700">Endereço de Entrega</h3>

          <div class="relative">
            <label for="zipCode" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1">CEP</label>
            <div class="relative">
              <input
                v-model="form.zipCode"
                type="text"
                id="zipCode"
                name="zipCode"
                maxlength="9"
                placeholder="00000-000"
                @input="clearFieldError('zipCode')"
                @blur="searchAddress"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                :class="{ 'border-red-500': errors.zipCode }"
              />
              <div v-if="isLoadingAddress" class="absolute right-3 top-1/2 -translate-y-1/2">
                <span class="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-b-2 border-red-500"></span>
              </div>
            </div>
            <p v-if="errors.zipCode" class="mt-1 text-xs sm:text-sm text-red-400">{{ errors.zipCode }}</p>
          </div>

          <div class="grid grid-cols-3 gap-3 sm:gap-4">
            <div class="col-span-2">
              <label for="street" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Rua</label>
              <input
                v-model="form.street"
                type="text"
                id="street"
                name="street"
                placeholder="Nome da rua"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                :class="{ 'border-red-500': errors.street }"
              />
              <p v-if="errors.street" class="mt-1 text-xs sm:text-sm text-red-400">{{ errors.street }}</p>
            </div>

            <div>
              <label for="number" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Número</label>
              <input
                v-model="form.number"
                type="text"
                id="number"
                name="number"
                placeholder="Nº"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                :class="{ 'border-red-500': errors.number }"
              />
              <p v-if="errors.number" class="mt-1 text-xs sm:text-sm text-red-400">{{ errors.number }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label for="complement" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Complemento</label>
              <input
                v-model="form.complement"
                type="text"
                id="complement"
                name="complement"
                placeholder="Apto, Bloco, etc (opcional)"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label for="neighborhood" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Bairro</label>
              <input
                v-model="form.neighborhood"
                type="text"
                id="neighborhood"
                name="neighborhood"
                placeholder="Nome do bairro"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                :class="{ 'border-red-500': errors.neighborhood }"
              />
              <p v-if="errors.neighborhood" class="mt-1 text-xs sm:text-sm text-red-400">{{ errors.neighborhood }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label for="city" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Cidade</label>
              <input
                v-model="form.city"
                type="text"
                id="city"
                name="city"
                placeholder="Nome da cidade"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                :class="{ 'border-red-500': errors.city }"
              />
              <p v-if="errors.city" class="mt-1 text-xs sm:text-sm text-red-400">{{ errors.city }}</p>
            </div>

            <div>
              <label for="state" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Estado</label>
              <input
                v-model="form.state"
                type="text"
                id="state"
                name="state"
                placeholder="UF"
                class="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm sm:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                :class="{ 'border-red-500': errors.state }"
              />
              <p v-if="errors.state" class="mt-1 text-xs sm:text-sm text-red-400">{{ errors.state }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 sm:mt-8 border-t border-gray-700 pt-4 sm:pt-6">
        <button
          type="submit"
          class="w-full md:w-auto px-6 sm:px-8 bg-red-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="flex items-center justify-center gap-1.5 sm:gap-2">
            <span class="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-t-2 border-b-2 border-white"></span>
            Processando...
          </span>
          <span v-else>Finalizar Compra</span>
        </button>
      </div>
    </form>

    <SuccessModal
      :show="showSuccessModal"
      @close="handleCloseModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { validateCPF, validateEmail, validatePhone, validateZipCode } from '../utils/validators';
import { formatCPF, formatPhone, formatZipCode } from '../utils/formatters';
import SuccessModal from './SuccessModal.vue';
import { useRouter } from 'vue-router';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  cpf: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  cpf?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

const form = reactive<FormData>({
  fullName: '',
  email: '',
  phone: '',
  zipCode: '',
  cpf: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: ''
});

const errors = reactive<FormErrors>({});
const isSubmitting = ref(false);
const isLoadingAddress = ref(false);
const showSuccessModal = ref(false);
const router = useRouter();

watch(() => form.phone, (newValue) => {
  form.phone = formatPhone(newValue);
});

watch(() => form.cpf, (newValue) => {
  form.cpf = formatCPF(newValue);
});

watch(() => form.zipCode, (newValue) => {
  form.zipCode = formatZipCode(newValue);
});

const clearFieldError = (field: keyof FormErrors) => {
  if (errors[field]) {
    errors[field] = undefined;
  }
};

const validateForm = () => {
  const newErrors: FormErrors = {};

  if (!form.fullName.trim()) {
    newErrors.fullName = 'Nome completo é obrigatório';
  }

  if (!form.email.trim()) {
    newErrors.email = 'Email é obrigatório';
  } else if (!validateEmail(form.email)) {
    newErrors.email = 'Email inválido';
  }

  if (!form.phone.trim()) {
    newErrors.phone = 'Celular é obrigatório';
  } else if (!validatePhone(form.phone)) {
    newErrors.phone = 'Celular inválido';
  }

  if (!form.cpf.trim()) {
    newErrors.cpf = 'CPF é obrigatório';
  } else if (!validateCPF(form.cpf)) {
    newErrors.cpf = 'CPF inválido';
  }

  if (!form.zipCode.trim()) {
    newErrors.zipCode = 'CEP é obrigatório';
  } else if (!validateZipCode(form.zipCode)) {
    newErrors.zipCode = 'CEP inválido';
  }

  if (!form.street.trim()) {
    newErrors.street = 'Rua é obrigatória';
  }

  if (!form.number.trim()) {
    newErrors.number = 'Número é obrigatório';
  }

  if (!form.neighborhood.trim()) {
    newErrors.neighborhood = 'Bairro é obrigatório';
  }

  if (!form.city.trim()) {
    newErrors.city = 'Cidade é obrigatória';
  }

  if (!form.state.trim()) {
    newErrors.state = 'Estado é obrigatório';
  }

  Object.assign(errors, newErrors);
  return Object.keys(newErrors).length === 0;
};

const searchAddress = async () => {
  if (!form.zipCode || !validateZipCode(form.zipCode)) {
    return;
  }

  isLoadingAddress.value = true;
  clearFieldError('zipCode');

  try {
    const response = await fetch(`https://viacep.com.br/ws/${form.zipCode.replace(/\D/g, '')}/json/`);
    const data = await response.json();

    if (data.erro) {
      errors.zipCode = 'CEP não encontrado';
      return;
    }

    form.street = data.logradouro;
    form.neighborhood = data.bairro;
    form.city = data.localidade;
    form.state = data.uf;
  } catch (error) {
    errors.zipCode = 'Erro ao buscar CEP';
  } finally {
    isLoadingAddress.value = false;
  }
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const handleCloseModal = () => {
  showSuccessModal.value = false;
  router.push('/');
};

defineOptions({
  name: 'CheckoutForm'
});
</script>

<script lang="ts">
export default {
  name: 'CheckoutForm'
};
</script>