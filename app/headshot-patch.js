const { headshotRenderer } = require('./headshot-effects');

// Adapt the served bundle without changing its source on disk. If the bundled
// renderer changes, preserve its original behavior rather than applying a partial edit.
function patchHeadshots(source, warn = console.warn) {
  const start = 'function q1(e,t){', end = 'const Z1=';
  if (source.split(start).length !== 2 || source.split(end).length !== 2) {
    warn('HEADSHOT: bundled renderer changed; effect disabled');
    return source;
  }
  const first = source.indexOf(start), last = source.indexOf(end, first);
  if (last < first) return source;
  const original = source.slice(first, last);
  const body = original.slice(start.length, -1);
  return source.slice(0, first) + `function q1(e,t){
    const native=(()=>{${body}})();
    const headshot=(${headshotRenderer.toString()})(e,t);
    return {
      warmUp:()=>[...native.warmUp(),...headshot.warmUp()],
      spawn(point,zone,tick){if(zone==="head")headshot.spawn(point,zone,tick);else native.spawn(point,zone,tick)},
      update(tick){native.update(tick);headshot.update(tick)},
      clear(){native.clear();headshot.clear()},
      dispose(){native.dispose();headshot.dispose()}
    };
  }` + source.slice(last);
}
module.exports = { patchHeadshots };
