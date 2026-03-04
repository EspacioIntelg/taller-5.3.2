export function createTestUser() {
  const ts = Date.now();
  const firstName = 'Auto';
  const lastName = `User${ts.toString().slice(-4)}`;
  const email = `autouser+${ts}@example.com`;
  const telephone = '5551234567';
  const password = 'Test@1234';
  const address1 = '123 Playwright St';
  const city = 'Testville';
  const region = 'Test State';
  const postcode = '12345';
  const country = 'United States';

  return {
    firstName,
    lastName,
    email,
    telephone,
    password,
    address1,
    city,
    region,
    postcode,
    country
  };
}
