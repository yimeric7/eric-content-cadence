import test from 'node:test';import assert from 'node:assert/strict';import {cadence,csv,calendar} from './logic.mjs';
const base={start:'2026-09-12',minutes:60,perPiece:20,pieces:3,noWed:true};
test('12 unique dates over four weeks with no Wednesdays and six topics',()=>{const r=cadence(base);assert.equal(r.length,12);assert.equal(new Set(r.map(x=>x.date)).size,12);assert.equal(new Set(r.map(x=>x.topic)).size,6);assert.ok(r.every(x=>new Date(x.date+'T12:00').getDay()!==3))});
test('time budget respected',()=>assert.equal(cadence({...base,minutes:0}).length,0));
test('invalid date rejected',()=>assert.throws(()=>cadence({...base,start:'2026-02-30'})));
test('CSV contains real newlines and escaped quotes',()=>assert.ok(csv([{date:'2026-09-12',time:'09:40',topic:'a "quote"',prompt:'test'}]).includes('\r\n"2026-09-12","09:40","a ""quote"""')));
test('calendar exports real lines and one event per item',()=>{const s=calendar(cadence(base));assert.equal((s.match(/BEGIN:VEVENT/g)||[]).length,12);assert.ok(s.includes('\r\nDTSTART:20260912T094000'));assert.ok(s.endsWith('END:VCALENDAR'))});
