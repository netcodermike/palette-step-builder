import { readFileSync } from 'node:fs'

function channels(hex){
  if(typeof hex!=='string'||!/^#[a-f0-9]{6}$/i.test(hex))throw new Error('Expected #RRGGBB')
  return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255)
}
const linear=x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4
const srgb=x=>x<=.0031308?12.92*x:1.055*x**(1/2.4)-.055
function analyze({start,end,steps}){
  if(!Number.isInteger(steps)||steps<2||steps>32)throw new Error('Use 2–32 steps')
  const a=channels(start).map(linear),b=channels(end).map(linear)
  const swatches=Array.from({length:steps},(_,i)=>{
    const t=i/(steps-1),values=a.map((x,j)=>x+(b[j]-x)*t)
    const color='#'+values.map(v=>Math.round(255*srgb(v)).toString(16).padStart(2,'0')).join('')
    const [r,g,blue]=channels(color).map(linear)
    return {color,luminance:Number((.2126*r+.7152*g+.0722*blue).toFixed(6))}
  })
  return {colors:swatches.map(x=>x.color),count:swatches.length,swatches}
}

try {
  if (process.argv.length !== 3) throw new Error('Usage: node app.mjs input.json')
  console.log(JSON.stringify(analyze(JSON.parse(readFileSync(process.argv[2], 'utf8')))))
} catch (error) {
  console.error(error.message)
  process.exitCode = 2
}
