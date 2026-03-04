import { Page } from '@playwright/test';

export type TestUser = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
  address1: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
};

export class AuthPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async clickContinueNewCustomer() {
    await this.page.getByRole('button', { name: /Continue/i }).first().click();
  }

  async fillRegistrationForm(user: TestUser) {
    
    const fillField = async (labels: RegExp[], fallbacks: string[], value: string) => {
      for (const label of labels) {
        const count = await this.page.getByLabel(label).count();
        if (count) {
          const loc = this.page.getByLabel(label).first();
          try {
            if (await loc.isEditable()) {
              await loc.fill(value);
            } else {
              await loc.focus();
              await loc.fill(value).catch(() => {});
            }
            return;
          } catch (err) {
            // continue to next label/fallback if fill fails
          }
        }
      }
      for (const sel of fallbacks) {
        const count = await this.page.locator(sel).count();
        if (count) {
          const l = this.page.locator(sel).first();
          try {
            if (await l.isEditable()) {
              await l.fill(value);
            } else {
              await l.focus();
              await l.fill(value).catch(() => {});
            }
            return;
          } catch (err) {
            // ignore and try next fallback
          }
        }
      }
    };

    await fillField([/First name/i, /Nombre/i, /First Name/i], ['input[name="firstname"]', 'input[name="first_name"]', 'input[id*="first"]'], user.firstName);
    await fillField([/Last name/i, /Apellido/i, /Last Name/i], ['input[name="lastname"]', 'input[name="last_name"]', 'input[id*="last"]'], user.lastName);
    await fillField([/E-?Mail/i, /Correo/i, /Email/i], ['input[name="email"]', 'input[name="email_address"]', 'input[id*="email"]'], user.email);
    await fillField([/Telephone/i, /Teléfono/i, /Phone/i], ['input[name="telephone"]', 'input[name="phone"]', 'input[id*="telephone"]'], user.telephone);
    await fillField([/Password/i, /Contraseña/i], ['input[name="password"]', 'input[id*="password"]'], user.password);
    await fillField([/Confirm Password/i, /Confirmar/i, /Password Confirm/i], ['input[name="confirm"]', 'input[name="confirm_password"]', 'input[id*="confirm"]'], user.password);
    await fillField([/Address/i, /Dirección/i, /Address 1/i], ['input[name="address1"]', 'input[name="address_1"]', 'input[id*="address"]'], user.address1);
    await fillField([/City/i, /Ciudad/i], ['input[name="city"]', 'input[id*="city"]'], user.city);
    await fillField([/Region/i, /State/i, /Provincia/i], ['input[name="region"]', 'input[name="state"]', 'input[id*="region"]'], user.region);
    await fillField([/Post Code/i, /Postal Code/i, /Código Postal/i, /Zip/i], ['input[name="postcode"]', 'input[name="zip"]', 'input[id*="postcode"]'], user.postcode);

    
    const countryLabels = [/Country/i, /País/i];
    let countryHandled = false;
    for (const label of countryLabels) {
      const sel = this.page.getByLabel(label);
      if (await sel.count()) {
        await sel.selectOption({ label: user.country }).catch(() => {});
        countryHandled = true;
        break;
      }
    }
    if (!countryHandled) {
      const countryLocator = this.page.locator('select[name="country"] , select[id*="country"]');
      if (await countryLocator.count()) {
        await countryLocator.selectOption({ label: user.country }).catch(() => {});
      }
    }

    
    const newsletterNo = this.page.getByLabel(/(^No$)|(^No\.$)|(^No $)/i);
    if (await newsletterNo.count()) {
      await newsletterNo.check().catch(() => {});
    } else {
      const nl = this.page.locator('input[name="newsletter"][value="0"]');
      if (await nl.count()) await nl.check().catch(() => {});
    }
  }

  async acceptPrivacyPolicy() {
    const privacy = this.page.getByLabel(/Privacy Policy/i);
    if (await privacy.count()) {
      try {
        await privacy.first().check();
        return;
      } catch (err) {
        // Fallback: try to find an input inside/associated with the label
        const inputInside = privacy.first().locator('input[type="checkbox"], input[type="radio"]');
        if (await inputInside.count()) {
          await inputInside.first().check().catch(() => {});
          return;
        }
        const byName = this.page.locator('input[name="agree"], input[id*="agree"]');
        if (await byName.count()) {
          await byName.first().check({ force: true }).catch(() => {});
          return;
        }
        // Last resort: click the label/text to toggle
        await privacy.first().click().catch(() => {});
        return;
      }
    } else {
      const byName = this.page.locator('input[name="agree"], input[id*="agree"]');
      if (await byName.count()) {
        await byName.first().check({ force: true }).catch(() => {});
      } else {
        const labelText = this.page.getByText(/Privacy Policy/i);
        if (await labelText.count()) await labelText.first().click().catch(() => {});
      }
    }
  }

  async submitRegistration() {
    await this.page.getByRole('button', { name: /Continue/i }).first().click();
  }

  async login(email: string, password: string) {
    await this.page.getByLabel(/E-Mail/i).fill(email);
    await this.page.getByLabel(/Password/i).fill(password);
    await this.page.getByRole('button', { name: /Login/i }).click();
  }
}
