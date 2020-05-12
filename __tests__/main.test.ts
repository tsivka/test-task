import {attempt} from '../src/main'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('throws exception', async () => {
 await expect(attempt([],[],[])).rejects.toThrow('zero available')
})

test('should return 360', async () => {
  const res = await attempt([240,360,720],[360,720],[1080]);
  expect(res).toStrictEqual([720])
})
test('should return 720', async () => {
  const res = await attempt([240,720],[360,720],[1080]);
  expect(res).toStrictEqual([720])
})
test('should return empty array', async () => {
  const res = await attempt([240],[360,720],[1080]);
  expect(res).toStrictEqual([])
})
test('should return 240,360 ', async () => {
  const res = await attempt([240,360,720],[240,360,720,1080],[240,360]);
  expect(res).toStrictEqual([240,360])
})
test('should return 240,720', async () => {
  const res = await attempt([240,720],[240,360,720,1080],[240,360]);
  expect(res).toStrictEqual([240,720])
})
test('should return 240 ', async () => {
  const res = await attempt([240,720],[240,360,1080],[240,360]);
  expect(res).toStrictEqual([240])
})
test('should return empty array ', async () => {
  const res = await attempt([720],[240,360,1080],[240,360]);
  expect(res).toStrictEqual([])
})

test('should return 360', async () => {
  const res = await attempt([240,360],[240,360],[720,1080]);
  expect(res).toStrictEqual([360])
})

test('should return 360,720 ', async () => {
  const res = await attempt([240,360,720],[360,'any'],[360,720]);
  expect(res).toStrictEqual([360,720])
})

test('should return empty array ', async () => {
  const res = await attempt([240,360,720],[240,360,720],['any',720]);
  expect(res).toStrictEqual([240,360,720])
})

test('should return empty array ', async () => {
  const res = await attempt([240,360,720],[360,1080],['any',720]);
  expect(res).toStrictEqual([360])
})


test('should return empty array ', async () => {
  const res = await attempt([240,360,720],[1080],['any',720]);
  expect(res).toStrictEqual([])
})
