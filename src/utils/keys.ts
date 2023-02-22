import { SetLoading } from '@/typings/common';
import type { InjectionKey } from 'vue';

export const KEY_LOADING = Symbol('loading') as InjectionKey<string>;
export const KEY_SET_LOADING = Symbol('setLoading') as InjectionKey<SetLoading>;
