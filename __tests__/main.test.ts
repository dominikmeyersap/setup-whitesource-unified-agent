import * as installer from '../src/installer'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('throws invalid number', async () => {
  expect(installer.sanitizeVersion('v21.1.2')).toMatch('21.1.2')
})
