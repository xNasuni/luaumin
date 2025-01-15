# luaumin

### install with npm:
```
npm install github:@xNasuni/luaumin
```

### usage (identical to luamin node api but with luau support):
```js
const luaumin = require("luaumin")
const input = `
function loop()
  local y: number = 0
  for i: number = 0, 8 do
    if i == 5 then
      continue
    end
    y += i
  end
  return y
end
local value = loop()
value += 7
value -= 3
print(value)
`

const minified = luaumin.minify(input)
console.log(minified)
```
