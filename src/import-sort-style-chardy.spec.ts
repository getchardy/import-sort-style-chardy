import importSort from 'import-sort'
import * as parser from 'import-sort-parser-babylon'
import { sortStyle } from './import-sort-style-chardy'

const trimStart = (str: string): string => str.replace(/^\s*/, '')

const testInput = `
import relative1 from './relative1'
import scoped from '@scope/something'
import { path, exists } from 'fs' 
import relative2 from '../relative2'
import './foo'
import 'foo'
import aliasPath from 'src/stuff'
`

const expectedOutput = `
import 'foo'
import './foo'
import scoped from '@scope/something'
import { exists, path } from 'fs'
import aliasPath from 'src/stuff'
import relative2 from '../relative2'
import relative1 from './relative1'
`

describe('import-sort-style-chardy', () => {
  it('should sort', () => {
    const result = importSort(testInput, parser, sortStyle)
    expect(trimStart(result.code)).toBe(trimStart(expectedOutput))
  })
})
