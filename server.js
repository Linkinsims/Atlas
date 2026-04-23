const path = require('path')
const fs = require('fs')

const dir = path.join(__dirname)

process.env.NODE_ENV = 'production'
process.chdir(__dirname)

// Make sure commands gracefully respect termination signals (e.g. from Docker)
if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on('SIGTERM', () => process.exit(0))
  process.on('SIGINT', () => process.exit(0))
}

const hostname = '0.0.0.0'

let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10)

// Read config dynamically from the build output instead of hardcoding
const requiredServerFilesPath = path.join(dir, '.next', 'required-server-files.json')
let nextConfig

try {
  const serverFiles = JSON.parse(fs.readFileSync(requiredServerFilesPath, 'utf8'))
  nextConfig = serverFiles.config
} catch (err) {
  console.error('Failed to read required-server-files.json:', err.message)
  console.error('Falling back to minimal config')
  nextConfig = {
    output: 'standalone',
    distDir: '.next'
  }
}

process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig)

require('next')
const { startServer } = require('next/dist/server/lib/start-server')

if (Number.isNaN(keepAliveTimeout) || !Number.isFinite(keepAliveTimeout) || keepAliveTimeout < 0) {
  keepAliveTimeout = undefined
}

const startNext = async (currentPort) =>
  startServer({
    dir,
    isDev: false,
    hostname,
    port: currentPort,
    allowRetry: false,
    keepAliveTimeout
  }).catch((err) => {
    console.error(err)
    process.exit(1)
  })

module.exports = startNext
