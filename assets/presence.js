/* Pavan Educator student presence helper.
   Include this after Supabase is initialized on authenticated student pages. */
(function () {
  const HEARTBEAT_MS = 30000;
  let timer = null;

  async function getClient() {
    return window.supabaseClient || window.supabase;
  }

  async function heartbeat() {
    const client = await getClient();
    if (!client || !client.auth) return;
    const { data } = await client.auth.getSession();
    const user = data && data.session && data.session.user;
    if (!user) return;
    await client.rpc('record_student_heartbeat', { p_auth_user_id: user.id });
  }

  async function start() {
    await heartbeat();
    if (!timer) timer = setInterval(heartbeat, HEARTBEAT_MS);
  }

  async function logoutPresence() {
    const client = await getClient();
    if (!client || !client.auth) return;
    const { data } = await client.auth.getSession();
    const user = data && data.session && data.session.user;
    if (user) await client.rpc('record_student_logout', { p_auth_user_id: user.id });
    if (timer) clearInterval(timer);
    timer = null;
  }

  window.PavanPresence = { start, heartbeat, logoutPresence };
  window.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') heartbeat();
  });
  window.addEventListener('pagehide', function () {
    logoutPresence();
  });
})();
