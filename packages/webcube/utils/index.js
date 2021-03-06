const path = require('path');
const dotenv = require('dotenv');
const { rootPath, modulePath, projectPath } = require('./beforeEnvConfig');

dotenv.config({
  path: path.join(projectPath, 'env.config'),
});

const isProductionEnv = process.env.NODE_ENV === 'production';
const isStagingEnv = process.env.DEPLOY_ENV === 'staging';
const deployMode = process.env.DEPLOY_MODE;
const liveMode = (process.env.LIVE_MODE || '').toLowerCase();
const DEFAULT_DEV_PORT = 8000;
const serverPort = process.env.WEBCUBE_DEVSERVER_PORT || DEFAULT_DEV_PORT;
const serverHost = process.env.WEBCUBE_DEVSERVER_HOST || 'localhost';
const srcRoot = process.env.WEBCUBE_CUSTOM_SRC_ROOT || 'app';
const staticRoot =
  process.env.WEBCUBE_CUSTOM_STATIC_ROOT ||
  (isProductionEnv ? 'static' : 'static-for-dev');
const configRoot = process.env.WEBCUBE_CUSTOM_CONFIG_ROOT || 'configs';
const cloudAdapter = require(`./staticcloud/${process.env
  .WEBCUBE_DEPLOY_STATIC_CLOUD || 'oss'}`);

function getUrlRoot() {
  const myhost = process.env.WEBCUBE_DEVSERVER_HOST;
  const myport = process.env.WEBCUBE_DEVSERVER_PORT;
  const deployRoot = (
    (isStagingEnv && process.env.WEBCUBE_DEPLOY_STAGING_STATIC_HTML_ROOT) ||
    (isProductionEnv && process.env.WEBCUBE_DEPLOY_STATIC_HTML_ROOT) ||
    ''
  ).replace(/\/+$/, '');
  return deployMode === 'staticweb' ? deployRoot : `http://${myhost}:${myport}`;
}

module.exports = {
  rootPath,
  modulePath,
  projectPath,
  isProductionEnv,
  isStagingEnv,
  deployMode,
  liveMode,
  serverPort,
  serverHost,
  srcRoot,
  staticRoot,
  configRoot,
  cloudAdapter,
  getUrlRoot,
};
