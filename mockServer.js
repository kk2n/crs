const { port } = require('yargs').argv
const MockServer = require('ymmockserver')
const { join } = require('path')
const mockServer = new MockServer({
  dir: `${join(__dirname)}/mock`,
  defaultData: { code: '000000' }
})
mockServer.server.listen(port, () => console.log(`API服务器：localhost:${port}`))
