import { mount } from '@vue/test-utils'
import { nextTick } from 'vue';
import AutoComplete from './AutoComplete.vue'

test('component mounts', async () => {
  expect(AutoComplete).toBeTruthy()
})

test('input is cleared on button click', async () => {
  const wrapper = mount(AutoComplete)
  const input = wrapper.find('input')
  input.setValue('test')
  await nextTick()
  wrapper.find('button').trigger('click')
  await nextTick()
  expect(input.element.value).toBe('')
})