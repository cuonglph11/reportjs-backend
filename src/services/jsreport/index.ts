// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require('@jsreport/nodejs-client')

async function render() {
  const res = await client.render({
    template: {
      content: 'hello {{someText}}',
      recipe: 'html',
      engine: 'handlebars'
    },
    data: { someText: 'world!!' }
  })

  console.log(res.headers)
  const bodyBuffer = await res.body()
  console.log(bodyBuffer.toString())
}
