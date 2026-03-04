import { Page } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async isLoggedIn() {
    return await this.page.getByText(/Logoff|Logout/i).count() > 0;
  }

  async clickLogoff() {
    const logoff = this.page.getByText(/Logoff|Logout/i);
    if (await logoff.count()) await logoff.click();
  }

  async clickContinueAfterLogoff() {
    // Some flows show a Continue button after logoff
    const cont = this.page.getByRole('button', { name: /Continue/i });
    if (await cont.count()) await cont.first().click();
  }
}
