import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: window._env_.KC_URL ?? 'http://localhost:8080/auth',
  realm: window._env_.KC_REALM ?? 'adventureforge-api',
  clientId: window._env_.KC_CLIENTID ?? 'adventureforge-ui',
});

export default keycloak;
