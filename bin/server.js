require('../require-ts.js')

global.EXEC_ENV = 'server'

if (process.env.NODE_ENV !== 'production') {
  // watch files when development mode
  require('piping')({
    hook: true,
  })
}

require('../src/server')
